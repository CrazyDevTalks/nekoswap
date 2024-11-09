'use client';

import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Button, Card, Text, Input } from '@pancakeswap/uikit';
import styled from 'styled-components';
import { ethers } from 'ethers';
import CreatePresale from './CreatePresale';
import abi from './components/PresaleAbi';
import { CONTRACT_ADDRESS, RPC_URL } from './inputs';

const CenteredBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  margin: 10px;
  padding: 16px;
  width: 300px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SearchInput = styled(Input)`
  width: 600px;
  margin-right: 10px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 10px;
  margin: 8px 0;
  overflow: hidden;
`;

const Progress = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
`;

const StatusTag = styled(Text)<{ status: 'upcoming' | 'live' | 'ended' }>`
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'upcoming':
        return theme.colors.warning;
      case 'live':
        return theme.colors.success;
      case 'ended':
        return theme.colors.textDisabled;
      default:
        return theme.colors.textDisabled;
    }
  }};
  color: white;
`;

interface PresaleInfo {
  tokenAddress: string;
  name: string;
  symbol: string;
  logoUrl: string;
  softCap: string;
  hardCap: string;
  currentRaised: string;
  startTime: number;
  endTime: number;
  status: 'upcoming' | 'live' | 'ended';
}

function PresalePage() {
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [presales, setPresales] = useState<PresaleInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPresale, setSelectedPresale] = useState<PresaleInfo | null>(null);

  useEffect(() => {
    fetchPresales();
  }, []);

  const fetchPresales = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const presalesList = await contract.getAllPresales();
      
      const formattedPresales = presalesList.map(presale => ({
        tokenAddress: presale.tokenAddress,
        name: presale.name,
        symbol: presale.symbol,
        logoUrl: presale.logoUrl,
        softCap: ethers.utils.formatEther(presale.softCap),
        hardCap: ethers.utils.formatEther(presale.hardCap),
        currentRaised: ethers.utils.formatEther(presale.currentRaised),
        startTime: presale.startTime.toNumber(),
        endTime: presale.endTime.toNumber(),
        status: getPresaleStatus(presale.startTime.toNumber(), presale.endTime.toNumber())
      }));

      setPresales(formattedPresales);
    } catch (error) {
      console.error('Error fetching presales:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPresaleStatus = (startTime: number, endTime: number): 'upcoming' | 'live' | 'ended' => {
    const now = Date.now() / 1000;
    if (now < startTime) return 'upcoming';
    if (now > endTime) return 'ended';
    return 'live';
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const renderPresaleCard = (presale: PresaleInfo) => {
    const progress = (parseFloat(presale.currentRaised) / parseFloat(presale.hardCap)) * 100;
    
    return (
      <StyledCard key={presale.tokenAddress} onClick={() => {
        setSelectedPresale(presale);
        setView('detail');
      }}>
        <Flex justifyContent="space-between" alignItems="center" mb="8px">
          <Text bold>{presale.name} ({presale.symbol})</Text>
          <StatusTag status={presale.status}>
            {presale.status.charAt(0).toUpperCase() + presale.status.slice(1)}
          </StatusTag>
        </Flex>
        <ImageContainer>
          <img src={presale.logoUrl} alt={presale.name} />
        </ImageContainer>
        <Text mt="8px">Progress</Text>
        <ProgressBar>
          <Progress width={`${Math.min(progress, 100)}%`} />
        </ProgressBar>
        <Flex justifyContent="space-between">
          <Text small>{presale.currentRaised} BNB</Text>
          <Text small>{presale.hardCap} BNB</Text>
        </Flex>
        <Text mt="8px">Soft Cap: {presale.softCap} BNB</Text>
        <Text>Hard Cap: {presale.hardCap} BNB</Text>
      </StyledCard>
    );
  };

  const renderListView = () => (
    <CenteredBox>
      <Heading scale="xl" mb="24px">Presale Zone</Heading>
      <Button onClick={() => setView('create')} mb="24px">Create Presale</Button>
      <Box mb="24px">
        <img src="/presale-banner.png" alt="Presale Banner" />
      </Box>
      <Flex mb="2px" alignItems="center">
        <SearchInput 
          placeholder="Search presales"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Flex>
      {loading ? (
        <Text>Loading presales...</Text>
      ) : (
        <Flex flexWrap="wrap" justifyContent="center">
          {presales.map(presale => renderPresaleCard(presale))}
        </Flex>
      )}
    </CenteredBox>
  );

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="24px">
      {view === 'list' && renderListView()}
      {view === 'create' && <CreatePresale onBack={() => setView('list')} />}
      {view === 'detail' && selectedPresale && (
        <Box>
          <Button onClick={() => setView('list')}>Back to List</Button>
          {/* Add your presale detail component here */}
        </Box>
      )}
    </Box>
  );
}

export default PresalePage;
