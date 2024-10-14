import React, { useState } from "react";
import { Box, Flex, Heading, Button, Card, Text, Input } from '@pancakeswap/uikit';
import { ethers } from 'ethers';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
`;

const AIRDROP_ABI = [
  {
    "inputs": [
      {
        "internalType": "contract IBEP20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "recivers",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amount",
        "type": "uint256[]"
      }
    ],
    "name": "airDrop",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const IBEP20_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const Airdrop: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [allocations, setAllocations] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const airdropContractAddress = '0x313d8072d6A41589953fFc3bDfC6169fE4b531A4';

  const handleCreateAirdrop = async () => {
    if (!tokenAddress || !allocations) {
      setErrorMessage('Please enter token address and allocations');
      return;
    }
  
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
  
      console.log('Signer address:', signerAddress);
  
      // Validate token address
      if (!ethers.utils.isAddress(tokenAddress)) {
        throw new Error("Invalid token address");
      }
  
      const tokenContract = new ethers.Contract(tokenAddress, IBEP20_ABI, signer);
      const decimals = await tokenContract.decimals();
      console.log('Token decimals:', decimals);
  
      // Validate and parse allocations
      const [address, amount] = allocations.trim().split(/\s+/);
      if (!ethers.utils.isAddress(address)) {
        throw new Error("Invalid recipient address");
      }
      const parsedAmount = ethers.utils.parseUnits(amount, decimals);
      console.log('Parsed amount:', parsedAmount.toString());
  
      const balance = await tokenContract.balanceOf(signerAddress);
      console.log('Token balance:', balance.toString());
  
      if (balance.lt(parsedAmount)) {
        throw new Error("Insufficient token balance");
      }
  
      // Check current allowance
      let currentAllowance = await tokenContract.allowance(signerAddress, airdropContractAddress);
      console.log('Current allowance:', currentAllowance.toString());
  
      if (currentAllowance.lt(parsedAmount)) {
        console.log('Approving tokens...');
        const approveTx = await tokenContract.approve(airdropContractAddress, ethers.constants.MaxUint256);
        await approveTx.wait();
        console.log('Token approval transaction hash:', approveTx.hash);
  
        // Adding a small delay to ensure allowance is updated
        await new Promise(resolve => setTimeout(resolve, 5000));
  
        // Check allowance again after approval
        currentAllowance = await tokenContract.allowance(signerAddress, airdropContractAddress);
        console.log('New allowance after approval:', currentAllowance.toString());
  
        if (currentAllowance.lt(parsedAmount)) {
          throw new Error("Failed to set sufficient allowance");
        }
      }
  
      const airdropContract = new ethers.Contract(airdropContractAddress, AIRDROP_ABI, signer);
  
      // Set a manual gas limit since estimateGas is failing
      const manualGasLimit = ethers.BigNumber.from("50000000"); // Adjust this value as needed
  
      console.log('Performing airdrop with manual gas limit...');

      const airdropTx = await airdropContract.airDrop(tokenAddress, [address], [amount], {
        gasLimit: manualGasLimit
      });
      console.log('Airdrop transaction hash:', airdropTx.hash);
      
      const receipt = await airdropTx.wait();
      console.log('Transaction receipt:', receipt);
  
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
  
      console.log('Airdrop successful');
      alert('Airdrop created successfully!');
    } catch (error: any) {
      console.error('Airdrop failed:', error);
      if (error.transaction) {
        console.error('Failed transaction:', error.transaction);
      }
      setErrorMessage(`Airdrop failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <Box maxWidth="480px" margin="0 auto" padding="24px">
      <Heading scale="xl" mb="24px" textAlign="center">Create Airdrop</Heading>
      <StyledCard>
        <Box mb="24px">
          <Text fontSize="14px" color="textSubtle" mb="8px">TOKEN ADDRESS</Text>
          <Input 
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="0x..." 
          />
        </Box>

        <Box mb="24px">
          <Text fontSize="14px" color="textSubtle" mb="8px">Allocations*</Text>
          <Input 
            value={allocations}
            onChange={(e) => setAllocations(e.target.value)}
            placeholder="Enter wallet address and token amount: 0x1234... 100"
          />
        </Box>

        {errorMessage && (
          <Box mb="24px">
            <Text color="failure">{errorMessage}</Text>
          </Box>
        )}

        <Flex justifyContent="center" mt="24px">
          <Button 
            onClick={handleCreateAirdrop}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Create Airdrop'}
          </Button>
        </Flex>
      </StyledCard>
    </Box>
  );
};

export default Airdrop;