import { ethers } from "ethers";
import { TwitterContractAddress } from './config';
import Twitter from './utils/TwitterContract.json';

const readOnlyFunctions = ['getAllTweets', 'getUserTweets'];

const handleSolidityFunctions = async (solFun, solProps=[]) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const TwitterContract = new ethers.Contract(
        TwitterContractAddress,
        Twitter.abi,
        signer
      );

      let tx = await TwitterContract[solFun](...solProps);
      if(!readOnlyFunctions.includes(solFun)){
        await tx.wait();
      }
      return tx;
    } else {
      console.log("Ethereum object not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export { handleSolidityFunctions };
