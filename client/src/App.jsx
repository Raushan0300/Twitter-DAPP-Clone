import { useContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { WalletContext } from './WalletContext';

function App() {
  const {currentAccount, connectWallet, handleLogout} = useContext(WalletContext)

  return (
    <div className='mainContainer'>
      <Header connectWallet={connectWallet} currentAccount={currentAccount} logout={handleLogout} />
      {currentAccount&&<Sidebar />}
    </div>
  )
};

export default App;
