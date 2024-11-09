"use client";

import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Box, Flex, Heading, Button, Card, Text, Progress, Radio, Checkbox } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

import Input from "../../../components/Form/Input";
import Warning from "../../../components/Alert/Warning";
import DefaultSelect from "../../../components/Form/DefaultSelect";

// Import your icons here
import LogoURLIcon from "../../../assets/icons/logoURL-input.svg";
import WebsiteIcon from "../../../assets/icons/website-input.svg";
import TwitterIcon from "../../../assets/icons/twitter-input.svg";
import FacebookIcon from "../../../assets/icons/facebook-input.svg";
import GithubIcon from "../../../assets/icons/github-input.svg";
import TelegramIcon from "../../../assets/icons/telegram-input.svg";
import InstagramIcon from "../../../assets/icons/instagram-input.svg";
import DiscordIcon from "../../../assets/icons/discord-input.svg";
import RedditIcon from "../../../assets/icons/reddit-input.svg";
import YoutubeIcon from "../../../assets/icons/youtube-input.svg";
import WarningIcon from "../../../assets/icons/warning.svg";
import DatePickerIcon from "../../../assets/icons/datepicker.svg";

const CONTENT_WIDTH = '580px';

const LaunchpadPage = styled.div`
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
  max-width: ${CONTENT_WIDTH};
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
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  height: 48px;
  font-size: 16px;
`;

const StepIndicator = ({ currentStep }) => (
  <Box width="100%" maxWidth={CONTENT_WIDTH} mb="24px">
    <Progress primaryStep={currentStep * 25} scale="sm" />
    <Flex justifyContent="space-between" mt="8px">
      {['Approve Token', 'Launchpad Info', 'Project Info', 'Submit'].map((label, index) => (
        <Text key={label} color={currentStep > index ? 'primary' : 'textSubtle'} fontSize="14px">
          {label}
        </Text>
      ))}
    </Flex>
  </Box>
);

