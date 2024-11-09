"use client";

import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Box, Flex, Heading, Button, Card, Text } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import { GoPlus } from "@goplus/sdk-node";
import { AlertCircle, CheckCircle2, AlertTriangle, FileText, Search } from 'lucide-react';

// Import images
import Risky from "./assets/icons/risky.svg";
import Attention from "./assets/icons/attention.svg";
import PDFIcon from "./assets/icons/pdf.svg";
import CheckIcon from "./assets/icons/check.svg";

// Types
interface TokenSecurityResponse {
  token_symbol: string;
  token_name: string;
  owner_address: string;
  creator_address: string;
  contract_address: string;
  owner_balance: string;
  creator_balance: string;
  owner_percent: number;
  creator_percent: number;
  holder_count: string;
  total_supply: string;
  is_open_source: string;
  is_proxy: string;
  is_mintable: string;
  owner_change_balance: string;
  hidden_owner: string;
  external_call: string;
  can_take_back_ownership: string;
  selfdestruct: string;
  transfer_pausable: string;
  is_blacklisted: string;
  is_whitelisted: string;
  is_honeypot: string;
  cannot_sell_all: string;
  cannot_buy: string;
  trading_cooldown: string;
  is_anti_whale: string;
  anti_whale_modifiable: string;
  slippage_modifiable: string;
  personal_slippage_modifiable: string;
  trust_list: string;
  buy_tax: number;
  sell_tax: number;
  holders: HolderInfo[];
  lp_holders: LPHolderInfo[];
  dex: DexInfo[];
  lp_total_supply: string;
  lp_holder_count: string;
}

interface HolderInfo {
  address: string;
  tag: string;
  balance: string;
  percent: number;
}

interface LPHolderInfo {
  address: string;
  tag: string;
  balance: string;
  percent: number;
  is_locked: number;
}

interface DexInfo {
  pair: string;
  liquidity: number;
}

// Styled Components

const SecurityHeader = styled(Flex)`
  gap: 24px;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  margin-bottom: 24px;
`;

const SecurityStats = styled(Flex)`
  align-items: center;
  gap: 8px;
  font-size: 16px;
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

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
  width: 100%;
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
  height: 48px;
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

const StyledButton = styled(Button)`
  border-radius: 16px;
  height: 48px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  height: 48px;
  outline: 0;
  padding: 0 16px;
  width: 100%;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
`;

const TaxWrapper = styled(Flex)`
  gap: 32px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundAlt}; // Changed to white background
  border-radius: 16px;
  margin-bottom: 8px; // Add space for the text below
`;

const TopSearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 24px;
`;

// Update the SearchContainer
const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const ResultsCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;

  ${Text} {
    &[data-header="true"] {
      padding: 0 16px;
      margin-bottom: 24px;
    }
  }
`;

const CardContent = styled.div`
  padding: 0 16px;
`;

const TokenInfoRow = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};

  &:last-child {
    border-bottom: none;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 16px;

  ${StyledInput} {
    padding-right: 120px; // Space for the button
  }
`;

// Update the button styling
const AnalyzeButton = styled(StyledButton)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  min-width: 100px;
  height: 40px;
`;

// Add PDF button styling
const PDFButton = styled(StyledButton)`
  height: 40px;
  padding: 0 16px;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary}; // Add this for icon color
`;

// Helper Components
interface SecurityItemProps {
  icon: string;
  title: string;
  description: string;
  type: 'success' | 'warning' | 'attention' | 'risk';
}


const StatusIcon = styled.div<{ type: 'success' | 'warning' | 'attention' | 'risk' }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'attention':
        return theme.colors.warning;
      case 'risk':
        return theme.colors.failure;
      default:
        return theme.colors.text;
    }
  }};
`;

const SecurityItem: React.FC<SecurityItemProps> = ({ type, title, description }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={24} />;
      case 'warning':
        return <AlertTriangle size={24} />;
      case 'attention':
        return <AlertCircle size={24} />;
      case 'risk':
        return <AlertTriangle size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-b border-gray-700 pb-5">
      <div className="max-w-[690px] flex items-start pl-4">
        <Flex alignItems="center" gap="12px">
          <StatusIcon type={type}>{getIcon()}</StatusIcon>
          <Text color={type === 'success' ? 'success' : type === 'risk' ? 'failure' : 'warning'} bold>
            {title}
          </Text>
        </Flex>
      </div>
      <Text fontSize="14px" color="textSubtle" mt="8px" pl="52px">
        {description}
      </Text>
    </div>
  );
};

