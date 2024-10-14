import React, { useState } from "react";
import styled from 'styled-components';
import { Box, Flex, Heading, PageSection, Button, Card, Text } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DefaultCard from "../../../components/Card/DefaultCard";
import Success from "../../../components/Alert/Success";
import Warning from "../../../components/Alert/Warning";
import Input from "../../../components/Form/Input";
import CopyIcon from "../../../assets/icons/copy.svg";
import DatePickerIcon from "../../../assets/icons/datepicker.svg";

const CreateLocksPage = styled.div`
  min-height: calc(100vh - 64px);
  background: linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%);
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

const LighterCard = styled(StyledCard)`
  background: ${({ theme }) => theme.colors.background};
`;

const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

const StyledDatePicker = styled(DatePicker)`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  padding: 12px;
  width: 100%;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const FooterButton = () => {
  return (
    <Flex justifyContent="center" mt="24px">
      <Box mr="16px">
        <StyledButton variant="secondary">
          Reset
        </StyledButton>
      </Box>
      <Box>
        <StyledButton>
          Lock
        </StyledButton>
      </Box>
    </Flex>
  );
};

const CreateLocks = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [startDate, setStartDate] = useState(null);

  return (
    <CreateLocksPage>
      <StyledPageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        index={1}
      >
        <Box maxWidth="420px" margin="0 auto" position="relative">
          <StyledHeading scale="xl">{t('Create Your Locks')}</StyledHeading>
          <StyledCard>
            <LighterCard mb="24px">
              <Success>
                <Text color="white" fontSize="14px">
                  Verified <br />
                  TaikoPad is Audited By:
                  <Text as="span" color="primary"> Certik</Text>
                </Text>
              </Success>
            </LighterCard>
            <StyledInput placeholder="Token or LP Token Address" />
            <StyledInput label="AMOUNT" placeholder="0" />
            <Box position="relative">
              <StyledDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="MM/d/yyyy hh:mm aa"
                placeholderText="09/09/2023 03:57 pm"
              />
              <img
                src={DatePickerIcon}
                alt="calendar"
                style={{ position: 'absolute', top: '15px', right: '15px' }}
              />
            </Box>
            <Warning>
              <Flex alignItems="center" flexWrap="wrap">
                <Text fontSize="14px" color="#FFF7CD" mr="8px">
                  Exclude TaikoPad's lock address
                </Text>
                <img src={CopyIcon} alt="copy" style={{ marginRight: '8px' }} />
                <Text fontSize="14px" color="#FFF7CD">
                  from Fees, Max Transaction and Rewards.
                </Text>
              </Flex>
            </Warning>
            <FooterButton />
          </StyledCard>
        </Box>
      </StyledPageSection>
    </CreateLocksPage>
  );
};

export default CreateLocks;