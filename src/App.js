import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

async function getDataFromContract(setTotalTickets) {
  let abi = [{"inputs":[],"name":"totalEntries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  let provider = ethers.getDefaultProvider();
  let contractAddress = "0xb624f6d3c4365d9c5922517770723740e5a8c477";
  let contract = new ethers.Contract(contractAddress, abi, provider);

  var total_tickets = parseInt(await contract.functions.totalEntries(), 10);
  setTotalTickets(total_tickets);
}

function App() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [userTickets, setUserTickets] = useState(0);
  const [odds, setOdds] = useState(0);

  useEffect(() => {
    getDataFromContract(setTotalTickets);
    setOdds((userTickets * 100)/totalTickets);
  })

  return (
    <>
      <div className="App">
        <b>MemeLand x KaijuKingz raffle</b>
        <p>You have <input type='number' value={userTickets} onChange={(t) => { setUserTickets(t.target.value) }}/> tickets.</p>
        <p>Total tickets in the raffle: {totalTickets}</p>
        <p>Winning odds: {odds}%</p>
      </div>
    </>
  );
}

export default App;
