// Home.js

var ethUtil = require('ethereumjs-util')
var ethWallet = require('ethereumjs-wallet')
var crypto = require('crypto')
var scryptsy = require('scrypt.js')
var uuid = require('uuid')
var bs58check = require('bs58check')
var Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')
var rlp = require('rlp')
var Accounts = require('web3-eth-accounts')
var Contract = require('web3-eth-contract')
var abi = require('ethereumjs-abi')

var privKey = new Buffer('829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706', 'hex')
var curNonce = "0x12"
var curGasPrice = '0x20000000000'
var curGasLimit = '0x5a00'
var contractAddr = '0x851312A022267E37f107a04818eBd20E98230485'
var contractABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var accounts = new Accounts()

// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545/'))
console.log(web3)


var data =  abi.simpleEncode('transfer(address,uint256)', '0xaC3Fea682D63E3dDAb07e66b84061A29DF510Ca1', '50000000000000' ).toString('hex')

// var acc = accounts.privateKeyToAccount('829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706')

// var block = web3.eth.getBlock("latest")
// console.log("gasLimit: " + block.gasLimit);
// curGasLimit = block.gasLimit
// web3.eth.getGasPrice(function(e,r){
//   curGasPrice = r.c[0]
// })

var BlockRewards = {
    // startWallet: function() {}

    generateWallet: function(password, salt) {
        var combined = password + salt
        var newWallet = ethWallet.fromPrivateKey(ethUtil.sha3(combined))
        privKey = ethUtil.bufferToHex(ethUtil.sha3(combined))
        var pudAddr = ethUtil.bufferToHex(ethUtil.pubToAddress(newWallet.pubKey))
        console.log(privKey)
    },

    // migrateWallet: function () {}
    createTx: function (toAddress, amount) { 
        const txParams = {
          nonce: curNonce,
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: toAddress,
          value: amount, 
          data: sha3("transfer(address,uint256)").slice(0, 4),
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          // chainId: 3
        }

        return txParams
    },

    giveFunds: function(toAddress, amount) {
      var tx = new EthereumTx({
          nonce: curNonce,
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: contractAddr,
          value: "0x01", 
          data: '0x' + data,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: 3
        })
      tx.sign(privKey)
      var rawTx = '0x' + tx.serialize().toString('hex')

      console.log("RAWTX", rawTx)

      web3.eth.sendRawTransaction(rawTx, (err, hash) => {
          if (err) { console.log(err); return; }

          // Log the tx, you can explore status manually with eth.getTransaction()
          console.log('tx hash: ' + hash);
      });

      // curNonce++
      // this.publishTx(txParams)
    },

    // sendFunds: function() {
    //     const tx = new EthereumTx(txParams)
    //     tx.sign(privKey)
    //     const serializedTx = tx.serialize()const tx = new EthereumTx(txParams)
    //     tx.sign(privKey)
    //     const serializedTx = tx.serialize()

    //     const serializedTx = tx.serialize();
    //     const rawTx = '0x' + serializedTx.toString('hex');
    //     console.log(rawTx)

    //     web3.transferToAddress()
    //   },

    publishTx: function(TX) {
      // var txPak = EthereumTx.Transaction(TX)
      // console.log(txPak)
      // nonce++
    }
    // currencySwap: function () {}
    // checkPrice: function () {}
	
};

module.exports = BlockRewards