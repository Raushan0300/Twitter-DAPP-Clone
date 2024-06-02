import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  // const [correctNetwork, setCorrectNetwork] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('ChainId:', chainId);
      if (chainId !== '0xaa36a7') {
        alert('Please switch to Sepolia Test Network');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      console.log('Connected:', currentAccount);
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
    <div className='mainContainer'>
      <Header connectWallet={connectWallet} currentAccount={currentAccount} logout={handleLogout} />
      {currentAccount&&<Sidebar />}
    </div>
  )
};

export default App;
