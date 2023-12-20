import { ethers } from 'ethers';
import ABI from '../contracts/cUSDT.json';

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export async function approve(spender, amount) {
  const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());
  const result = await contract.approve(spender, amount);
  console.log(result.hash);
}

export async function getAllowance(owner, spender) {
  const contract = new ethers.Contract(contractAddress, ABI, await provider.getSigner());
  const result = await contract.allowance(owner, spender);
  return Number(result);
}

