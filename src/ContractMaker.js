var Web3 = require('Web3')
var shell = require('shelljs')
// var Contract = require('web3-eth-contract')
// var solc = require('solc')
// var fs = require('fs')

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"},{"name":"tokenDecimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
var pubAddress = '0x50089de735D7cecc8499666d0645EF6E3c837435'
var curGasPrice = '30000000000000'

var piece1 = "pragma solidity ^0.4.16;interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }contract TokenERC20 {string public name;string public symbol;uint8 public decimals;uint256 public totalSupply;mapping (address => uint256) public balanceOf;mapping (address => mapping (address => uint256)) public allowance;event Transfer(address indexed from, address indexed to, uint256 value);event Burn(address indexed from, uint256 value);function TokenERC20(uint256 "
var piece2 = ",string "
var piece3 = ",string "
var piece4 = ",uint8 "
var piece5 = ") public {totalSupply = initialSupply * 10 ** uint256(decimals);balanceOf[msg.sender] = totalSupply;name = tokenName;symbol = tokenSymbol;decimals = tokenDecimals;} function _transfer(address _from, address _to, uint _value) internal {require(_to != 0x0);require(balanceOf[_from] >= _value);require(balanceOf[_to] + _value > balanceOf[_to]);uint previousBalances = balanceOf[_from] + balanceOf[_to];balanceOf[_from] -= _value;balanceOf[_to] += _value;Transfer(_from, _to, _value);assert(balanceOf[_from] + balanceOf[_to] == previousBalances);} function transfer(address _to, uint256 _value) public {_transfer(msg.sender, _to, _value);} function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) { require(_value <= allowance[_from][msg.sender]);allowance[_from][msg.sender] -= _value; _transfer(_from, _to, _value); return true;} function approve(address _spender, uint256 _value) public returns (bool success) { allowance[msg.sender][_spender] = _value; return true;} function approveAndCall(address _spender, uint256 _value, bytes _extraData) public returns (bool success) { tokenRecipient spender = tokenRecipient(_spender); if (approve(_spender, _value)) {spender.receiveApproval(msg.sender, _value, this, _extraData);return true;}} function burn(uint256 _value) public returns (bool success) { require(balanceOf[msg.sender] >= _value);balanceOf[msg.sender] -= _value;totalSupply -= _value;Burn(msg.sender, _value); return true;} function burnFrom(address _from, uint256 _value) public returns (bool success) { require(balanceOf[_from] >= _value);require(_value <= allowance[_from][msg.sender]);balanceOf[_from] -= _value;allowance[_from][msg.sender] -= _value;totalSupply -= _value;Burn(_from, _value); return true;}}"

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
		var completeContract = piece1 + initialSupply + piece2 + tokenName + piece3 + tokenSymbol + piece4 + tokenDecimals + piece5
		var args = [initialSupply, tokenName, tokenSymbol, tokenDecimals]
		console.log(completeContract)
		// web3.eth.compile.solidity(completeContract)
		// .then(console.log)
		// shell.config.execPath = shell.which('node')
		// shell.exec('solc -o ./bin --bin --abi --optimize --overwrite ' + completeContract)
		// var myContract = new  web3.eth.contract(ABI, contractData)
		// var myContractWithArgs = myContract.new([initialSupply, tokenName, tokenSymbol, tokenDecimals])
		// console.log("CONTRACT", myContract)
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