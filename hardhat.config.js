require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const POLYGON_API_KEY = process.env.POLYGON_API_KEY
module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: POLYGON_API_KEY,
  },
};
