import { ethers } from 'ethers';
import ABI from '../contracts/cUSDT.json';

let provider = new ethers.BrowserProvider(window.ethereum)
const contractAddress = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";

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

