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

export const FormInput: React.FC<FormInputProps> = ({ label, name, rules, ...props }) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Input {...props} />
  </Form.Item>
);

export const FormSelect: React.FC<FormSelectProps> = ({ label, name, options, rules, ...props }) => (
  <Form.Item name={name} label={label} rules={rules}>
    <PancakeSelect options={options} {...props} />
  </Form.Item>
);

export const FormWrapper = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;