const Launchpad = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();

  // State for all inputs
  const [currency, setCurrency] = useState('BNB');
  const [feeOption, setFeeOption] = useState(`3.5% BNB`);
  const [listingOption, setListingOption] = useState('Auto Listing');
  const [affiliateProgram, setAffiliateProgram] = useState('Disable');
  const [whitelist, setWhitelist] = useState('Disable');
  const [tokenAddress, setTokenAddress] = useState('');
  const [presaleRate, setPresaleRate] = useState('');
  const [softCap, setSoftCap] = useState('');
  const [hardCap, setHardCap] = useState('');
  const [minBuy, setMinBuy] = useState('');
  const [maxBuy, setMaxBuy] = useState('');
  const [liquidity, setLiquidity] = useState('');
  const [listingRate, setListingRate] = useState('');
  const [liquidityLockup, setLiquidityLockup] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [discord, setDiscord] = useState('');
  const [reddit, setReddit] = useState('');
  const [youtube, setYoutube] = useState('');
  const [description, setDescription] = useState('');

  // Update feeOption when currency changes
  useEffect(() => {
    setFeeOption(`3.5% ${currency}`);
  }, [currency]);

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <StepHeader>
              <StepTitle>{t('Approve Token')}</StepTitle>
              <StepDescription>{t('Enter the token address and approve')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth={CONTENT_WIDTH}>
                <Flex justifyContent="space-between" alignItems="center" mb="16px">
                  <Text fontSize="12px" color="warning">(*) {t('is required field.')}</Text>
                  <StyledButton 
                    scale="sm"
                    onClick={() => router.push("/launch/create-token")}
                  >
                    {t('Create Token')}
                  </StyledButton>
                </Flex>

                <StyledInput
                  label={t('Token Address')}
                  required
                  placeholder="Token Address"
                  mb="24px"
                  value={tokenAddress}
                  onChange={(e) => setTokenAddress(e.target.value)}
                />

                <Text fontSize="14px" color="primary" mb="16px">{t('Pool Creation fee: 1 BNB')}</Text>

                <Box mb="24px">
                <Text fontSize="14px" color="text" mb="8px">{t('Currency')}</Text>
                <Flex flexDirection="column" gap="8px">
                {['BNB', 'USDT', 'USDC', 'DAI', 'FLOKI'].map((option) => (
                <Flex key={option} alignItems="center">
                <Radio 
                scale="sm"
                checked={currency === option}
                onChange={() => setCurrency(option)}
                />
                <Text color="text" ml="8px">{option}</Text>
                </Flex>
                ))}
                </Flex>
                <Text fontSize="12px" color="primary" mt="8px">
                {t(`Users will pay with ${currency} for your token`)}
                </Text>
                </Box>

                <Box mb="24px">
  <Text fontSize="14px" color="text" mb="8px">{t('Fee options')}</Text>
  <Flex flexDirection="column" gap="8px">
    <Flex alignItems="center">
      <Radio 
        scale="sm"
        checked={feeOption === `3.5% ${currency}`}
        onChange={() => setFeeOption(`3.5% ${currency}`)}
      />
      <Text color="text" ml="8px">
        3.5% {currency} raised only <Text as="span" color="primary">(Recommended)</Text>
      </Text>
    </Flex>
    <Flex alignItems="center">
      <Radio 
        scale="sm"
        checked={feeOption === `1.5% ${currency} + 1.5% token`}
        onChange={() => setFeeOption(`1.5% ${currency} + 1.5% token`)}
      />
      <Text color="text" ml="8px">
        1.5% {currency} raised + 1.5% token sold
      </Text>
    </Flex>
  </Flex>
</Box>

<Box mb="24px">
  <Text fontSize="14px" color="text" mb="8px">{t('Listing Options')}</Text>
  <Flex alignItems="center">
    <Radio 
      scale="sm"
      checked={listingOption === 'Auto Listing'}
      onChange={() => setListingOption('Auto Listing')}
    />
    <Text color="text" ml="8px">
      Auto Listing
    </Text>
  </Flex>
</Box>

<Box mb="24px">
  <Text fontSize="14px" color="text" mb="8px">{t('Affiliate Program')}</Text>
  <Flex flexDirection="column" gap="8px">
    <Flex alignItems="center">
      <Radio 
        scale="sm"
        checked={affiliateProgram === 'Disable'}
        onChange={() => setAffiliateProgram('Disable')}
      />
      <Text color="text" ml="8px">
        Disable Affiliate
      </Text>
    </Flex>
    <Flex alignItems="center">
      <Radio 
        scale="sm"
        checked={affiliateProgram === 'Enable'}
        onChange={() => setAffiliateProgram('Enable')}
      />
      <Text color="text" ml="8px">
        Enable Affiliate
      </Text>
    </Flex>
  </Flex>
</Box>

                <Warning variant="warning" mb="24px">
                  <Text color="warning">
                    {t('Auto listing, after you finalize the pool your token will be auto listed on DEX.')}
                  </Text>
                </Warning>

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
              <StepTitle>{t('Launchpad Information')}</StepTitle>
              <StepDescription>{t('Configure your launchpad parameters')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth={CONTENT_WIDTH}>
                <Text fontSize="12px" color="warning" mb="16px">(*) {t('is required field.')}</Text>

                <StyledInput
                  label={t('Presale rate')}
                  placeholder="0"
                  required
                  mb="8px"
                  value={presaleRate}
                  onChange={(e) => setPresaleRate(e.target.value)}
                />
                <Text fontSize="12px" color="textSubtle" mb="24px">
                  {t(`If I spend 1 ${currency} how many tokens will I receive?`)}
                </Text>

                <Box mb="24px">
                  <Text fontSize="14px" color="text" mb="8px">{t('Whitelist')}</Text>
                  <Flex flexDirection="column" gap="8px">
                    <Flex alignItems="center">
                      <Radio 
                        scale="sm"
                        checked={whitelist === 'Disable'}
                        onChange={() => setWhitelist('Disable')}
                      />
                      <Text color="text" ml="8px">
                        Disable
                      </Text>
                    </Flex>
                    <Flex alignItems="center">
                      <Radio 
                        scale="sm"
                        checked={whitelist === 'Enable'}
                        onChange={() => setWhitelist('Enable')}
                      />
                      <Text color="text" ml="8px">
                        Enable
                      </Text>
                    </Flex>
                  </Flex>
                  <Text fontSize="12px" color="textSubtle" mt="8px">
                    {t('You can enable/disable whitelist anytime (If you activate the whitelist our members who use the floki whitelist function can access your whitelist)')}
                  </Text>
                </Box>

                <Flex gap="16px" mb="24px">
                  <Box flex={1}>
                    <StyledInput
                      label={t(`SoftCap (${currency})*`)}
                      placeholder="0"
                      required
                      value={softCap}
                      onChange={(e) => setSoftCap(e.target.value)}
                    />
                    <Text fontSize="12px" color="textSubtle" mt="8px">
                      {t('Softcap must be ≥ 25% of Hardcap!')}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <StyledInput
                      label={t(`HardCap (${currency})*`)}
                      placeholder="0"
                      required
                      value={hardCap}
                      onChange={(e) => setHardCap(e.target.value)}
                    />
                    <Text fontSize="12px" color="textSubtle" mt="8px">
                      {t('HardCap must be positive number')}
                    </Text>
                  </Box>
                </Flex>

                <Flex gap="16px" mb="24px">
                  <Box flex={1}>
                    <StyledInput
                      label={t(`Minimum buy (${currency})*`)}
                      placeholder="0"
                      required
                      value={minBuy}
                      onChange={(e) => setMinBuy(e.target.value)}
                    />
                    <Text fontSize="12px" color="textSubtle" mt="8px">
                      {t('Minimum buy must be positive number')}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <StyledInput
                      label={t(`Maximum buy (${currency})*`)}
                      placeholder="0"
                      required
                      value={maxBuy}
                      onChange={(e) => setMaxBuy(e.target.value)}
                    />
                    <Text fontSize="12px" color="textSubtle" mt="8px">
                      {t('Maximum buy must be positive number')}
                      </Text>
                  </Box>
                </Flex>

                <Flex gap="16px" mb="24px">
                  <Box flex={1}>
                    <DefaultSelect
                      label={t('Refund type')}
                      options={[{ label: "Burn", value: "1" }]}
                      required
                    />
                  </Box>
                  <Box flex={1}>
                    <DefaultSelect
                      label={t('Router')}
                      options={[{ label: "---Select Router Exchange---", value: "1" }]}
                      required
                    />
                  </Box>
                </Flex>

                <Flex gap="16px" mb="24px">
                  <Box flex={1}>
                    <StyledInput
                      label={t('Liquidity (%)')}
                      placeholder="0"
                      required
                      value={liquidity}
                      onChange={(e) => setLiquidity(e.target.value)}
                    />
                    <Text fontSize="12px" color="textSubtle" mt="8px">
                      {t('Liquidity must be greater than 50%')}
                    </Text>
                  </Box>
                  <Box flex={1}>
                    <StyledInput
                      label={t('Listing rate')}
                      placeholder="0"
                      required
                      value={listingRate}
                      onChange={(e) => setListingRate(e.target.value)}
                    />
                    <Text fontSize="12px" color="textSubtle" mt="8px">
                      {t(`1 ${currency} = 0 FLASH`)}
                    </Text>
                  </Box>
                </Flex>

                <Text fontSize="14px" color="text" mb="16px">{t('Select start time & end time (UTC)')}</Text>
                <Flex gap="16px" mb="24px">
                  <Box flex={1}>
                    <Text fontSize="14px" color="text" mb="8px">{t('Start time (UTC)')}</Text>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      dateFormat="MM/d/yyyy hh:mm aa"
                      placeholderText="Select date"
                      customInput={<StyledInput />}
                    />
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="14px" color="text" mb="8px">{t('End time (UTC)')}</Text>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      showTimeSelect
                      dateFormat="MM/d/yyyy hh:mm aa"
                      placeholderText="Select date"
                      customInput={<StyledInput />}
                    />
                  </Box>
                </Flex>
                <Text fontSize="12px" color="textSubtle" mb="24px">
                  {t('The duration between start time and end time must be less than 10080 minutes')}
                </Text>

                <StyledInput
                  label={t('Liquidity lockup (days)')}
                  placeholder="0"
                  required
                  mb="8px"
                  value={liquidityLockup}
                  onChange={(e) => setLiquidityLockup(e.target.value)}
                />
                <Text fontSize="12px" color="textSubtle" mb="24px">
                  {t('liquidityLockTime must be greater than or equal to 30')}
                </Text>

                <Text fontSize="14px" color="primary" textAlign="right" mb="24px">
                  {t('Need 0 FLASH to create launchpad.')}
                </Text>

                <Flex justifyContent="space-between">
                  <StyledButton variant="secondary" onClick={() => setStep(1)}>
                    {t('Previous')}
                  </StyledButton>
                  <StyledButton onClick={() => setStep(3)}>
                    {t('Next')}
                  </StyledButton>
                </Flex>
              </Box>
            </Flex>
          </>
        );
      case 3:
        return (
          <>
            <StepHeader>
              <StepTitle>{t('Project Information')}</StepTitle>
              <StepDescription>{t('Add project details and links')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth={CONTENT_WIDTH}>
                <Text fontSize="12px" color="warning" mb="16px">(*) {t('is required field.')}</Text>

                <StyledInput
                  label={t('Logo URL')}
                  required
                  placeholder="Ex: https://..."
                  icon={LogoURLIcon}
                  mb="8px"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
                <Text fontSize="12px" color="textSubtle" mb="24px">
                  {t('URL must end with a supported image extension png, jpg, jpeg or gif. You can upload your image at')}
                  <br />
                  <Text as="span" color="primary">https://upload</Text>
                </Text>

                <StyledInput
                  label={t('Website')}
                  required
                  placeholder="Ex: https://..."
                  icon={WebsiteIcon}
                  mb="24px"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />

                <StyledInput
                  label={t('Facebook')}
                  placeholder="Ex: https://facebook.com/..."
                  icon={FacebookIcon}
                  mb="24px"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />

                <StyledInput
                  label={t('Twitter')}
                  placeholder="Ex: https://twitter.com/..."
                  icon={TwitterIcon}
                  mb="24px"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />

                <StyledInput
                  label={t('Github')}
                  placeholder="Ex: https://github.com/..."
                  icon={GithubIcon}
                  mb="24px"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />

                <StyledInput
                  label={t('Telegram')}
                  placeholder="Ex: https://t.me/..."
                  icon={TelegramIcon}
                  mb="24px"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                />

                <StyledInput
                  label={t('Instagram')}
                  placeholder="Ex: https://instagram.com/..."
                  icon={InstagramIcon}
                  mb="24px"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />

                <StyledInput
                  label={t('Discord')}
                  placeholder="Ex: https://discord.com/..."
                  icon={DiscordIcon}
                  mb="24px"
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                />

                <StyledInput
                  label={t('Reddit')}
                  placeholder="Ex: https://reddit.com/..."
                  icon={RedditIcon}
                  mb="24px"
                  value={reddit}
                  onChange={(e) => setReddit(e.target.value)}
                />

                <StyledInput
                  label={t('Youtube Video')}
                  placeholder="Ex: https://youtube.com/watch?v="
                  icon={YoutubeIcon}
                  mb="8px"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
                <Text fontSize="12px" color="textSubtle" mb="24px">
                  {t('Input your youtube URL, or youtube video ID.')}
                </Text>

                <Box mb="24px">
                  <Text fontSize="14px" color="text" mb="8px">{t('Description')}</Text>
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>

                <Flex justifyContent="space-between">
                  <StyledButton variant="secondary" onClick={() => setStep(2)}>
                    {t('Previous')}
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
              <StepDescription>{t('Review your launchpad details')}</StepDescription>
            </StepHeader>
            <Flex flexDirection="column" alignItems="center" width="100%">
              <Box width="100%" maxWidth={CONTENT_WIDTH}>
                <Card background={theme.colors.background} p="16px" mb="24px">
                  {[
                    { label: 'Token Address', value: tokenAddress },
                    { label: 'Currency', value: currency },
                    { label: 'Fee Option', value: feeOption },
                    { label: 'Listing Option', value: listingOption },
                    { label: 'Affiliate Program', value: affiliateProgram },
                    { label: 'Presale rate', value: presaleRate },
                    { label: 'Sale method', value: whitelist === 'Enable' ? 'Whitelist' : 'Public' },
                    { label: 'Softcap', value: `${softCap} ${currency}` },
                    { label: 'Hardcap', value: `${hardCap} ${currency}` },
                    { label: 'Minimum buy', value: `${minBuy} ${currency}` },
                    { label: 'Maximum buy', value: `${maxBuy} ${currency}` },
                    { label: 'Liquidity', value: `${liquidity}%` },
                    { label: 'Listing rate', value: `1 ${currency} = ${listingRate} FLASH` },
                    { label: 'Start time', value: startDate ? startDate.toUTCString() : 'Not set' },
                    { label: 'End time', value: endDate ? endDate.toUTCString() : 'Not set' },
                    { label: 'Liquidity lockup time', value: `${liquidityLockup} days` },
                    { label: 'Logo URL', value: logoUrl },
                    { label: 'Website', value: website, highlight: true },
                    { label: 'Facebook', value: facebook },
                    { label: 'Twitter', value: twitter },
                    { label: 'Github', value: github },
                    { label: 'Telegram', value: telegram },
                    { label: 'Instagram', value: instagram },
                    { label: 'Discord', value: discord },
                    { label: 'Reddit', value: reddit },
                    { label: 'Youtube', value: youtube },
                    { label: 'Description', value: description },
                  ].map((item, index) => (
                    <Flex key={index} justifyContent="space-between" alignItems="center" mb="8px">
                      <Text fontSize="14px" color="textSubtle">{item.label}</Text>
                      <Text fontSize="14px" color={item.highlight ? 'primary' : 'text'} bold={item.highlight}>{item.value}</Text>
                    </Flex>
                  ))}
                </Card>

                <Warning variant="warning" mb="16px">
                  <Flex alignItems="center">
                    <img src={WarningIcon} alt="Warning" width="24" height="24" style={{ marginRight: '8px' }} />
                    <Text fontSize="14px" color="warning">
                      {t('Please exclude Flash Factory address 0x7461B2F388142a7584ac752e637B255Eead9bcPL from fees, rewards, max tx amount to start creating pools')}
                    </Text>
                  </Flex>
                </Warning>

                <Warning mb="24px">
                  <Text fontSize="12px" color="text">
                    {t('For tokens with burns, rebase or other special transfers please ensure that you have a way to whitelist multiple addresses or turn off the special transfer events (By setting fees to 0 for example for the duration of the presale)')}
                  </Text>
                </Warning>

                <Flex justifyContent="space-between">
                  <StyledButton variant="secondary" onClick={() => setStep(3)}>
                    {t('Previous')}
                  </StyledButton>
                  <StyledButton onClick={handleSubmit}>
                    {t('Submit')}
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

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Launchpad submitted', {
      tokenAddress,
      currency,
      feeOption,
      listingOption,
      affiliateProgram,
      presaleRate,
      whitelist,
      softCap,
      hardCap,
      minBuy,
      maxBuy,
      liquidity,
      listingRate,
      startDate,
      endDate,
      liquidityLockup,
    });
  };

  return (
    <LaunchpadPage>
      <Heading as="h1" scale="xl" mb="24px" color="secondary" textAlign="center">
        {t('Create Launchpad')}
      </Heading>
      <StepIndicator currentStep={step} />
      <StyledCard>
        {renderStepContent()}
      </StyledCard>
    </LaunchpadPage>
  );
};

export default Launchpad;