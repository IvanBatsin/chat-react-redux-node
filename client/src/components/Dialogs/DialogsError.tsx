import React from 'react';
import { Result, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface DialogsErrorProps {
  fetchDialogs: () => void
} 

export const DialogsError: React.FC<DialogsErrorProps> = ({fetchDialogs}: DialogsErrorProps): React.ReactElement => {
  return (
    <Result
      status="warning"
      title="Произошла ошибка"
      extra={
        <Button onClick={fetchDialogs} type="primary" key="console">
          Повторить <ReloadOutlined />
        </Button>
      }
    />
  )
}