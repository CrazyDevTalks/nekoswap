import React from 'react';
import { Form } from 'antd';
import { FormInput, FormSelect, FormWrapper } from './CustomFormComponents';

const LiquidityToken: React.FC = () => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    // Set initial value for router
    form.setFieldsValue({
      router: '0x5501d8409C561DEd5838Bc87707A4a2992aC1fc5'
    });
  }, [form]);

  return (
    <FormWrapper>
      <FormInput label="Token Name" name="tokenName" placeholder="Ex: Ethereum" rules={[{ required: true, message: 'Please input the token name!' }]} />
      <FormInput label="Token Symbol" name="tokenSymbol" placeholder="Ex: ETH" rules={[{ required: true, message: 'Please input the token symbol!' }]} />
      <FormInput label="Total Supply" name="totalSupply" type="number" placeholder="Ex: 1000000000" rules={[{ required: true, message: 'Please input the total supply!' }]} />
      <FormSelect
        label="Router"
        name="router"
        options={[{ value: '0x5501d8409C561DEd5838Bc87707A4a2992aC1fc5', label: 'Pancakeswap' }]}
        rules={[{ required: true, message: 'Please select a router!' }]}
      />
      <FormInput label="Transaction Fee To Generate Yield (%)" name="transactionFeeToYield" type="number" placeholder="Ex: 1" rules={[{ required: true, message: 'Please input the yield fee!' }]} />
      <FormInput label="Transaction Fee To Generate Liquidity (%)" name="transactionFeeToLiquidity" type="number" placeholder="Ex: 1" rules={[{ required: true, message: 'Please input the liquidity fee!' }]} />
      <FormInput label="Charity/Marketing Address" name="marketingAddress" placeholder="Ex: 0x...." rules={[{ required: true, message: 'Please input the marketing address!' }]} />
      <FormInput label="Charity/Mareting Percent (%)" name="marketingPercent" type="number" placeholder="0 - 25" rules={[{ required: true, message: 'Please input the marketing percent!' }]} />
    </FormWrapper>
  );
};

export default LiquidityToken;