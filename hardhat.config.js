require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("hardhat-deploy");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "key";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // if u make it localhost, you have to run the blockchain in the terminal
  networks: {
    localhost: {
      chainId: 31337,
    },
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
};
