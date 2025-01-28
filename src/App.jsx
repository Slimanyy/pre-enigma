import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import abi  from './abi.json';
import './App.css';

const App = () => {
  const [ userInput, setUserInput ] = useState('')
  const [ retrievedmessage, setRetrievedMessage ] = useState('')
  const contactAddress = ''

  async function requestAccounts() {
    await window.ethereum.request({ method: "eth_requestAccounts"}); 
  }

  async function setUserMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const myContract = new ethers.Contract(contactAddress, abi, signer);

      try {
        const tx = await myContract.setMessage(userInput);
        const receipt = tx.wait();
        console.log("Tx successful", receipt)
      } catch (err) {
        console.log("Tx failed", err)
      }
    }
  }

  async function gettUserMessage() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccounts();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const myContract = new ethers.Contract(contactAddress, abi, provider);

      try {
        const tx = await myContract.getMessage();
        setRetrievedMessage(tx)
        console.log("rt successful", tx)
      } catch (err) {
        console.log("rt failed", err)
      }
    }
  }

  return (
    <div>
      <input type='text' placeholder='Set your message' value={userInput} onChange={(e) => setUserInput(e.target.value)}/>
      <button onClick={setUserMessage}>Set Message</button>
      <button onClick={gettUserMessage}>Get Message</button>
      <p>Retrieved message: {retrievedmessage}</p>
    </div>
  )

}

export default App
