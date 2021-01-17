import React from 'react';
import { Alert } from 'antd';

interface IAlertProps {
  type?: 'warning' | 'error' | 'info' | 'success',
  title: string
}

export const AlertElem: React.FC<IAlertProps> = ({type = 'error', title}: IAlertProps): React.ReactElement => {
  return (
    <Alert
      message={title}
      type={type}
      closable
    />
  )
}