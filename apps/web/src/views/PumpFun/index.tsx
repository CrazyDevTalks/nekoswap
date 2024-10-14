import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Button, Card, Text, Input } from '@pancakeswap/uikit';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import TokenCreate from './components/TokenCreate';
import TokenDetail from './components/TokenDetail';
import { abi } from './components/abi';
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
`;

const SearchInput = styled(Input)`
  width: 50%;
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

interface PumpFunProps {
  initialView?: 'home' | 'detail' | 'create';
  initialTokenAddress?: string;
}

const PumpFun: React.FC<PumpFunProps> = ({ initialView = 'home', initialTokenAddress = '' }) => {
  const [view, setView] = useState(initialView);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(initialTokenAddress);

  const router = useRouter();

  useEffect(() => {
    fetchMemeTokens();
  }, []);

  useEffect(() => {
    if (initialView === 'detail' && initialTokenAddress) {
      setView('detail');
      setSelectedTokenAddress(initialTokenAddress);
    }
  }, [initialView, initialTokenAddress]);

  const fetchMemeTokens = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const memeTokens = await contract.getAllMemeTokens();

      setCards(
        memeTokens.map(token => ({
          name: token.name,
          symbol: token.symbol,
          description: token.description,
          tokenImageUrl: token.tokenImageUrl,
          fundingRaised: ethers.utils.formatUnits(token.fundingRaised, 'ether'),
          tokenAddress: token.tokenAddress,
          creatorAddress: token.creatorAddress,
        }))
      );
    } catch (error) {
      console.error('Error fetching meme tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  const renderHome = () => (
    <CenteredBox>
      <Heading scale="xl" mb="24px">Pump.Fun Zone</Heading>
      <Button onClick={() => setView('create')} mb="24px">Start a new coin</Button>
      <Box mb="24px">
        <img src="https://pump.fun/_next/image?url=%2Fking-of-the-hill.png&w=256&q=75" alt="King of the Hill" />
      </Box>
      <Flex mb="24px" alignItems="center">
        <SearchInput 
          placeholder="Search for token"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Flex>
      <Text color="success" mb="16px">Terminal</Text>
      {loading ? (
        <Text>Loading tokens...</Text>
      ) : (
        <Flex flexWrap="wrap" justifyContent="center">
        {cards.map((card, index) => (
          <StyledCard key={`${card.tokenAddress}-${card.name}`} m="10px" onClick={() => {
            setSelectedTokenAddress(card.tokenAddress);
            setView('detail');
          }}>
              <ImageContainer>
                <img src={card.tokenImageUrl} alt={card.name} />
              </ImageContainer>
              <Text bold mt="8px">{card.name} ({card.symbol})</Text>
              <Text>Funding Raised: {card.fundingRaised} ETH</Text>
              <Text small>{card.description}</Text>
            </StyledCard>
          ))}
        </Flex>
      )}
    </CenteredBox>
  );

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="24px">
      {view === 'home' && renderHome()}
      {view === 'detail' && <TokenDetail tokenAddress={selectedTokenAddress} onBack={() => setView('home')} />}
      {view === 'create' && <TokenCreate onBack={() => setView('home')} />}
    </Box>
  );
};

export default PumpFun;