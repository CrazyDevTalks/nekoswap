import React from 'react';
import { Input, Text, Flex, Box, Select as PancakeSelect } from '@pancakeswap/uikit';
import styled from 'styled-components';
import { Form } from 'antd';

interface FormInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  rules?: Array<{ required: boolean; message: string }>;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: Array<{ value: string; label: string }>;
  rules?: Array<{ required: boolean; message: string }>;
}

const InputContainer = styled.div`
  padding: 0 16px;
  margin-bottom: 24px;
`;

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-control-input {
    width: 100%;
  }
  
  input, .select-wrapper {
    width: 100% !important;
    max-width: 100% !important;
  }
`;

export const FormInput: React.FC<FormInputProps> = ({ label, name, rules, ...props }) => (
  <InputContainer>
    <StyledFormItem 
      name={name} 
      label={label} 
      rules={rules}
      style={{ marginBottom: 0 }}
    >
      <Input {...props} style={{ width: '100%' }} />
    </StyledFormItem>
  </InputContainer>
);

export const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, rules, ...props }) => (
  <InputContainer>
    <StyledFormItem 
      name={name} 
      label={label} 
      rules={rules}
      style={{ marginBottom: 0 }}
    >
      <PancakeSelect options={options} {...props} style={{ width: '100%' }} />
    </StyledFormItem>
  </InputContainer>
);

export const FormWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
  & > div {
    width: 100%;
  }
`;