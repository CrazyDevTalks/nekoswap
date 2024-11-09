import React, { useState } from "react";
import { Box, Flex, Heading, PageSection, Button, Card, Text } from '@pancakeswap/uikit';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { abi } from './abi';
import { CONTRACT_ADDRESS } from '../inputs';
import ImageUpload from './ImageUpload';


const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 630px;
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
  padding: 0 16px;
`;

const InputLabel = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  padding-left: 16px;
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  height: 40px;
  outline: 0;
  padding: 0 16px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }
`;

const InfoText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: center;
  margin-bottom: 24px;
`;

interface TokenCreateProps {
  onBack: () => void;
}

const TokenCreate: React.FC<TokenCreateProps> = ({ onBack }) => {
  const { theme } = useTheme();
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
    <PageSection
      innerProps={{ style: { margin: '0', width: '100%' } }}
      background={theme.colors.background}
      index={1}
      hasCurvedDivider={false}
    >
      <Box maxWidth="630px" margin="0 auto" position="relative">
        <Heading scale="xl" mb="24px" textAlign="center">Create Token</Heading>
        <StyledCard>
          <InfoText>
            MemeCoin creation fee: 0.0001 ETH
            <br />
            Max supply: 1 million tokens. Initial mint: 200k tokens.
            <br />
            If funding target of 24 ETH is met, a liquidity pool will be created on NekoSwap.
          </InfoText>

          <InputWrapper>
            <InputLabel>Token Name</InputLabel>
            <StyledInput
              placeholder="Ex: Ethereum"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Token Symbol</InputLabel>
            <StyledInput
              placeholder="Ex: ETH"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Description</InputLabel>
            <StyledInput
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: '100px' }}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>Token Image</InputLabel>
            <ImageUpload onImageUploaded={(url) => setImageUrl(url)} />
          </InputWrapper>

          <Flex justifyContent="center" mt="24px">
            <Box mr="16px">
              <Button variant="secondary" onClick={onBack}>
                Back
              </Button>
            </Box>
            <Box>
              <Button onClick={handleCreateToken}>
                Create New Token
              </Button>
            </Box>
          </Flex>
        </StyledCard>
      </Box>
    </PageSection>
  );
};

export default TokenCreate;