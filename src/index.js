var blckR = require('./Home.js')
var m = require("mithril")
var Web3 = require('web3')
var builder = require('./ContractMaker.js')


const web3 = new Web3()


// var test = function() {
// 	console.log("Running test")
// 	blckR.generateWallet("hello", "0xeuh43982")
// }

// test()

var root = document.body

m.render(root, [
	m("button",
	{onclick:() => {blckR.startWallet("William", "Elm St.")}},
	"Make Me!"),

	m("button",
	{onclick:() => {blckR.giveFunds('0x50089de735D7cecc8499666d0645EF6E3c837435', 5000000000000000)}},
	"Give Away My Money!"),

	m("button",
	{onclick:() => {builder.build(12, "mncvr", "∆", 0)}},
	"Make My Money!"),

	m("button",
	{onclick:() => {blckR.sendFunds('500000000000000000', '0x50089de735D7cecc8499666d0645EF6E3c837435', 'c3a3ac8e011f2e0674bce1f3a9feeb39d7893a44fb21b060e1fd0b36dbe6748e', '0xaC3Fea682D63E3dDAb07e66b84061A29DF510Ca1')}},
	"Send from acct #2"),

	m("button",
	{onclick:() => {blckR.queryBalance('0x50089de735D7cecc8499666d0645EF6E3c837435')}},
	"Do I Have Money?"),
	
	])