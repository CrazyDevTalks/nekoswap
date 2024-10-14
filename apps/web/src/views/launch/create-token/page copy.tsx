import React, { useState } from "react";
import { Box, Flex, Heading, PageSection, Button, Card, Text, Select } from '@pancakeswap/uikit';
import { Form, message } from 'antd';
import useTheme from 'hooks/useTheme';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import standardTokenAbi from "../../../abis/standardTokenAbi";
import LiquidityGeneratorTokenFactoryAbi from "../../../abis/LiquidityGeneratorTokenFactoryAbi"; // Import your liquidity token ABI
import StandardToken from "./StandardToken";
import LiquidityToken from "./LiquidityToken";

const CreateToken: React.FC = () => {
  const { theme } = useTheme();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedTokenType, setSelectedTokenType] = useState("standard"); // Default token type

  // Define the contract addresses
  const standardTokenAddress = '0xA9EAf37d95A30e0fC2AB6405Ce1af00b74C6757f';
  const liquidityTokenAddress = '0xA20E5c308Fcfab355629FeB76d3bF812A10392d3';

  // Contract write hook (uses a dynamic ABI and address based on token type)
  const abi = selectedTokenType === "standard" ? standardTokenAbi : LiquidityGeneratorTokenFactoryAbi;
  const contractAddress = selectedTokenType === "standard" ? standardTokenAddress : liquidityTokenAddress;

  const { data, write } = useContractWrite({
    address: contractAddress as `0x${string}`,
    abi,
    functionName: 'create',
    mode: 'recklesslyUnprepared',
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Handle form submission based on token type
  const handleCreateToken = async (values: any) => {
    try {
      const args =
        selectedTokenType === "standard"
          ? [values.tokenName, values.tokenSymbol, values.tokenDecimals, values.totalSupply]
          : [values.tokenName, values.tokenSymbol, values.totalSupply, values.router, values.transactionFeeToYield, values.transactionFeeToLiquidity, values.marketingAddress, values.marketingPercent];

      await write({
        recklesslySetUnpreparedArgs: args,
        recklesslySetUnpreparedOverrides: {
          value: parseEther("0.1"), // Fee to create the token
        }
      });

      if (isSuccess) {
        messageApi.open({
          type: "success",
          content: "Token Created Successfully",
        });
        form.resetFields();
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      messageApi.open({
        type: "error",
        content: "Transaction failed. Please try again.",
      });
    }
  };

  // Handler for select dropdown
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value; // Extract value from event
    setSelectedTokenType(selectedValue);
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
            {/* Dropdown to select token type */}
            <Box mb="24px">
              <Text fontSize="14px">Select Token Type</Text>
              <select
                value={selectedTokenType}
                onChange={handleSelectChange} // Updated handler
                style={{ width: '100%', padding: '8px', fontSize: '16px' }} // Example inline styles
              >
                <option value="standard">Standard Token</option>
                <option value="liquidity">Liquidity Token</option>
              </select>
            </Box>

            {/* Dynamic form based on selected token type */}
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
