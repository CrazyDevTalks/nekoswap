import React from 'react';
import { FormInput, FormWrapper } from './CustomFormComponents';

const StandardToken: React.FC = () => {
  return (
    <FormWrapper>
      <FormInput label="Token Name" name="tokenName" placeholder="Ex: Ethereum" />
      <FormInput label="Token Symbol" name="tokenSymbol" placeholder="Ex: ETH" />
      <FormInput label="Token Decimals" name="tokenDecimals" type="number" placeholder="18" />
      <FormInput label="Total Supply" name="totalSupply" type="number" placeholder="Ex: 1000000000" />
    </FormWrapper>
  );
};

export default StandardToken;