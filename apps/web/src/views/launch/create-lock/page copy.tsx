"use client";

import React, { useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Box, Flex, Heading, PageSection, Button, Card, Text } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ExternalProvider } from "@ethersproject/providers";

import Warning from '../../../components/Alert/Warning';
import CopyIcon from '../../../assets/icons/copy.svg';
import CalendarIcon from './components/CalendarIcon';

import contractABI from './lockabi';
import erc20abi from './erc20abi';

const contractAddress = '0x956133BcF28AB9443f73F1baAdAc9197A129289d';

const CreateLocksPage = styled.div`
  min-height: calc(100vh - 64px);
  background: linear-gradient(139.73deg, #e5fdff 0%, #f3efff 100%);
`;

const StyledPageSection = styled(PageSection)`
  padding-top: 48px;
  padding-bottom: 48px;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 420px;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
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

const DatePickerWrapper = styled.div`
  position: relative;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 10;
  }

  .react-datepicker {
    font-family: Arial, sans-serif;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
    background-color: ${({ theme }) => theme.colors.background};
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  }

  .react-datepicker__time-container .react-datepicker__time {
    background-color: ${({ theme }) => theme.colors.background};
  }

  .react-datepicker__time-container .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
    height: auto;
    padding: 8px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
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
`;

const CalendarIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const CreateLocks: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleLock = async () => {
    if (!window.ethereum || !tokenAddress || !amount || !startDate) {
      alert('Please provide all necessary information.');
      return;
    }

    const unlockTime = Math.floor(new Date(startDate).getTime() / 1000);
    const parsedAmount = ethers.utils.parseUnits(amount, 18);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
      const signer = provider.getSigner();

      const erc20Contract = new ethers.Contract(tokenAddress, erc20abi, signer);

      const allowance = await erc20Contract.allowance(await signer.getAddress(), contractAddress);
      if (allowance.lt(parsedAmount)) {
        const approvalTx = await erc20Contract.approve(contractAddress, parsedAmount);
        await approvalTx.wait();
        alert('Tokens approved successfully!');
      }

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.lockTokens(tokenAddress, parsedAmount, unlockTime);
      await tx.wait();

      alert('Tokens locked successfully!');
    } catch (error) {
      console.error('Error locking tokens:', error);
      alert('Failed to lock tokens.');
    }
  };

  return (
    <CreateLocksPage>
      <StyledPageSection innerProps={{ style: { margin: '0', width: '100%' } }} index={1}>
        <Box maxWidth="420px" margin="0 auto" position="relative">
          <StyledHeading scale="xl">{t('Create Your Locks')}</StyledHeading>
          <StyledCard>
            <InputWrapper>
              <InputLabel>{t('Token or LP Token Address')}</InputLabel>
              <StyledInput
                type="text"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>{t('Amount')}</InputLabel>
              <StyledInput
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>{t('Unlock Date (UTC)')}</InputLabel>
              <DatePickerWrapper>
                <StyledDatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select date and time"
                />
                <CalendarIconWrapper>
                  <CalendarIcon />
                </CalendarIconWrapper>
              </DatePickerWrapper>
            </InputWrapper>
            <Warning>
              <Flex alignItems="center" flexWrap="wrap">
                <Text fontSize="14px" color="#FFF7CD" mr="8px">
                  Exclude NekoSwap lock address
                </Text>
                <img src={CopyIcon} alt="copy" style={{ marginRight: '8px' }} />
                <Text fontSize="14px" color="#FFF7CD">
                  from Fees, Max Transaction and Rewards.
                </Text>
              </Flex>
            </Warning>
            <Flex justifyContent="center" mt="24px">
              <Box mr="16px">
                <StyledButton variant="secondary" onClick={() => {
                  setTokenAddress('');
                  setAmount('');
                  setStartDate(null);
                }}>
                  Reset
                </StyledButton>
              </Box>
              <Box>
                <StyledButton onClick={handleLock}>Lock</StyledButton>
              </Box>
            </Flex>
          </StyledCard>
        </Box>
      </StyledPageSection>
    </CreateLocksPage>
  );
};

export default CreateLocks;