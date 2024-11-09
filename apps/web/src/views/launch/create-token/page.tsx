import React, { useState } from "react";
import { Box, Flex, Heading, PageSection, Button, Card, Text } from '@pancakeswap/uikit';
import { Form, message, Input } from 'antd';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import useContractWriteHook from './contract-write';
import StandardToken from "./StandardToken";
import LiquidityToken from "./LiquidityToken";

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 630px; // Increased to match other pages
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
  padding: 0 16px;
`;

const InputLabel = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  padding-left: 16px; // Add left padding to prevent text cut-off
`;

const StyledSelect = styled.select`
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
  }
`;

const CreateToken: React.FC = () => {
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedTokenType, setSelectedTokenType] = useState("standard");

  // Define the contract addresses
  const standardTokenAddress = '0xA9EAf37d95A30e0fC2AB6405Ce1af00b74C6757f';
  const liquidityTokenAddress = '0xA20E5c308Fcfab355629FeB76d3bF812A10392d3';

  const contractAddress = selectedTokenType === "standard" ? standardTokenAddress : liquidityTokenAddress;
  const currentToken = selectedTokenType === "standard" ? "1" : "2";

  const { handleWrite, isLoading, isSuccess } = useContractWriteHook(contractAddress, currentToken, messageApi);

  const handleCreateToken = async (values: any) => {
    let args;
    if (selectedTokenType === "standard") {
      args = [values.tokenName, values.tokenSymbol, values.tokenDecimals, values.totalSupply];
    } else {
      // Ensure all required fields are present and have correct types
      args = [
        values.tokenName,
        values.tokenSymbol,
        BigInt(values.totalSupply),
        values.router,  
        BigInt(values.transactionFeeToYield),
        BigInt(values.transactionFeeToLiquidity),
        values.marketingAddress, 
        BigInt(values.marketingPercent)
      ];
    }

    console.log("Submitting form with values:", values);
    console.log("Calling handleWrite with args:", args);
    await handleWrite(args, values);
  };

  React.useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess, form]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedTokenType(selectedValue);
    form.resetFields();
  };

  return (
    <PageSection
      innerProps={{ style: { margin: '0', width: '100%' } }}
      background={theme.colors.background}
      index={1}
      hasCurvedDivider={false}
    >
      {contextHolder}
      <Box maxWidth="630px" margin="0 auto" position="relative"> {/* Changed from 480px to 630px */}
        <Heading scale="xl" mb="24px" textAlign="center">Create Token</Heading>
        <StyledCard>
          <Form form={form} onFinish={handleCreateToken} layout="vertical">
            <InputWrapper>
              <InputLabel>Select Token Type</InputLabel>
              <StyledSelect
                value={selectedTokenType}
                onChange={handleSelectChange}
              >
                <option value="standard">Standard Token</option>
                <option value="liquidity">Liquidity Token</option>
              </StyledSelect>
            </InputWrapper>

            {selectedTokenType === "standard" ? <StandardToken /> : <LiquidityToken />}

            <Flex justifyContent="center" mt="24px"> {/* Changed from space-between to center */}
              <Box mr="16px">
                <Button variant="secondary" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Box>
              <Box>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create New Token'}
                </Button>
              </Box>
            </Flex>
          </Form>
        </StyledCard>
      </Box>
    </PageSection>
  );
};

export default CreateToken;