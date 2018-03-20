var Web3 = require('Web3')
// var Contract = require('web3-eth-contract')
// var solc = require('solc')
// var fs = require('fs')

var web3 = new Web3()
var ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"tokenDecimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
var pubAddress = '0x50089de735D7cecc8499666d0645EF6E3c837435'
var curGasPrice = '30000000000000'

// code = fs.readFileSync('../stdERC20contract.sol').toString()
// console.log("contract source", )
// var compiled = solc('../stdERC20contract.sol', 1)
// console.log("COMPILED", compiled)

// var contractData = {
// 	from: pubAddress,
// 	gasPrice: curGasPrice,
// 	gas: '1500000',
// 	data: compiled
// }

var Builder = {
	build: function(initialSupply, tokenName, tokenSymbol, tokenDecimals) {
		var args = [initialSupply, tokenName, tokenSymbol, tokenDecimals]
		var myContract = new  web3.eth.contract(ABI, contractData)
		// var myContractWithArgs = myContract.new([initialSupply, tokenName, tokenSymbol, tokenDecimals])
		console.log("CONTRACT", myContract)
		// console.log("CONTRACT W ARGS", myContractWithArgs)
		// myContract.deploy({
		//     arguments: [initialSupply, tokenName, tokenSymbol, tokenDecimals]
		// })
		// .send({
		//     from: '0x50089de735D7cecc8499666d0645EF6E3c837435',
		//     gas: 1500000,
		//     gasPrice: '30000000000000'
		// })
		// .then(function(newContractInstance){
		//     console.log(newContractInstance.options.address) // instance with the new contract address
		// })
	}
};

module.exports = Builder