// Home.js
var ethUtil = require('ethereumjs-util')
var ethWallet = require('ethereumjs-wallet')
var Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')
var Accounts = require('web3-eth-accounts')
var abi = require('ethereumjs-abi')

var privKey = new Buffer('829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706', 'hex')
var pubAddr = '0x50089de735D7cecc8499666d0645EF6E3c837435'

var curGasPrice = '0x20000000000'
var curGasLimit = '0xea00'
var chain = 3

var contractAddr = '0x851312A022267E37f107a04818eBd20E98230485'
var contractABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var accounts = new Accounts()

console.log(web3)


// var block = web3.eth.getBlock("latest")
// console.log("gasLimit: " + block.gasLimit);
// curGasLimit = block.gasLimit
// web3.eth.getGasPrice(function(e,r){
//   curGasPrice = r.c[0]
// })

var BlockRewards = {

    // Function to envoke a public / private key pair to be used for interacting
    // with the ethereum blockchain
    // @param {string} entropy from which to generate the key pair. Perhaps
    // password and security question answer with many possible unique answers
    startWallet: function(entropy) {
        var newWallet = ethWallet.fromPrivateKey(ethUtil.sha3(entropy))
        privKey = ethUtil.sha3(entropy)
        console.log("GENERATED PRIV KEY", ethUtil.bufferToHex(privKey))
        pubAddr = ethUtil.bufferToHex(ethUtil.pubToAddress(newWallet.pubKey))
        console.log("GENERATED PUB KEY", ethUtil.bufferToHex(pubAddr))

        return pubAddr
    },

    // migrateWallet: function (oldPassword, oldSalt, newPassword, newSalt) {
    //   var amnt = this.queryBalance(pubAddr)
    //   var combined = oldPassword + oldSalt
    //   var newWallet1 = ethWallet.fromPrivateKey(ethUtil.sha3(combined))
    //   privKey1 = ethUtil.sha3(combined)
    //   console.log("GENERATED PRIV KEY", ethUtil.bufferToHex(privKey1))
    //   pubAddr1 = ethUtil.bufferToHex(ethUtil.pubToAddress(newWallet1.pubKey))
    //   console.log("GENERATED PUB KEY", ethUtil.bufferToHex(pubAddr1))
    //   var data = abi.simpleEncode('transfer(address,uint256)', pubAddr1, amnt ).toString('hex')
    // },

    // Format bytecode that can be published to the Ethereum blockchain to interact
    // with a smart contract.
    // @param {string} public address of contract or user you want to transact with.
    // @param {int}    amount of ether to send. Zero if a contract.
    // @param {string} contract function calls
    createTx: function (toAddress, amount, data) { 
        console.log("NOUNCE", pubAddr, web3.eth.getTransactionCount(pubAddr))

        var txParams = new EthereumTx({
          nonce: web3.eth.getTransactionCount(pubAddr),
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: toAddress,
          value: amount,
          data: '0x' + data,
          chainId: chain
        })

        txParams.sign(privKey)
        var rawTx = '0x' + txParams.serialize().toString('hex')
        console.log("RAWTX", rawTx)

        return rawTx
    },

    // Function to send ether or reward tokens.
    // @param {int}    amount of ether to send. Zero if a contract.
    // @param {string} public address of contract or user you want to transact with.
    sendFunds: function(amount, to) {
      console.log("ADDRRESS", pubAddr)
      var data = abi.simpleEncode('transfer(address,uint256)', to, amount).toString('hex')
      var tx = this.createTx(contractAddr, 0.0, data)
      this.publishTx(tx)
    },

    // @param {string} signed bytecode to be published.
    publishTx: function(TX) {
      web3.eth.sendRawTransaction(TX, (err, hash) => {
          if (err) { console.log(err); return; }
          console.log('tx hash: ' + hash);
      })
    },

    // @param {string} public address of the account you would like to know the balance of.
    queryBalance: function(pubAddr) {
      var data = abi.simpleEncode('balanceOf(address)', pubAddr).toString('hex')
      var tx = this.createTx(contractAddr, 0.0, data)
      this.publishTx(tx)
    }
    // currencySwap: function () {}
    // checkPrice: function () {}
	
};

module.exports = BlockRewards