// Home.js
var ethUtil = require('ethereumjs-util')
var ethWallet = require('ethereumjs-wallet')
var Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')
var Accounts = require('web3-eth-accounts')
var abi = require('ethereumjs-abi')

var privKey = new Buffer('829d544af8cc722696975702845522bdaf60e72de5b1deecf9656f4184070706', 'hex')
var pubAddr = '0x50089de735D7cecc8499666d0645EF6E3c837435'

var curGasPrice = '22500'
var curGasLimit = '59904'
var chain = 3

var contractAddr = '0x851312A022267E37f107a04818eBd20E98230485'
var contractABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var accounts = new Accounts()

console.log(web3)


var block = web3.eth.getBlock("latest")
console.log("block: " + block);
console.log("gasLimit: " + block.gasLimit);
var curGasLimit1 = block.gasLimit
web3.eth.getGasPrice(function(e,r){
  // curGasPrice1 = r.c[0]
  console.log("gasPrice: ", r);
})

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

    // This function will deploy a compilied contract to the blockchain
    deployContract: function() {
      console.log("NOUNCE", pubAddr, web3.eth.getTransactionCount(pubAddr))

          var data = '0x6060604052341561000f57600080fd5b6112378061001e6000396000f3006060604052600436106100c5576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100ca578063095ea7b31461015857806318160ddd146101b25780631978a87b146101db57806323b872dd146101f0578063313ce5671461026957806342966c681461029857806370a08231146102d357806379cc67901461032057806395d89b411461037a578063a9059cbb14610408578063cae9ca511461044a578063dd62ed3e146104e7575b600080fd5b34156100d557600080fd5b6100dd610553565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561011d578082015181840152602081019050610102565b50505050905090810190601f16801561014a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561016357600080fd5b610198600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506105f1565b604051808215151515815260200191505060405180910390f35b34156101bd57600080fd5b6101c561067e565b6040518082815260200191505060405180910390f35b34156101e657600080fd5b6101ee610684565b005b34156101fb57600080fd5b61024f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061078e565b604051808215151515815260200191505060405180910390f35b341561027457600080fd5b61027c6108bb565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a357600080fd5b6102b960048080359060200190919050506108ce565b604051808215151515815260200191505060405180910390f35b34156102de57600080fd5b61030a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109d2565b6040518082815260200191505060405180910390f35b341561032b57600080fd5b610360600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506109ea565b604051808215151515815260200191505060405180910390f35b341561038557600080fd5b61038d610c04565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156103cd5780820151818401526020810190506103b2565b50505050905090810190601f1680156103fa5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561041357600080fd5b610448600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610ca2565b005b341561045557600080fd5b6104cd600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610cb1565b604051808215151515815260200191505060405180910390f35b34156104f257600080fd5b61053d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610e2b565b6040518082815260200191505060405180910390f35b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105e95780601f106105be576101008083540402835291602001916105e9565b820191906000526020600020905b8154815290600101906020018083116105cc57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506001905092915050565b60035481565b6012600a0a6014026003819055506040805190810160405280600481526020017f4e414d4500000000000000000000000000000000000000000000000000000000815250600090805190602001906106dd929190611166565b506040805190810160405280600181526020017f480000000000000000000000000000000000000000000000000000000000000081525060019080519060200190610729929190611166565b50600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506012600260006101000a81548160ff021916908360ff160217905550565b6000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054821115151561081b57600080fd5b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506108b0848484610e50565b600190509392505050565b600260009054906101000a900460ff1681565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561091e57600080fd5b81600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816003600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a260019050919050565b60046020528060005260406000206000915090505481565b600081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a3a57600080fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610ac557600080fd5b81600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816003600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a26001905092915050565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c9a5780601f10610c6f57610100808354040283529160200191610c9a565b820191906000526020600020905b815481529060010190602001808311610c7d57829003601f168201915b505050505081565b610cad338383610e50565b5050565b600080849050610cc185856105f1565b15610e22578073ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338630876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610dbb578082015181840152602081019050610da0565b50505050905090810190601f168015610de85780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b1515610e0957600080fd5b5af11515610e1657600080fd5b50505060019150610e23565b5b509392505050565b6005602052816000526040600020602052806000526040600020600091509150505481565b6000808373ffffffffffffffffffffffffffffffffffffffff1614151515610e7757600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610ec557600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401111515610f5357600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401905081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a380600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540114151561116057fe5b50505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106111a757805160ff19168380011785556111d5565b828001600101855582156111d5579182015b828111156111d45782518255916020019190600101906111b9565b5b5090506111e291906111e6565b5090565b61120891905b808211156112045760008160009055506001016111ec565b5090565b905600a165627a7a723058201bf15dc8f1c5e345ef86dd7105314fd4c8a2523d39598975a8249a82e0891bee0029'
          var txParams = new EthereumTx({
            nonce: web3.eth.getTransactionCount(pubAddr) + 5,
            gasPrice: curGasPrice, 
            gasLimit: curGasLimit1,
            data: data,
            chainId: chain
          })

        txParams.sign(privKey)
        var rawTx = '0x' + txParams.serialize().toString('hex')

        console.log("Raw Tx Bytecode: ", rawTx)
        this.publishTx(rawTx)
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
          gasLimit: curGasLimit1,
          to: toAddress,
          value: amount,
          data: '0x' + data,
          chainId: chain
        })

        txParams.sign(privKey)
        var rawTx = '0x' + txParams.serialize().toString('hex')
        console.log("Raw Tx Bytecode: ", rawTx)

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