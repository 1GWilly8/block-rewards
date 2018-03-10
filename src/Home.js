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

var privKey = "829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706"
var curNonce = "00"
var curGasPrice = '09184e72a000'
var curGasLimit = '2710'
var contractAddr = '0x851312A022267E37f107a04818eBd20E98230485'


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
      var funcCall = ethUtil.sha3("transfer(address,uint256)")
      // toAddress, amount
      funcCall = funcCall.slice(0, 4)
      console.log(funcCall.toString('hex'))
      fullData = "0x" + funcCall.toString('hex') + toAddress + "0000000000000000000000000000000000000000000000000000000000000005"
      console.log(fullData)
      const txParams = {
          nonce: curNonce,
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: contractAddr,
          value: "00", 
          data: fullData,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: 3
        }

        console.log(txParams)

        var txPak = new EthereumTx(txParams)
        console.log(txPak)
        // tmpStr = web3.sha3('SchoolBus')
        // var RSVer = ethUtil.ecsign(ethUtil.toBuffer(tmpStr), ethUtil.toBuffer(privKey))
        var txRlp = rlp.encode(txPak.raw)
        var txHash = ethUtil.sha3(txRlp)
        txSig = ethUtil.ecsign(ethUtil.toBuffer(txHash), ethUtil.toBuffer(privKey))
        console.log(txSig)

        const txParams1 = {
          nonce: curNonce,
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: contractAddr,
          value: "00", 
          data: fullData,
          r: txSig.r,
          s: txSig.s,
          v: txSig.v,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          // chainId: 3
        }

        var txPak1 = new EthereumTx(txParams1)
        console.log(txPak1)
        var txRlp1 = rlp.encode(txPak1.raw)
        var txHash1 = ethUtil.sha3(txRlp1)
        var fullTx = ethUtil.bufferToHex(txHash1)
        console.log(fullTx)

        this.publishTx(txParams)
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