// This file serves both as a simple example and as documentation
// of the RPC testing endpoints in cpp-ethereum.
// Note that this does not (yet) work with geth!
// Install cpp-ethereum from the ubuntu dev ppa, start it in test-mode:
// $ eth --test -d /tmp/test &
// Wait for it to start up and then run this file:
// ethconsole example.js /tmp/test/geth.ipc

// The testing RPC interfaces are:
// test_setChainParams({}) -> bool: set chain parameters using the json chain description
//           you can use the function chainParams in utils.js to create such a description
// test_mineBlocks(x) -> bool: start mining and stop again after exactly x blocks
// test_modifyTimestamp(x) -> bool: set the timestamp of the current block to x
// test_rewindToBlock(x) -> bool: rewind the blockchain to block number x
// test_addBlock(x) -> bool: inject an RLP-encoded block

var logError = function(err) {
  if (err) {
    console.log("Error: " + err);
    process.exit(1);
  }
}

console.log("Creating new test account...");
web3.personal.newAccount('', function(err, mainAccount) {
  logError(err);
  // Modify the chain parameters / genesis block to provide funding to a
  // certain account.
  web3.test.setChainParams(utils.chainParams({accounts: { mainAccount: '1000000000000000000000'}}), function (err) {
    logError(err);
    console.log("Created new genesis block.");
    var secondAccount = '0x1234567890123456789012345678901234567890';
    web3.eth.sendTransaction({from: mainAccount, to: secondAccount, value: 200}, function(err, result) {
      logError(err);
      console.log("Transaction sent, mining 50 blocks...");
      web3.test.mineBlocks(50, function(err) {
        logError(err);
        console.log("Waiting for blocks to be mined...");
        var loop = function() {
          web3.eth.getBlockNumber(function(err, blockNr) {
            logError(err);
            console.log("Current block number: " + blockNr);
            if (blockNr < 50) {
              setTimeout(loop, 50);
            } else {
              console.log("Modifying timestamp.");
              web3.test.modifyTimestamp(1499356834, function(err) {
                logError(err);
                console.log("Done!");
                process.exit(0);
              });
            }
          });
        };
        loop();
      });
    });
  });
});