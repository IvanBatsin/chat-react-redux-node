import React from 'react';
import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';

interface InputComponentProps {
  label: string,
  name: string,
  rules?: Rule[],
  value: string,
  handleDataChange:(name: string, value: string) => void,
  autoFocus?: boolean
}

export const InputComponent = ({handleDataChange, label, name, rules, value, autoFocus}: InputComponentProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      >
      <Input 
        name={name}
        autoFocus={autoFocus} 
        value={value} 
        onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
    </Form.Item>
  )
}