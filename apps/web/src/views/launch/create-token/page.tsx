import React, { useState } from "react";
import { Box, Flex, Heading, PageSection, Button, Card, Text } from '@pancakeswap/uikit';
import { Form, message } from 'antd';
import useTheme from 'hooks/useTheme';
import useContractWriteHook from './contract-write';
import StandardToken from "./StandardToken";
import LiquidityToken from "./LiquidityToken";

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
      <Box maxWidth="480px" margin="0 auto" position="relative">
        <Heading scale="xl" mb="24px" textAlign="center">Create Token</Heading>
        <Card>
          <Form form={form} onFinish={handleCreateToken} layout="vertical">
            <Box mb="24px">
              <Text fontSize="14px">Select Token Type</Text>
              <select
                value={selectedTokenType}
                onChange={handleSelectChange}
                style={{ width: '100%', padding: '8px', fontSize: '16px' }}
              >
                <option value="standard">Standard Token</option>
                <option value="liquidity">Liquidity Token</option>
              </select>
            </Box>

            {selectedTokenType === "standard" ? <StandardToken /> : <LiquidityToken />}

            <Flex justifyContent="space-between" mt="24px">
              <Button variant="secondary" onClick={() => form.resetFields()}>
                Reset
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create New Token'}
              </Button>
            </Flex>
          </Form>
        </Card>
      </Box>
    </PageSection>
  );
};

export default CreateToken;