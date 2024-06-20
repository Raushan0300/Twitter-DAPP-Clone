import { useEffect, useState } from "react";
import "./Header.css";
import XIcon from "@mui/icons-material/X";

const Header = (props) => {
  const { connectWallet, currentAccount, logout } = props;

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (currentAccount) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [currentAccount]);
  return (
    <div className="headerMainContainer">
      <div className="headerXlogo">
        <XIcon /> <span className="headerXlogoText">Twitter DAPP</span>
      </div>
      {!connected ? (
        <button
          className="headerConnectBtn"
          onClick={() => {
            connectWallet();
          }}>
          Connect Wallet
        </button>
      ) : (
        <div className="headerConnected">
          <div>{currentAccount.slice(0,2)+'...'+currentAccount.slice(-3)}</div>
          <button
            className="headerConnectBtn"
            onClick={() => {
              logout();
            }}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
