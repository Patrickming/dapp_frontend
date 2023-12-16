import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar.js';
import UploadSuccess from './component/UploadSuccess.js';
import UploadImage from './component/UploadImage.js';


function App() {

  //创建一个名为walletAddress的状态变量，并初始化为一个空字符串。setWalletAddress是一个用于更新walletAddress状态的函数。当调用setWalletAddress时，状态变量walletAddress会被更新，
  const [walletAddress, setWalletAddress] = useState("");
  //调用函数 刷新及调用
  useEffect(() => {
    // getWalletAddress();
    addWalletListener();
  });

  async function addWalletListener() {
    //检查用户是否已安装了Metamask，通过是否有window.ethereum判断
    if (window.ethereum) {
      // window.ethereum.on('accountsChanged')会触发回调函数是因为在Web3中，window.ethereum是一个提供了与以太坊区块链交互的API对象。当用户在以太坊钱包中切换账户时，accountsChanged事件会被触发，从而通知应用程序当前账户的变化。
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      })
    }
  }


  async function getWalletAddress() {
    //检查用户是否已安装了Metamask，通过是否有window.ethereum判断
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

      <Router>

        <Navbar onconnectWallet={getWalletAddress} walletAddress={walletAddress} />

        <Routes>
          <Route path="/" exact element={<UploadImage address={walletAddress} />} />
          <Route path="/success" element={<UploadSuccess />} />
        </Routes>
        <p>Your Address: {walletAddress}</p>
      </Router>
    </div>
  );
}


export default App;
