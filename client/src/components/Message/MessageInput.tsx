import React from 'react';
import './messageInput.scss';
import { SmileOutlined, CameraOutlined, SendOutlined, AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { MessageFiles } from './MessageFiles';
import axios from 'axios';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

const { TextArea } = Input;

export const MessageInput: React.FC = (): React.ReactElement => {
  const [text, setText] = React.useState<string>('');
  const [files, setFiles] = React.useState<File[]>([]);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);

  const toggleEmojiPicker = () => {
    setShowEmoji(prevState => !prevState);
  }

  const handleText = (value: string) => {
    setText(value);
  }
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  }

  const showFile = () => {
    const filesArray = Array.from(fileInput.current?.files!).map(item => item);
    setFiles(filesArray);
  }

  const deleteFile = (name: string): void =>  {
    const filtered = files.filter(item => item.name !== name);
    setFiles(filtered);
  }

  const handleSendMessage = async () => {
    const data = new FormData();
    for(let i=0; i<files.length; i++){
      data.append('file', files[i]);
    }
    data.append('text', text);
    
    try {
      await axios({
        url: '/messages',
        method: 'POST',
        data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {showEmoji && <Picker style={{position:"absolute", top: 140}} set='apple' />}
      <div className="message_input">
        <div className="message_input_block">
          <SmileOutlined onClick={toggleEmojiPicker} className="message_input_block_smile"/>
          <TextArea 
            onChange={event => handleText(event.currentTarget.value)}
            defaultValue={text}
            className="message_input_block_input"
            bordered={false}
            placeholder="Введите сообщение"
            maxLength={280}/>
          <div className="message_input_block_icons">
            <input 
              type="file" 
              name="files" 
              multiple={true}
              accept=".jpg, .jpeg, .png"
              onChange={showFile} 
              hidden ref={fileInput}
            />
            <CameraOutlined onClick={handleClick}/>
            {!text && !(files.length > 0) && <AudioOutlined/>}
            <SendOutlined onClick={handleSendMessage}/>
          </div>
        </div>
        {files.length > 0 && 
          files.map(item => {
            return <MessageFiles deleteOne={deleteFile} key={item.name} file={item}/>
          })
        }
      </div>
    </>
  )
}