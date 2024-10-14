"use client";

import React, { useState } from "react";
import styled from 'styled-components';
import { Box, Flex, Heading, Button, Card, Text, Progress } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Input from "../../../components/Form/Input";
import Warning from "../../../components/Alert/Warning";
import DefaultSelect from "../../../components/Form/DefaultSelect";
import SwitchButton from "../../../components/Form/SwitchButton";

const CreateStakingPage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 24px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  padding: 24px;
  margin-top: 24px;
  width: 100%;
  max-width: 600px;
`;

const StepHeader = styled(Flex)`
  margin-bottom: 24px;
  flex-direction: column;
  align-items: center;
`;

const StepTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const StepDescription = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: center;
`;

const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  height: 48px;
  padding: 0 16px;
  width: 100%;
  
  input {
    background-color: transparent;
    border: none;
    color: inherit;
    height: 100%;
    outline: none;
    padding: 0;
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSubtle};
    }
  }
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  height: 48px;
  font-size: 16px;
`;

const StepIndicator = ({ currentStep }) => (
  <Box width="100%" maxWidth="600px" mb="24px">
    <Progress primaryStep={currentStep * 25} scale="sm" />
    <Flex justifyContent="space-between" mt="8px">
      {['Verify Token', 'Staking Info', 'Additional Info', 'Finish'].map((label, index) => (
        <Text key={label} color={currentStep > index ? 'primary' : 'textSubtle'} fontSize="14px">
          {label}
        </Text>
      ))}
    </Flex>
  </Box>
);
const CreateStaking = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [stakingSwitch, setStakingSwitch] = useState(true);
  const [startDate, setStartDate] = useState(null);

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <StepHeader>
              <StepTitle>{t('Verify Token')}</StepTitle>
              <StepDescription>{t('Enter the token addresses for staking and rewards')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth="540px">
                <StyledInput
                  label={t('Staking Token Address')}
                  placeholder="Ex: 0x..."
                  mb="16px"
                />
                <StyledInput 
                  label={t('Reward Token Address')}
                  placeholder="Ex: 0x..."
                  mb="24px"
                />
                <Flex justifyContent="flex-end">
                  <StyledButton onClick={() => setStep(2)}>
                    {t('Next')}
                  </StyledButton>
                </Flex>
              </Box>
            </Flex>
          </>
        );
      case 2:
        return (
          <>
            <StepHeader>
              <StepTitle>{t('Staking Information')}</StepTitle>
              <StepDescription>{t('Configure your staking pool parameters')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth="540px">
                <Flex gap="16px" mb="16px">
                  <StyledInput label={t('Stake Name')} placeholder="Stake Flash 3.0" />
                  <StyledInput label={t('Stake Symbol')} placeholder="sFlash" />
                </Flex>
                <Flex gap="16px" mb="16px">
                  <DefaultSelect 
                    label={t('Reward Type')} 
                    options={[
                      { label: 'Fixed APR', value: 'fixed' },
                      { label: 'Variable APR', value: 'variable' },
                    ]}
                  />
                  <StyledInput label={t('Reward Ratio (% / yr)')} placeholder="0" />
                </Flex>
                <Flex alignItems="center" gap="8px" mb="16px">
                  <SwitchButton
                    checked={stakingSwitch}
                    onChange={(checked) => setStakingSwitch(checked)}
                  />
                  <Text>{t('Reward Claim any time')}</Text>
                </Flex>
                <Flex gap="16px" mb="16px">
                  <StyledInput label={t('Hard Cap')} placeholder="0" />
                  <StyledInput label={t('Min Limit to Stake')} placeholder="0" />
                </Flex>
                <StyledInput label={t('Min Period Stake (seconds)')} placeholder="0" mb="16px" />
                <Flex alignItems="center" gap="8px" mb="16px">
                  <SwitchButton
                    checked={stakingSwitch}
                    onChange={(checked) => setStakingSwitch(checked)}
                  />
                  <Text>{t('Staking Token is transferrable')}</Text>
                </Flex>
                <Flex gap="16px" mb="24px">
                  <Box width="100%">
                    <Text mb="8px">{t('Start time (UTC)')}</Text>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="MM/d/yyyy hh:mm aa"
                      placeholderText="Select date"
                      customInput={<StyledInput />}
                    />
                  </Box>
                  <Box width="100%">
                    <Text mb="8px">{t('End time (UTC)')}</Text>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="MM/d/yyyy hh:mm aa"
                      placeholderText="Select date"
                      customInput={<StyledInput />}
                    />
                  </Box>
                </Flex>
                <Flex justifyContent="space-between">
                  <StyledButton variant="secondary" onClick={() => setStep(1)}>
                    {t('Back')}
                  </StyledButton>
                  <StyledButton onClick={() => setStep(3)}>
                    {t('Next')}
                  </StyledButton>
                </Flex>
              </Box>
            </Flex>
          </>
        );
      // ... (continued in next part)
      // ... (continued from previous part)
      case 3:
        return (
          <>
            <StepHeader>
              <StepTitle>{t('Additional Information')}</StepTitle>
              <StepDescription>{t('Add project details and links')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth="540px">
                <Text fontSize="14px" color="warning" mb="16px">(*) {t('is required field.')}</Text>
                <StyledInput
                  label={t('Staking token Logo URL')}
                  required
                  placeholder="Ex: https://..."
                  mb="16px"
                />
                <StyledInput
                  label={t('Reward token Logo URL')}
                  placeholder="Ex: https://..."
                  mb="16px"
                />
                <StyledInput
                  label={t('Website')}
                  placeholder="Ex: https://..."
                  mb="16px"
                />
                <StyledInput
                  label={t('Twitter')}
                  placeholder="Ex: https://twitter.com/..."
                  mb="16px"
                />
                <StyledInput
                  label={t('Telegram')}
                  placeholder="Ex: https://t.me/..."
                  mb="16px"
                />
                <StyledInput
                  label={t('Github')}
                  placeholder="Ex: https://github.com/..."
                  mb="16px"
                />
                <Box mb="24px">
                  <Text mb="8px">{t('Description')}</Text>
                  <textarea
                    placeholder={t('Ex: This project is...')}
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '12px',
                      borderRadius: '16px',
                      backgroundColor: theme.colors.input,
                      border: `1px solid ${theme.colors.inputSecondary}`,
                      color: theme.colors.text,
                      resize: 'vertical',
                    }}
                  />
                </Box>
                <Flex justifyContent="space-between">
                  <StyledButton variant="secondary" onClick={() => setStep(2)}>
                    {t('Back')}
                  </StyledButton>
                  <StyledButton onClick={() => setStep(4)}>
                    {t('Next')}
                  </StyledButton>
                </Flex>
              </Box>
            </Flex>
          </>
        );
      case 4:
        return (
          <>
            <StepHeader>
              <StepTitle>{t('Review')}</StepTitle>
              <StepDescription>{t('Review your staking pool details')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth="540px">
                <Card background={theme.colors.background} p="16px" mb="24px">
                  <Text fontWeight="bold" mb="8px">{t('Staking Token')}: Flash 3.0</Text>
                  <Text fontWeight="bold" mb="8px">{t('Reward Token')}: Flash 3.0</Text>
                  <Text fontWeight="bold" mb="8px">{t('Reward Type')}: Percent Reward</Text>
                  <Text fontWeight="bold" mb="8px">{t('Reward Ratio')}: 0% / year</Text>
                  <Text fontWeight="bold" mb="8px">{t('Hard Cap')}: 100</Text>
                  <Text fontWeight="bold" mb="8px">{t('Min Stake')}: 50</Text>
                  <Text fontWeight="bold" mb="8px">{t('Start Time')}: 2023-08-30 20:31 UTC</Text>
                  <Text fontWeight="bold" mb="8px">{t('End Time')}: 2023-09-14 20:31 UTC</Text>
                </Card>
                <Flex justifyContent="space-between">
                  <StyledButton variant="secondary" onClick={() => setStep(3)}>
                    {t('Back')}
                  </StyledButton>
                  <StyledButton>
                    {t('Create Staking Pool')}
                  </StyledButton>
                </Flex>
              </Box>
            </Flex>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <CreateStakingPage>
      <Heading as="h1" scale="xl" mb="24px" color="secondary" textAlign="center">
        {t('Create Staking Pool')}
      </Heading>
      <StepIndicator currentStep={step} />
      <StyledCard>
        {renderStepContent()}
      </StyledCard>
    </CreateStakingPage>
  );
};

export default CreateStaking;