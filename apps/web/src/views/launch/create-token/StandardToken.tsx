import React from 'react';
import { FormInput, FormWrapper } from './CustomFormComponents';

const StandardToken: React.FC = () => {
  return (
    <FormWrapper>
      <FormInput label="TOKEN NAME" name="tokenName" placeholder="Ex: Ethereum" />
      <FormInput label="TOKEN SYMBOL" name="tokenSymbol" placeholder="Ex: ETH" />
      <FormInput label="TOKEN DECIMALS" name="tokenDecimals" type="number" placeholder="18" />
      <FormInput label="TOTAL SUPPLY" name="totalSupply" type="number" placeholder="Ex: 1000000000" />
    </FormWrapper>
  );
};

export default StandardToken;