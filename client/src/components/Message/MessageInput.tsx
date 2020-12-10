import React from 'react';
import './messageInput.scss';
import { SmileOutlined, CameraOutlined, SendOutlined, AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const { TextArea } = Input;

export const MessageInput: React.FC = (): React.ReactElement => {
  const [text, setText] = React.useState<string>('');
  const handleText = (value: string) => {
    setText(value);
  }
  return (
    <div className="message_input">
      <SmileOutlined className="message_input_smile"/>
      <TextArea 
        onChange={event => handleText(event.currentTarget.value)}
        defaultValue={text}
        className="message_input_input"
        bordered={false}
        placeholder="Введите сообщение"
        maxLength={280}/>
      <div className="message_input_icons">
        <CameraOutlined/>
        {!text && <AudioOutlined/>}
        <SendOutlined />
      </div>
    </div>
  )
}