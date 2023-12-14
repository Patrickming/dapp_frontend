import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar.js';
import { useEffect, useState } from 'react';

function App() {

  const [walletAddress, setWalletAddress] = useState("");
  //调用函数
  useEffect(() => {
    // getWalletAddress();
  });

  async function getWalletAddress() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletAddress(account);
    } else {
      alert('Please install Metamask');
    }
  }
  return (
    <div className="container">
      <Navbar onconnectWallet={getWalletAddress} walletAddress={walletAddress}/>
      <p>Your Address: {walletAddress}</p>
    </div>
  );
}

export default App;
