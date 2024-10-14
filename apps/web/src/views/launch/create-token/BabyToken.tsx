import React from 'react';
import { FormInput, FormSelect, FormWrapper } from './CustomFormComponents';

const BabyToken: React.FC = () => {
  return (
    <FormWrapper>
      <FormInput label="TOKEN NAME" name="tokenName" placeholder="Ex: Ethereum" />
      <FormInput label="TOKEN SYMBOL" name="tokenSymbol" placeholder="Ex: ETH" />
      <FormInput label="TOTAL SUPPLY" name="totalSupply" type="number" placeholder="Ex: 1000000000" />
      <FormSelect
        label="ROUTER"
        name="router"
        options={[{ value: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1', label: 'Pancakeswap' }]}
      />
      <FormInput label="REWARD TOKEN" name="rewardToken" placeholder="Ex: 0x...." />
      <FormInput label="MINIMUM TOKEN BALANCE FOR DIVIDENDS" name="minimumTokenBalance" type="number" placeholder="Ex: 100000" />
      <FormInput label="TOKEN REWARD FEE (%)" name="tokenRewardFee" type="number" placeholder="0 - 100" />
      <FormInput label="AUTO ADD LIQUIDITY (%)" name="autoAddLiquidity" type="number" placeholder="0 - 25" />
      <FormInput label="MARKETING FEE (%)" name="marketingFee" type="number" placeholder="0 - 25" />
      <FormInput label="MARKETING WALLET" name="marketingWallet" placeholder="Ex: 0x...." />
    </FormWrapper>
  );
};

export default BabyToken;