require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    holesky:{
      url:`${process.env.ALCHEMY_SEPOLIA_URL}`,
      accounts:[`${process.env.ACCOUNT_PRIVATE_KEY}`]
    }
  }
};
