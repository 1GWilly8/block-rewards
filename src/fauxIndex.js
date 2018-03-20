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
	{onclick:() => {blckR.giveFunds("aC3Fea682D63E3dDAb07e66b84061A29DF510Ca1", 5)}},
	"Give Away My Money!"),

	m("button",
	{onclick:() => {builder.build(12, "mncvr", "∆", 0)}},
	"Make My Money!"),

	m("button",
	{onclick:() => {builder.setContractFile()}},
	"Save Contract")
	
	])