require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/mxZ_5pAwd_tux8nmcGHE_NFJYu672oM5`,
      accounts:[`99557b765bc5a8d79bb7a611987ad15dfc42d8e7b2fee4227a9084c30c1b2a0d`]
    }
  }
};