const FlashAudit: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // State declarations
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [chainId, setChainId] = useState('1');
  const [result, setResult] = useState<TokenSecurityResponse | null>(null);
  const [riskyNum, setRiskyNum] = useState(0);
  const [attentionNum, setAttentionNum] = useState(0);
  const [resultFlag, setResultFlag] = useState(false);
  const [safeCount, setSafeCount] = useState(0);

  // Initialize GoPlus
  useEffect(() => {
    try {
      if (GoPlus && typeof GoPlus.init === 'function') {
        GoPlus.init();
      }
    } catch (err) {
      console.error('Failed to initialize GoPlus SDK:', err);
    }
  }, []);

  // Calculate risk and attention counts
  useEffect(() => {
    if (!result) return;
  
    let safeTotal = 0;
    let riskyTotal = 0;
    let attentionTotal = 0;
  
    // Array of all fields that should be checked
    const fieldsToCheck = [
      'is_open_source',
      'owner_change_balance', 
      'external_call',
      'can_take_back_ownership',
      'is_proxy',
      'is_mintable',
      'selfdestruct',
      'is_honeypot',
      'transfer_pausable',
      'cannot_sell_all',
      'cannot_buy',
      'trading_cooldown',
      'is_anti_whale',
      'anti_whale_modifiable',
      'slippage_modifiable',
      'personal_slippage_modifiable',
      'is_blacklisted',
      'is_whitelisted',
      'hidden_owner' 
    ];
  
    // Check each field
    fieldsToCheck.forEach(field => {
      const value = result[field as keyof TokenSecurityResponse]?.toString();
      if (value === "0") {
        safeTotal++;
        console.log('Safe:', field); // For debugging
      } else if (value === "1") {
        if (field === 'owner_change_balance' || field === 'is_honeypot') {
          riskyTotal++;
          console.log('Risky:', field);
        } else {
          attentionTotal++;
          console.log('Attention:', field);
        }
      }
    });
  
    // Check trust list separately
    if (result.trust_list === "1") {
      safeTotal++;
    }
  
    console.log('Final Counts:', {
      safe: safeTotal,
      risky: riskyTotal,
      attention: attentionTotal
    });
  
    setSafeCount(safeTotal);
    setRiskyNum(riskyTotal);
    setAttentionNum(attentionTotal);
  }, [result]);

    // Handle GoPlus SDK type
    const goPlus = GoPlus as {
      init: () => void;
      tokenSecurity: (chainId: string, address: string, timeout: number) => Promise<any>;
    };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setError(null);
    setResultFlag(false);
  };

  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainId(e.target.value);
    setError(null);
    setResultFlag(false);
  };

  const resultClick = async () => {
    if (!address) {
      setError(t('Please enter a token address'));
      return;
    }

    setLoading(true);
    setError(null);
    setResultFlag(false);
    setResult(null);
  
    try {
      // Initialize GoPlus SDK with proper error handling
      if (!GoPlus || typeof GoPlus.tokenSecurity !== 'function') {
        throw new Error('GoPlus SDK not properly initialized');
      }
  
      const response = await GoPlus.tokenSecurity(chainId, address, 30);
      
      // Handle response without relying on SUCCESS constant
      if (!response || response.code !== 1) { // GoPlus uses code 1 for success
        throw new Error(response?.message || 'Failed to fetch audit data');
      }
  
      const tokenData = response.result?.[address.toLowerCase()];
      if (tokenData) {
        setResult(tokenData as TokenSecurityResponse);
      } else {
        setResultFlag(true);
        setError('No data found for this token address');
      }
    } catch (err: any) {
      console.error('Error fetching token security data:', err);
      setError(err.message || t('Failed to perform audit'));
      setResultFlag(true);
    } finally {
      setLoading(false);
    }
  };

  // Utility functions for calculations
  const formatAddress = (address: string, len = 4): string => {
    if (!address) return '';
    return `${address.substring(0, len)}...${address.substring(address.length - len)}`;
  };

  const calculatePercentage = (value: string, total: string): number => {
    if (!value || !total) return 0;
    return (Number(value) / Number(total)) * 100;
  };

  const getLPLockedPercent = (holders: LPHolderInfo[]): number => {
    if (!holders?.length) return 0;
    return holders.reduce((acc, holder) => {
      if (holder.is_locked === 1) {
        return acc + Number(holder.balance);
      }
      return acc;
    }, 0);
  };

  const topHoldersBalance = (holders: HolderInfo[]): number => {
    if (!holders?.length) return 0;
    const top10 = holders.slice(0, 10);
    return top10.reduce((acc, holder) => acc + holder.percent, 0);
  };
  // Continue the FlashAudit component
  const renderInitialView = () => (
    <div>
      <Container>
        <StyledCard>


          <InputWrapper>
            <InputLabel>{t('Token Address')}</InputLabel>
            <SearchWrapper>
              <StyledInput
                type="text"
                placeholder="Enter token address (0x...)"
                value={address}
                onChange={handleAddressChange}
              />
              <SearchIconWrapper>
              <Search size={24} />
              </SearchIconWrapper>
            </SearchWrapper>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Select Network')}</InputLabel>
            <StyledSelect value={chainId} onChange={handleChainChange}>
              <option value="1">Ethereum</option>
              <option value="56">BNB Chain</option>
              <option value="137">Polygon</option>
              <option value="42161">Arbitrum</option>
            </StyledSelect>
          </InputWrapper>

          {error && (
            <Text color="failure" textAlign="center" mb="16px">
              {error}
            </Text>
          )}

          <StyledButton
            onClick={resultClick}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? t('Analyzing...') : t('Analyze Token')}
          </StyledButton>
        </StyledCard>
      </Container>
    </div>
  );

  const renderSecurityHeader = () => (
    <SecurityHeader justifyContent="space-between" alignItems="center">
      <Flex gap="24px" alignItems="center">
        {/* Token info */}
        <div>
          <Text color="primary" fontSize="20px" bold>
            {result?.token_symbol}
          </Text>
          <Text color="primary" fontSize="14px">
            {result?.token_name}
          </Text>
        </div>
  
        {/* Security stats */}
        <Flex gap="24px" alignItems="center">
        <SecurityStats>
  <StatusIcon type="success">
    <CheckCircle2 size={24} />
  </StatusIcon>
  <div>
    <Text color="success" bold fontSize="16px">Safe Items</Text>
    <Text color="success" bold>{safeCount}</Text> {/* Changed from result?.safe_count || 0 */}
  </div>
</SecurityStats>
  
          <SecurityStats>
            <StatusIcon type="risk">
              <AlertTriangle size={24} />
            </StatusIcon>
            <div>
              <Text color="failure" bold fontSize="16px">Risky Items</Text>
              <Text color="failure" bold>{riskyNum}</Text>
            </div>
          </SecurityStats>
  
          <SecurityStats>
            <StatusIcon type="attention">
              <AlertCircle size={24} />
            </StatusIcon>
            <div>
              <Text color="warning" bold fontSize="16px">Attention Items</Text>
              <Text color="warning" bold>{attentionNum}</Text>
            </div>
          </SecurityStats>
        </Flex>
      </Flex>
  
      <PDFButton
        scale="sm"
        onClick={() => {/* Implement PDF generation */}}
        startIcon={<FileText size={18} />}
      >
        {t('Generate Report')}
      </PDFButton>
    </SecurityHeader>
  );

  const renderSecurityChecks = () => (
    <ResultsCard>
      <Text fontSize="20px" bold mb="24px" padding="0 16px">
        {t('Security Detection')}
      </Text>
      
      <div className="flex flex-col gap-5">
        {/* Trusted Token */}
        {result?.trust_list === "1" && (
          <SecurityItem
            icon={CheckIcon}
            title={t('Trusted Token')}
            description={t('This token is a famous and trustworthy one.')}
            type="success"
          />
        )}
  
        {/* Source Code verified */}
        <SecurityItem
          icon={result?.is_open_source === "1" ? CheckIcon : Risky}
          title={result?.is_open_source === "1" 
            ? t('Contract source code verified')
            : t('Contract source code not verified')}
          description={result?.is_open_source === "1"
            ? t('This token contract is open source. You can check the contract code for details. Unsourced token contracts are likely to have malicious functions to defraud their users of their assets.')
            : t('This token contract has not been verified. We cannot check the contract code for details. Unsourced token contracts are likely to have malicious functions to defraud users of their assets.')}
          type={result?.is_open_source === "1" ? "success" : "warning"}
        />
  
        {/* Only show these checks if source code is verified */}
        {result?.is_open_source === "1" && (
          <>
            {/* Owner Change Balance */}
            <SecurityItem
              icon={result.owner_change_balance === "0" ? CheckIcon : Risky}
              title={result.owner_change_balance === "0" 
                ? t('Owner cant change balance')
                : t('Owner can change balance')}
              description={result.owner_change_balance === "0"
                ? t('The contract owner is not found to have the authority to modify the balance of tokens at other addresses.')
                : t('The contract owner has the authority to modify the balance of tokens at other addresses, which may result in a loss of assets.')}
              type={result.owner_change_balance === "0" ? "success" : "risk"}
            />
  
            {/* External Call */}
            <SecurityItem
              icon={result.external_call === "0" ? CheckIcon : Attention}
              title={result.external_call === "0" 
                ? t('No external call risk found')
                : t('Potential risk of external call')}
              description={result.external_call === "0"
                ? t('External calls would cause this token contract to be highly dependent on other contracts, which may be a potential risk.')
                : t('The contract would call functions of other contracts when primary methods are executed. It would cause this contract to be highly dependent on other contracts, which may be a potential risk.')}
              type={result.external_call === "0" ? "success" : "attention"}
            />
  
            {/* Take Back Ownership */}
            <SecurityItem
              icon={result.can_take_back_ownership === "0" ? CheckIcon : Attention}
              title={result.can_take_back_ownership === "0" 
                ? t('No function found that retrieves ownership')
                : t('Ownership can be retrieved')}
              description={result.can_take_back_ownership === "0"
                ? t('No functions found that could allow regaining ownership after renouncing it.')
                : t('If this function exists, it is possible for the project owner to regain ownership even after relinquishing it.')}
              type={result.can_take_back_ownership === "0" ? "success" : "attention"}
            />
  
            {/* Proxy Contract */}
            <SecurityItem
              icon={result.is_proxy === "0" ? CheckIcon : Attention}
              title={result.is_proxy === "0" 
                ? t('No proxy contract')
                : t('Proxy contract detected')}
              description={result.is_proxy === "0"
                ? t('There is no proxy in the contract. The proxy contract means contract owner can modifiy the function of the token and possibly effect the price.')
                : t('This contract is an Admin Upgradeability Proxy. The proxy contract means the contract owner can modifiy the function of the token and could possibly effect the price. There is possibly a way for the team to Rug or Scam. Please confirm the details with the project team before buying.')}
              type={result.is_proxy === "0" ? "success" : "attention"}
            />
  
            {/* Mint Function */}
            <SecurityItem
              icon={result.is_mintable === "0" ? CheckIcon : Attention}
              title={result.is_mintable === "0"
                ? t('No mint function')
                : t('Mint function detected')}
              description={result.is_mintable === "0"
                ? t('Mint function is transparent or non-existent. Hidden mint functions may increase the amount of tokens in circulation and effect the price of the token.')
                : t('The contract may contain additional issuance functions, which could maybe generate a large number of tokens, resulting in significant fluctuations in token prices. It is recommended to confirm with the project team whether it complies with the token issuance instructions.')}
              type={result.is_mintable === "0" ? "success" : "attention"}
            />
  
            {/* Self-Destruct */}
            <SecurityItem
              icon={result.selfdestruct === "0" ? CheckIcon : Attention}
              title={result.selfdestruct === "0"
                ? t('This token cannot self destruct')
                : t('Self-destruct function detected')}
              description={result.selfdestruct === "0"
                ? t('No self-destruct function found. If this function exists and is triggered, the contract will be destroyed, all functions will be unavailable, and all related assets will be erased.')
                : t('The contract contains a self-destruct function. If triggered, the contract will be destroyed and all assets will be erased.')}
              type={result.selfdestruct === "0" ? "success" : "attention"}
            />

            {/* Gas Abuser - This is a static check */}
<SecurityItem
  icon={CheckIcon}
  title={t('This token is not a gas abuser')}
  description={t('No gas abuse activity has been found.')}
  type="success"
/>

{/* Hidden Owner */}
<SecurityItem
  icon={result.hidden_owner === "0" ? CheckIcon : Attention}
  title={result.hidden_owner === "0" 
    ? t('No hidden owner')
    : t('Hidden owner detected')}
  description={result.hidden_owner === "0"
    ? t('No hidden owner address was found for the token. For contract with a hidden owner, developer can still manipulate the contract even if the ownership has been abandoned.')
    : t('The token has a hidden owner address. For contract with a hidden owner, developer can still manipulate the contract even if the ownership has been abandoned.')}
  type={result.hidden_owner === "0" ? "success" : "attention"}
/>

          </>
        )}
      </div>
    </ResultsCard>
  );

  const renderHoneypotRisks = () => (
    <ResultsCard>
      <Text fontSize="20px" bold mb="24px" padding="0 16px">
        {t('Honeypot Risk')}
      </Text>
  
      <div className="flex flex-col gap-2">
        <TaxWrapper>
          <Text color="text" fontSize="16px">
            {t('Buy Tax: ')}
            <Text as="span" color="primary" bold>
              {result ? `${(Number(result.buy_tax) * 100).toFixed(2)}%` : "N/A"}
            </Text>
          </Text>
          <Text color="text" fontSize="16px">
            {t('Sell Tax: ')}
            <Text as="span" color="primary" bold>
              {result ? `${(Number(result.sell_tax) * 100).toFixed(2)}%` : "N/A"}
            </Text>
          </Text>
        </TaxWrapper>
        <Text fontSize="12px" color="textSubtle" mb="16px" pl="16px">
          {t('Above 10% may be considered a high tax rate. More than 50% tax rate means tokens may not be tradable.')}
        </Text>
      </div>

      {result?.is_open_source === "1" && (
        <div className="flex flex-col gap-5">

          {/* Honeypot Check */}
          <SecurityItem
            icon={result.is_honeypot === "0" ? CheckIcon : Risky}
            title={result.is_honeypot === "0" 
              ? t('Not a honeypot')
              : t('Potential honeypot detected')}
            description={t('A honeypot prevents users from selling their tokens.')}
            type={result.is_honeypot === "0" ? "success" : "risk"}
          />

{/* Modifiable Tax */}
{result.is_open_source === "1" && result.slippage_modifiable && (
  <SecurityItem
    icon={result.slippage_modifiable === "0" ? CheckIcon : Attention}
    title={result.slippage_modifiable === "0" 
      ? t('Tax cannot be modified')
      : t('Tax can be modified')}
    description={result.slippage_modifiable === "0"
      ? t('The contract owner may not contain the authority to modify the transaction tax. If the transaction tax is increased to more than 49%, the tokens will not be able to be traded (honeypot risk).')
      : t('The contract owner has the authority to modify the transaction tax. If increased to more than 49%, tokens will not be able to be traded (honeypot risk).')}
    type={result.slippage_modifiable === "0" ? "success" : "attention"}
  />
)}

{/* Personal Slippage Modification */}
{result.is_open_source === "1" && result.personal_slippage_modifiable && (
  <SecurityItem
    icon={result.personal_slippage_modifiable === "0" ? CheckIcon : Attention}
    title={result.personal_slippage_modifiable === "0" 
      ? t('No personal address tax changes')
      : t('Personal address tax can be modified')}
    description={result.personal_slippage_modifiable === "0"
      ? t('No tax changes were found for every assigned address. If it exists, the contract owner may set a very outrageous tax rate for assigned address to block it from trading.')
      : t('The contract owner can set custom tax rates for specific addresses. This could be used to block certain addresses from trading by setting extremely high tax rates.')}
    type={result.personal_slippage_modifiable === "0" ? "success" : "attention"}
  />
)}

            {/* Anti-Whale Features */}
            <SecurityItem
              icon={result.is_anti_whale === "0" ? CheckIcon : Attention}
              title={result.is_anti_whale === "0"
                ? t('No anti-whale mechanisms')
                : t('Anti-whale mechanisms detected')}
              description={result.is_anti_whale === "0"
                ? t('There is no limit to the number of token transactions. The number of scam token transactions may be limited.')
                : t('The contract includes limitations on transaction amounts and holdings to prevent whale manipulation.')}
              type={result.is_anti_whale === "0" ? "success" : "attention"}
            />

            {/* Modifiable Anti-Whale */}
{result.is_open_source === "1" && result.anti_whale_modifiable && (
  <SecurityItem
    icon={result.anti_whale_modifiable === "0" ? CheckIcon : Attention}
    title={result.anti_whale_modifiable === "0"
      ? t('Anti whale cannot be modified')
      : t('Anti whale can be modified')}
    description={result.anti_whale_modifiable === "0"
      ? t('The maximum trading amount or maximum position cannot be modified.')
      : t('The maximum trading amount or maximum position can be modified by the contract owner.')}
    type={result.anti_whale_modifiable === "0" ? "success" : "attention"}
  />
)}

{/* Blacklist */}
{result.is_open_source === "1" && result.is_blacklisted && (
  <SecurityItem
    icon={result.is_blacklisted === "0" ? CheckIcon : Attention}
    title={result.is_blacklisted === "0"
      ? t('No blacklist')
      : t('Blacklist function')}
    description={result.is_blacklisted === "0"
      ? t('The blacklist function is not included. If there is a blacklist, some addresses may not be able to trade normally (honeypot risk).')
      : t('The blacklist function is included. Some addresses may not be able to trade normally (honeypot risk).')}
    type={result.is_blacklisted === "0" ? "success" : "attention"}
  />
)}

{/* Whitelist */}
{result.is_open_source === "1" && result.is_whitelisted && (
  <SecurityItem
    icon={result.is_whitelisted === "0" ? CheckIcon : Attention}
    title={result.is_whitelisted === "0"
      ? t('No whitelist')
      : t('Whitelist function')}
    description={result.is_whitelisted === "0"
      ? t('The whitelist function is not included. If there is a whitelist, some addresses may not be able to trade normally (honeypot risk).')
      : t('The whitelist function is included. Some addresses may not be able to trade normally (honeypot risk).')}
    type={result.is_whitelisted === "0" ? "success" : "attention"}
  />
)}

          {/* Trading Limitations */}
          {[
            {
              field: 'transfer_pausable',
              successTitle: t('Trading cannot be suspended'),
              warningTitle: t('Trading can be suspended'),
              description: t('The contract contains functions that can pause trading.')
            },
            {
              field: 'cannot_sell_all',
              successTitle: t('No selling limitations'),
              warningTitle: t('Selling limitations detected'),
              description: t('There are restrictions on selling tokens.')
            },
            {
              field: 'cannot_buy',
              successTitle: t('No buying restrictions'),
              warningTitle: t('Buying restrictions detected'),
              description: t('There are restrictions on buying this token.')
            },
            {
              field: 'trading_cooldown',
              successTitle: t('No trading cooldown'),
              warningTitle: t('Trading cooldown detected'),
              description: t('A cooldown period exists between trades.')
            }
          ].map((check, index) => (
            <SecurityItem
              key={check.field}
              icon={result[check.field as keyof TokenSecurityResponse] === "0" ? CheckIcon : Attention}
              title={result[check.field as keyof TokenSecurityResponse] === "0" 
                ? check.successTitle 
                : check.warningTitle}
              description={check.description}
              type={result[check.field as keyof TokenSecurityResponse] === "0" ? "success" : "attention"}
            />
          ))}
        </div>
      )}
    </ResultsCard>
  );

  const StatusText = styled(Text)<{ type: 'success' | 'warning' | 'attention' | 'risk' }>`
  color: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'attention':
        return '#FFB237'; // Orange
      case 'risk':
        return theme.colors.failure;
      default:
        return theme.colors.text;
    }
  }};
  font-weight: bold;
`;

