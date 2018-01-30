// Home.js

var ethUtil = require('ethereumjs-util')
var ethWallet = require('ethereumjs-wallet')
var crypto = require('crypto')
var scryptsy = require('scrypt.js')
var uuid = require('uuid')
var bs58check = require('bs58check')
var Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

var privKey = ""
var curNonce = "0x00"
var curGasPrice = '0x09184e72a000'
var curGasLimit = '0x2710'


var BlockRewards = {
    // startWallet: function() {}

    generateWallet: function(password, salt) {
        var combined = password + salt
        var newWallet = ethWallet.fromPrivateKey(ethUtil.sha3(combined))
        privKey = ethUtil.bufferToHex(ethUtil.sha3(combined))
        var pudAddr = ethUtil.bufferToHex(ethUtil.pubToAddress(newWallet.pubKey))
        console.log(privKey)
    }
    // migrateWallet: function () {}
    createTx: function (toAddress, amount) -> txParams { 
        const txParams = {
          nonce: curNonce,
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: toAddress,
          value: amount, 
          data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: 3
        }

        return txParams
    }

    sendFunds: function() {
        const tx = new EthereumTx(txParams)
        tx.sign(privKey)
        const serializedTx = tx.serialize()const tx = new EthereumTx(txParams)
        tx.sign(privKey)
        const serializedTx = tx.serialize()

        const serializedTx = tx.serialize();
        const rawTx = '0x' + serializedTx.toString('hex');
        console.log(rawTx)

        web3.transferToAddress() }
    // currencySwap: function () {}
    // checkPrice: function () {}
	
};

module.exports = BlockRewards