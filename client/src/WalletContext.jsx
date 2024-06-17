import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("ChainId:", chainId);
      if (chainId !== "0x4268") {
        alert("Please switch to Holesky Test Network");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log("Connected:", currentAccount);
      // ethereum.on('chainChanged', (_chainId: string) => window.location.reload());
      // setCorrectNetwork(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setCurrentAccount('');
  }
  return (
    <WalletContext.Provider value={{ currentAccount, connectWallet, handleLogout }}>
      {children}
    </WalletContext.Provider>
  );
};
