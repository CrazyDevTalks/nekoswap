import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Heading, Button, Text, Input } from '@pancakeswap/uikit';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { abi } from './abi';
import { CONTRACT_ADDRESS } from '../inputs';


const CenteredBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  width: 50%;
`;

const DescriptionInput = styled(Input)`
  margin-bottom: 16px;
  width: 50%;
  height: 100px;
`;

const InfoText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 8px;
`;

interface TokenCreateProps {
  onBack: () => void;
}

const TokenCreate: React.FC<TokenCreateProps> = ({ onBack }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateToken = async () => {
    try {
      console.log('Starting token creation process');
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = await provider.getSigner();
      console.log('Signer obtained');

      console.log('Contract address:', CONTRACT_ADDRESS);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      console.log('Contract instance created');

      console.log('Creating token with params:', { name, ticker, imageUrl, description });
      const transaction = await contract.createMemeToken(name, ticker, imageUrl, description, {
        value: ethers.utils.parseUnits("0.0001", 'ether'),
      });
      console.log('Transaction sent:', transaction.hash);

      const receipt = await transaction.wait();
      console.log('Transaction confirmed:', receipt);

      alert(`Token created successfully! Transaction hash: ${receipt.hash}`);
      onBack();
    } catch (error: unknown) {
      console.error('Full error object:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if ('code' in error) {
          console.error('Error code:', (error as any).code);
        }
      }
      alert(`Error creating token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <CenteredBox>
      <Button onClick={onBack} mb="24px">Back to Home</Button>
      <InfoText>MemeCoin creation fee: 0.0001 ETH</InfoText>
      <InfoText>Max supply: 1 million tokens. Initial mint: 200k tokens.</InfoText>
      <InfoText>If funding target of 24 ETH is met, a liquidity pool will be created on Uniswap.</InfoText>
      <Heading scale="lg" mt="24px" mb="24px">Create New Token</Heading>
      <StyledInput 
        placeholder="Token Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StyledInput 
        placeholder="Token Symbol"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <DescriptionInput 
        as="textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <StyledInput 
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button onClick={handleCreateToken}>Create Token</Button>
    </CenteredBox>
  );
};

export default TokenCreate;