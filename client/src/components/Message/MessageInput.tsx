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
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  }

  const showFile = () => {
    console.log(fileInput.current?.value);
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
        <input type="file" onChange={showFile} hidden ref={fileInput}/>
        <CameraOutlined onClick={handleClick}/>
        {!text && <AudioOutlined/>}
        <SendOutlined />
      </div>
    </div>
  )
}