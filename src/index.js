
// Defines a module that works in Node and AMD.

// This version can be used as common boilerplate for a library module
// that you only want to expose to Node and AMD loaders. It will not work
// well for defining browser globals.

// If you need a version of this file that works CommonJS-like environments
// that do not support module.exports or if you want to define a module
// with a circular dependency, see commonjsAdapter.js

// (function(define) {

//     define(function (require, exports, module) {
//         var b = require('b'); //include wallet & dependancies here
//         var ethUtil = require('ethereumjs-util');
//         var crypto = require('crypto');
//         var scryptsy = require('scrypt.js');
//         var uuid = require('uuid');
//         var bs58check = require('bs58check');
//         var Web3 = require('web3');

//         var BlockRewards = {
//             // startWallet: function() {}
// 	        generateWallet: function(password, salt) {
//                 var combined = password + salt
//                 console.log(ethUtil.sha3(combined)) 
//             }
// 	        // migrateWallet: function () {}
// 	        // sendFunds: function () {}
// 	        // currencySwap: function () {}
// 	        // checkPrice: function () {}
        	
//         };

//         return BlockRewards;
//     });

// }
// ( // Help Node out by setting up define.
//     typeof module === 'object' && module.exports && typeof define !== 'function' ?
//     function (factory) { module.exports = factory(require, exports, module); } :
//     define
// ));