const renderTokenInfo = () => (
  <ResultsCard>
    <Text fontSize="20px" bold mb="24px" padding="0 16px">
      {t('Token Information')}
    </Text>
    
    <CardContent>
      <TokenInfoRow>
        <Text color="textSubtle">{t('Token Symbol')}</Text>
        <Text color="primary" bold>{result?.token_symbol || '-'}</Text>
      </TokenInfoRow>

      <TokenInfoRow>
        <Text color="textSubtle">{t('Token Name')}</Text>
        <Text color="primary" bold>{result?.token_name || '-'}</Text>
      </TokenInfoRow>

      <TokenInfoRow>
        <Text color="textSubtle">{t('Contract Address')}</Text>
        <Text color="primary" bold>{address || '-'}</Text>
      </TokenInfoRow>

      <TokenInfoRow>
        <Text color="textSubtle">{t('Contract Owner')}</Text>
        <Text color="primary" bold>
          {result?.owner_address && result.owner_address !== '0x000000000000000000000000000000000000dead' 
            ? result.owner_address 
            : 'Renounced Ownership'}
        </Text>
      </TokenInfoRow>

      <TokenInfoRow>
        <Text color="textSubtle">{t('Contract Creator')}</Text>
        <Text color="primary" bold>{result?.creator_address || '-'}</Text>
      </TokenInfoRow>

      {/* Add Token Metrics */}
      {result && (
        <>
          <Text fontSize="18px" bold mt="24px" mb="16px" padding="0 16px">
            {t('Token Metrics')}
          </Text>
          <TokenInfoRow>
            <Text color="textSubtle">{t('Total Supply')}</Text>
            <Text color="primary" bold>{Number(result.total_supply).toLocaleString()}</Text>
          </TokenInfoRow>
          <TokenInfoRow>
            <Text color="textSubtle">{t('Holders Count')}</Text>
            <Text color="primary" bold>{Number(result.holder_count).toLocaleString()}</Text>
          </TokenInfoRow>
        </>
      )}

      {/* Add Top Holders with proper styling */}
      {result?.holders && result.holders.length > 0 && (
  <>
    <Text fontSize="18px" bold mt="24px" mb="16px" padding="0 16px">
      {t('Top 10 Holders')}
    </Text>
    {result.holders.slice(0, 10).map((holder, index) => (
      <TokenInfoRow key={holder.address}>
        <Text color="textSubtle" style={{ wordBreak: 'break-all' }}>
          {holder.address}
        </Text>
        <Text color="primary" bold>
          {(holder.percent * 100).toFixed(2)}%
        </Text>
      </TokenInfoRow>
    ))}
  </>
)}

      {/* Add Liquidity Information */}
      {result?.lp_holders && (
        <>
          <Text fontSize="18px" bold mt="24px" mb="16px" padding="0 16px">
            {t('Liquidity Information')}
          </Text>
          <TokenInfoRow>
            <Text color="textSubtle">{t('Total LP Holders')}</Text>
            <Text color="primary" bold>{result.lp_holder_count}</Text>
          </TokenInfoRow>
          <TokenInfoRow>
            <Text color="textSubtle">{t('LP Tokens Locked')}</Text>
            <Text color="primary" bold>
              {((getLPLockedPercent(result.lp_holders) / Number(result.lp_total_supply)) * 100).toFixed(2)}%
            </Text>
          </TokenInfoRow>
        </>
      )}
    </CardContent>
  </ResultsCard>
);

  // Final render with all components
  return (
    <PageWrapper>
      <Container>
        <TopSearchBar>
          <SearchContainer>
            <StyledSelect 
              value={chainId} 
              onChange={handleChainChange}
              style={{ width: '200px' }}
            >
              <option value="1">Ethereum</option>
              <option value="56">BNB Chain</option>
              <option value="137">Polygon</option>
              <option value="42161">Arbitrum</option>
            </StyledSelect>
            <div style={{ position: 'relative', flex: 1 }}>
              <StyledInput
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter token address (0x...)"
              />
              <AnalyzeButton
                onClick={resultClick}
                disabled={loading}
              >
                {loading ? t('Analyzing...') : t('Analyze')}
              </AnalyzeButton>
            </div>
          </SearchContainer>
        </TopSearchBar>
  
        {result && (
          <>
            {renderSecurityHeader()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                {renderSecurityChecks()}
                {renderHoneypotRisks()}
              </div>
              <div className="flex flex-col gap-6">
                {renderTokenInfo()}
              </div>
            </div>
          </>
        )}
      </Container>
    </PageWrapper>
  );
};

export default FlashAudit;