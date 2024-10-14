import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Button, Text, Input } from '@pancakeswap/uikit';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { abi } from './abi';
import { tokenAbi } from './tokenAbi';
import { CONTRACT_ADDRESS, RPC_URL } from '../inputs';

const StyledInput = styled(Input)`
  margin-bottom: 16px;
  width: 50%;
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
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Progress = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  background-color: #1fc7d4;
  border-radius: 10px;
`;

interface TokenDetailProps {
  tokenAddress: string;
  tokenInfo: any;
  onBack: () => void;
}

const TokenDetail: React.FC<TokenDetailProps> = ({ tokenAddress, onBack, tokenInfo }) => {
  const router = useRouter();
  const [owners, setOwners] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSupply, setTotalSupply] = useState('0');
  const [remainingTokens, setRemainingTokens] = useState('0');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [cost, setCost] = useState('0');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenDetails, setTokenDetails] = useState({
    name: 'Unknown',
    symbol: 'Unknown',
    description: 'No description available',
    tokenImageUrl: 'https://via.placeholder.com/200',
    fundingRaised: '0 ETH',
    creatorAddress: '0x0000000000000000000000000000000000000000',
  });



  const fundingRaised = parseFloat(tokenDetails.fundingRaised.replace(' ETH', ''));
  const fundingGoal = 24;
  const maxSupply = 800000;

  useEffect(() => {
    const fetchData = async () => {
      if (!tokenAddress) {
        setLoading(false);
        return;
      }

      try {
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
        
        setTokenDetails({
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
          description: tokenInfo.description,
          tokenImageUrl: tokenInfo.tokenImageUrl,
          fundingRaised: `${tokenInfo.fundingRaised} ETH`, 
          creatorAddress: tokenInfo.creatorAddress,
        });
        console.log(tokenInfo)
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        const totalSupplyResponse = await tokenContract.totalSupply();
        const totalSupplyFormatted = ethers.utils.formatEther(totalSupplyResponse);
        setTotalSupply(totalSupplyFormatted);

        setRemainingTokens((maxSupply - parseFloat(totalSupplyFormatted)).toString());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenAddress]);

  if (loading) {
    return <Text>Loading token details...</Text>;
  }

  if (!tokenAddress) {
    return <Text>No token address provided</Text>;
  }

  const fundingRaisedPercentage = (fundingRaised / fundingGoal) * 100;
  const totalSupplyPercentage = ((parseFloat(totalSupply) - 200000) / (maxSupply - 200000)) * 100;

  const getCost = async () => {
    if (!purchaseAmount) return;

    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const costInWei = await contract.calculateCost(totalSupply, purchaseAmount);
      setCost(ethers.utils.formatEther(costInWei));
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error calculating cost:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const transaction = await contract.buyMemeToken(tokenAddress, purchaseAmount, {
        value: ethers.utils.parseEther(cost),
      });
      const receipt = await transaction.wait();

      alert(`Transaction successful! Hash: ${receipt.hash}`);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error during purchase:', error);
    }
  };

  if (!tokenAddress) {
    return <Text>No token address provided</Text>;
  }

  return (
    <Box>
      <Button onClick={onBack}>Back to Home</Button>
      <Heading scale="xl" mb="24px">{tokenDetails.name} Details</Heading>
      <Flex>
        <Box width="50%">
          <ImageContainer>
            <img src={tokenDetails.tokenImageUrl} alt={tokenDetails.name} />
          </ImageContainer>
          <Text><strong>Creator Address:</strong> {tokenDetails.creatorAddress}</Text>
          <Text><strong>Token Address:</strong> {tokenAddress}</Text>
          <Text><strong>Funding Raised:</strong> {tokenDetails.fundingRaised}</Text>
          <Text><strong>Token Symbol:</strong> {tokenDetails.symbol}</Text>
          <Text><strong>Description:</strong> {tokenDetails.description}</Text>
        </Box>
        <Box width="50%">
          <Heading scale="lg">Bonding Curve Progress</Heading>
          <Text>{fundingRaised} / {fundingGoal} ETH</Text>
          <ProgressBar>
            <Progress width={`${fundingRaisedPercentage}%`} />
          </ProgressBar>
          <Text>When the market cap reaches {fundingGoal} ETH, all the liquidity from the bonding curve will be deposited into Uniswap, and the LP tokens will be burned. Progression increases as the price goes up.</Text>

          <Heading scale="lg" mt="24px">Remaining Tokens Available for Sale</Heading>
          <Text>{remainingTokens} / {maxSupply}</Text>
          <ProgressBar>
            <Progress width={`${totalSupplyPercentage}%`} />
          </ProgressBar>

          <Heading scale="lg" mt="24px">Buy Tokens</Heading>
          <StyledInput 
            type="number"
            placeholder="Enter amount of tokens to buy"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
          />
          <Button onClick={getCost}>Purchase</Button>
        </Box>
      </Flex>

      {isModalOpen && (
        <Box>
          <Heading scale="lg">Confirm Purchase</Heading>
          <Text>Cost of {purchaseAmount} tokens: {cost} ETH</Text>
          <Button onClick={handlePurchase}>Confirm</Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </Box>
      )}

      <Heading scale="lg" mt="24px">Owners</Heading>
      {/* Add owners table here */}

      <Heading scale="lg" mt="24px">Transfers</Heading>
      {/* Add transfers table here */}
    </Box>
  );
};

export default TokenDetail;