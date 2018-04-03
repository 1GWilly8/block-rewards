# block-rewards
========

The intent of this project is to simplify the steps necessary to issue a token on the Ethereum blockchain, specifically for the use case of issuing reward points as part of a loyality program.

This is a project for a college course and is not rigrously tested and likely has security vulnerabilities, however, perhaps it will be useful as a tool for learning how to interact with the ethereum blockchain from the browser.

Look how easy it is to use:

    import project
    # Get your stuff done
    project.do_stuff()

Features
--------

- Be awesome
- Make things faster

Installation & Set-Up
---------------------

In order to use this library you will need the Solc compilier and to either run a Parity node locally or connect to a remote node.

Parity can be installed with the Node Package Manager (npm) using the following command:

    npm install --save parity

Following the install, you can start running your Parity node. The following command will start the node on the Ropsten testnet in light mode. Ropsten is recomended so that ether with actual value will not be lost while experimenting with this library. Light mode is used because the Ethereum blockchain is 100's of gigabytes and running in light mode saves you from downloading it and storing it locally. To get started run:

    parity --chain=ropsten --light --rpccorsdomain "*" -lrpc=trace


Finally, you will need to create an Ethereum smart contract that creates and manages the tokens used as the currency of your loyality program. A standard contract for doing this is provided in this package.

This command will compile your contract that you can then deploy through the remix ide. Upon deployment, you will need to copy and paste the contract address and ABI into the appropiate variables.

solc -o ./bin --bin --abi --optimize --overwrite ' + completeContract

