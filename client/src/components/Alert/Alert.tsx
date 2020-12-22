import React from 'react';
import { Alert } from 'antd';

interface IAlertProps {
  message: string,
  type: 'warning' | 'error' | 'info' | 'success',
  title: string
}

export const AlertElem: React.FC<IAlertProps> = ({message, type, title}: IAlertProps): React.ReactElement => {
  return (
    <Alert
      message={title}
      description={message}
      type={type}
      showIcon
      closable
    />
  )
}