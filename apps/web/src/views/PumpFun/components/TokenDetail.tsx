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
  width: 300px;
  height: 300px;
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

const CenteredBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ModalBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ArrowWrapper = styled(Box)`
  display: flex;
  align-items: center;
  padding-top: 36px; // This will align it with the input fields, adjust the value if needed
`;

const InputGroup = styled(Box)`
  display: flex;
  align-items: flex-start; // Changed from center to flex-start
  gap: 16px;
  margin-bottom: 16px;
`;

const InputWrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
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
  const [totalSupply, setTotalSupply] = useState(0);
  const [remainingTokens, setRemainingTokens] = useState('0');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [calculating, setCalculating] = useState(false);
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

  const formatEth = (value: string | number) => {
    return parseFloat(value.toString()).toFixed(3);
  };

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
          fundingRaised: `${formatEth(tokenInfo.fundingRaised)} ETH`,
          creatorAddress: tokenInfo.creatorAddress,
        });

        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
        const totalSupplyResponse = await tokenContract.totalSupply();
        const totalSupplyFormatted = ethers.utils.formatEther(totalSupplyResponse);
        setTotalSupply(parseFloat(totalSupplyFormatted));

        // Calculate remaining tokens with floor at 0
        const remaining = Math.max(0, maxSupply - parseFloat(totalSupplyFormatted));
        setRemainingTokens(remaining.toString());
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenAddress, tokenInfo]);

  const calculateTokensFromEth = async (ethValue: string) => {
    if (!ethValue || parseFloat(ethValue) === 0) {
      setTokenAmount('');
      return;
    }

    try {
      setCalculating(true);
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const tokensOut = await contract.calculateTokensFromEth(totalSupply, ethers.utils.parseEther(ethValue));
      const calculatedTokens = ethers.utils.formatEther(tokensOut);
      
      // Ensure we don't exceed remaining tokens
      const maxTokens = parseFloat(remainingTokens);
      const tokenValue = Math.min(parseFloat(calculatedTokens), maxTokens);
      setTokenAmount(tokenValue.toString());
      
      // Recalculate ETH if we had to cap the tokens
      if (tokenValue < parseFloat(calculatedTokens)) {
        calculateEthFromTokens(tokenValue.toString());
      }
    } catch (error) {
      console.error('Error calculating tokens:', error);
    } finally {
      setCalculating(false);
    }
  };

  const calculateEthFromTokens = async (tokenValue: string) => {
    if (!tokenValue || parseFloat(tokenValue) === 0) {
      setEthAmount('');
      return;
    }

    try {
      setCalculating(true);
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
      const costInWei = await contract.calculateCost(totalSupply, tokenValue);
      setEthAmount(ethers.utils.formatEther(costInWei));
    } catch (error) {
      console.error('Error calculating cost:', error);
    } finally {
      setCalculating(false);
    }
  };

  const handleEthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEthAmount(value);
    calculateTokensFromEth(value);
  };

  const handleTokenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure we don't exceed remaining tokens
    const maxTokens = parseFloat(remainingTokens);
    const inputTokens = parseFloat(value);
    if (inputTokens > maxTokens) {
      setTokenAmount(maxTokens.toString());
      calculateEthFromTokens(maxTokens.toString());
    } else {
      setTokenAmount(value);
      calculateEthFromTokens(value);
    }
  };

  const handlePurchase = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      const transaction = await contract.buyMemeToken(tokenAddress, tokenAmount, {
        value: ethers.utils.parseEther(ethAmount),
      });
      const receipt = await transaction.wait();

      alert(`Transaction successful! Hash: ${receipt.hash}`);
      setIsModalOpen(false);
      setEthAmount('');
      setTokenAmount('');
      
      // Refresh data after purchase
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
      const totalSupplyResponse = await tokenContract.totalSupply();
      const totalSupplyFormatted = ethers.utils.formatEther(totalSupplyResponse);
      setTotalSupply(parseFloat(totalSupplyFormatted));
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  if (loading) {
    return <Text>Loading token details...</Text>;
  }

  if (!tokenAddress) {
    return <Text>No token address provided</Text>;
  }

  const fundingRaisedPercentage = Math.min(100, (fundingRaised / fundingGoal) * 100);
  const totalSupplyPercentage = Math.min(100, ((totalSupply - 200000) / (maxSupply - 200000)) * 100);

  return (
    <Box>
      <CenteredBox>
        <Button onClick={onBack} mb="16px">Back to Home</Button>
        <Heading scale="xl" mb="24px">{tokenDetails.name} Details</Heading>
      </CenteredBox>
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
          <Text>{formatEth(fundingRaised)} / {formatEth(fundingGoal)} ETH</Text>
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
          <InputGroup>
            <InputWrapper>
              <Text>{tokenDetails.symbol} Amount</Text>
              <Input 
                type="number"
                placeholder={`Enter ${tokenDetails.symbol} amount`}
                value={tokenAmount}
                onChange={handleTokenInputChange}
                min="0"
                max={remainingTokens}
                step="0.000000000000000001"
              />
            </InputWrapper>
            <ArrowWrapper>
              <Text>→</Text>
            </ArrowWrapper>
            <InputWrapper>
              <Text>ETH Amount</Text>
              <Input 
                type="number"
                placeholder="Enter ETH amount"
                value={ethAmount}
                onChange={handleEthInputChange}
                min="0"
                step="0.000000000000000001"
              />
            </InputWrapper>
          </InputGroup>
          {calculating && <Text>Calculating...</Text>}
          <Button 
            onClick={() => setIsModalOpen(true)} 
            disabled={!ethAmount || !tokenAmount || calculating}
          >
            Purchase
          </Button>
        </Box>
      </Flex>

      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <ModalBox>
            <Heading scale="lg" mb="16px">Confirm Purchase</Heading>
            <Text mb="8px">You will spend: {ethAmount} ETH</Text>
            <Text mb="16px">You will receive: {tokenAmount} tokens</Text>
            <Flex gap="8px">
              <Button onClick={handlePurchase}>Confirm</Button>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </Flex>
          </ModalBox>
        </>
      )}

      <Heading scale="lg" mt="24px">Top 10 Owners</Heading>
      {/* Add owners table here */}
    </Box>
  );
};

export default TokenDetail;