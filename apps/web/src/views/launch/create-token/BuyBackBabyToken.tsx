import React from 'react';
import { FormInput, FormSelect, FormWrapper } from './CustomFormComponents';

const BuyBackBabyToken: React.FC = () => {
  return (
    <FormWrapper>
      <FormInput
        label="TOKEN NAME"
        name="tokenName"
        placeholder="Ex: Ethereum"
        rules={[{ required: true, message: "Please input token name!" }]}
      />
      <FormInput
        label="TOKEN SYMBOL"
        name="tokenSymbol"
        placeholder="Ex: ETH"
        rules={[{ required: true, message: "Please input token symbol!" }]}
      />
      <FormInput
        label="TOTAL SUPPLY"
        name="totalSupply"
        type="number"
        placeholder="Ex: 1000000000"
        rules={[{ required: true, message: "Please input total supply!" }]}
      />
      <FormSelect
        label="ROUTER"
        name="router"
        options={[{ value: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1', label: 'Pancakeswap' }]}
        rules={[{ required: true, message: "Please select a router!" }]}
      />
      <FormInput
        label="REWARD TOKEN"
        name="rewardToken"
        placeholder="Ex: 0x...."
        rules={[{ required: true, message: "Please input reward token!" }]}
      />
      <FormInput
        label="LIQUIDITY FEE (%)"
        name="liquidityFee"
        type="number"
        placeholder="1 - 100"
        rules={[{ required: true, message: "Please input liquidity fee!" }]}
      />
      <FormInput
        label="BUYBACK FEE (%)"
        name="buyBackFee"
        type="number"
        placeholder="3"
        rules={[{ required: true, message: "Please input buyback fee!" }]}
      />
      <FormInput
        label="REFLECTION FEE (%)"
        name="reflectionFee"
        type="number"
        placeholder="8"
        rules={[{ required: true, message: "Please input reflection fee!" }]}
      />
      <FormInput
        label="MARKETING FEE (%)"
        name="marketingFee"
        type="number"
        placeholder="0 - 100"
        rules={[{ required: true, message: "Please input marketing fee!" }]}
      />
    </FormWrapper>
  );
};

export default BuyBackBabyToken;