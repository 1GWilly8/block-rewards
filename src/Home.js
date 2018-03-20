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

var privKey = "829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706"
var curNonce = "0x12"
var curGasPrice = '0x2000000000000'
var curGasLimit = '0x5a000'
var contractAddr = '0x851312A022267E37f107a04818eBd20E98230485'
var contractABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var accounts = new Accounts()

// web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545/'));
console.log(web3)

// const contract = new self.web3.eth.Contract(contractABI, contractAddr)
// console.log("CONTRACTT", contract)

var bigNum0 = web3.toBigNumber('0x05')
var bigNum1 = web3.toBigNumber('0xaC3Fea682D63E3dDAb07e66b84061A29DF510Ca1')
var data1 =  abi.simpleEncode('transfer(address,uint256)', '0xaC3Fea682D63E3dDAb07e66b84061A29DF510Ca1', '50000000000000' ).toString('hex')

var acc = accounts.privateKeyToAccount('829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706');
console.log("ACCOUNT", accounts)
console.log("ACC", acc)



var block = web3.eth.getBlock("latest");
console.log("lBLOCK", block)
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

      var funcCall = ethUtil.sha3("transfer(address,uint256)")
      // toAddress, amount
      funcCall = funcCall.slice(0, 4)
      console.log(funcCall.toString('hex'))
      fullData = "0x" + funcCall.toString('hex') + toAddress + "0000000000000000000000000000000000000000000000000000000000000005"
      
      console.log("GAS: ", fullData)
      var contract = web3.eth.contract(contractABI, contractAddr)
      // var contractInstance = contract.at(contractAddr)
      // console.log("CONTRACT OBJ: ", contract)
      // console.log("CONTRACT OBJ: ", contract.transfer.getData('0xaC3Fea682D63E3dDAb07e66b84061A29DF510Ca1', 5))
      // var data = contract.transfer.getData('0xaC3Fea682D63E3dDAb07e66b84061A29DF510Ca1', 5)
      var tx = new EthereumTx({
          nonce: curNonce,
          gasPrice: curGasPrice, 
          gasLimit: curGasLimit,
          to: contractAddr,
          value: "0x01", 
          data: '0x' + data1,
          // EIP 155 chainId - mainnet: 1, ropsten: 3
          chainId: 3
        })
      var privateKey = new Buffer(privKey, 'hex')
      tx.sign(privateKey)
      var raw = '0x' + tx.serialize().toString('hex')

      console.log("RAWW!!!", raw)

      web3.eth.sendRawTransaction(raw, (err, hash) => {
          if (err) { console.log(err); return; }

          // Log the tx, you can explore status manually with eth.getTransaction()
          console.log('tx hash: ' + hash);
      });

      curNonce++

      // console.log(fullData)
      // const txParams = {
      //     nonce: curNonce,
      //     gasPrice: curGasPrice, 
      //     gasLimit: curGasLimit,
      //     to: contractAddr,
      //     value: "00", 
      //     data: fullData,
      //     // EIP 155 chainId - mainnet: 1, ropsten: 3
      //     chainId: 3
      //   }

      //   console.log(txParams)

      //   var tmpTX = accounts.signTransaction(txParams, privKey)
      //   tmpTX.then(function(result) {
      //   	var tmptmptmp = result.toString('hex')
      //   	console.log("FULL TX: ", tmptmptmp)	
      //   })
      //   var txPak = new EthereumTx(txParams)
      //   console.log(txPak)
      //   // tmpStr = web3.sha3('SchoolBus')
      //   // var RSVer = ethUtil.ecsign(ethUtil.toBuffer(tmpStr), ethUtil.toBuffer(privKey))
      //   var txRlp = rlp.encode(txPak.raw)
      //   var txHash = ethUtil.sha3(txRlp)
      //   txSig = ethUtil.ecsign(ethUtil.toBuffer(txHash), ethUtil.toBuffer(privKey))
      //   console.log(txSig)

      //   const txParams1 = {
      //     nonce: curNonce,
      //     gasPrice: curGasPrice, 
      //     gasLimit: curGasLimit,
      //     to: contractAddr,
      //     value: "00", 
      //     data: fullData,
      //     r: txSig.r,
      //     s: txSig.s,
      //     v: txSig.v,
      //     // EIP 155 chainId - mainnet: 1, ropsten: 3
      //     // chainId: 3
      //   }

      //   var txPak1 = new EthereumTx(txParams1)
      //   console.log(txPak1)
      //   var txRlp1 = rlp.encode(txPak1.raw)
      //   var txHash1 = ethUtil.sha3(txRlp1)
      //   var fullTx = ethUtil.bufferToHex(txHash1)
      //   console.log(fullTx)

      //   this.publishTx(txParams)
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