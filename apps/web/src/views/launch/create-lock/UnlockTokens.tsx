import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Box, Flex, Heading, Button, Card, Text } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import { ExternalProvider } from "@ethersproject/providers";

import contractABI from './lockabi';  // Make sure this path is correct

const contractAddress = '0x956133BcF28AB9443f73F1baAdAc9197A129289d';  // Your contract address

const BacktoLockTokensButton = styled(Button)`
  display: block;
  margin: 0 auto 24px;
`;

const StyledPageSection = styled.div`
  padding-top: 48px;
  padding-bottom: 48px;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`;

const TokenCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 630px;
`;

const TokenInfo = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`;

const UnlockButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.failure};
  color: white;
  width: 100%;
  &:hover {
    opacity: 0.8;
  }
`;

interface LockedToken {
  id: string;
  tokenAddress: string;
  name: string;
  amount: string;
  unlockTime: number;
}

interface UnlockTokensProps {
  onBack: () => void;
}

const UnlockTokens: React.FC<UnlockTokensProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [lockedTokens, setLockedTokens] = useState<LockedToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLockedTokens();
  }, []);

  const fetchLockedTokens = async () => {
    console.log('Fetching locked tokens...');
    if (!window.ethereum) {
      console.log('MetaMask not detected');
      alert('Please install MetaMask!');
      return;
    }
  
    try {
      setLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const userAddress = await signer.getAddress();
      console.log('User address:', userAddress);
  
      console.log('Calling getUserLocks...');
      const locks = await contract.getUserLocks(userAddress);
      console.log('Raw locks data:', locks);
  
      if (locks.length === 0) {
        console.log('No locked tokens found for this user');
        setLockedTokens([]);
        setLoading(false);
        return;
      }
  
      const formattedTokens = await Promise.all(locks.map(async (lock: any, index: number) => {
        console.log('Processing lock:', lock);
        const tokenContract = new ethers.Contract(lock.tokenAddress, ['function name() view returns (string)', 'function symbol() view returns (string)'], provider);
        const tokenName = await tokenContract.name();
        const tokenSymbol = await tokenContract.symbol();
        return {
          id: index.toString(),
          tokenAddress: lock.tokenAddress,
          name: `${tokenName} (${tokenSymbol})`,
          amount: ethers.utils.formatUnits(lock.amountLocked, 18),
          unlockTime: lock.unlockTime.toNumber()
        };
      }));
  
      console.log('Formatted tokens:', formattedTokens);
      setLockedTokens(formattedTokens);
    } catch (error) {
      console.error('Error fetching locked tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (lockIndex: number) => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
      const tx = await contract.withdrawTokens(lockIndex);
      await tx.wait();
  
      alert('Tokens unlocked successfully!');
      fetchLockedTokens();
    } catch (error) {
      console.error('Error unlocking tokens:', error);
      alert('Failed to unlock tokens.');
    }
  };

  return (

      <StyledPageSection>
        <Box maxWidth="630px" margin="0 auto" position="relative">
          <BacktoLockTokensButton onClick={onBack} mb="16px">Back to Lock Tokens</BacktoLockTokensButton>
          <StyledHeading scale="xl">{t('Your Locked Tokens')}</StyledHeading>
          {loading ? (
            <Text textAlign="center">{t('Loading...')}</Text>
          ) : lockedTokens.length > 0 ? (
            lockedTokens.map((token, index) => (
              <TokenCard key={token.id}>
                <TokenInfo>
                  <Text bold mb="8px">{token.name}</Text>
                  <Text small mb="4px">{token.tokenAddress}</Text>
                  <Text small mb="8px">Unlock time: {new Date(token.unlockTime * 1000).toLocaleString()}</Text>
                  <Text small mb="16px">Amount: {token.amount}</Text>
                </TokenInfo>
                <UnlockButton
                  onClick={() => handleUnlock(index)}
                  disabled={Date.now() < token.unlockTime * 1000}
                >
                  {Date.now() < token.unlockTime * 1000 ? 'Locked' : 'Unlock'}
                </UnlockButton>
              </TokenCard>
            ))
          ) : (
            <Text textAlign="center">{t('No locked tokens found.')}</Text>
          )}
        </Box>
      </StyledPageSection>

  );
};

export default UnlockTokens;