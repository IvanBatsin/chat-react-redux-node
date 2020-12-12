import React from 'react';
import './messageInput.scss';
import { SmileOutlined, CameraOutlined, SendOutlined, AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { MessageFiles } from './MessageFiles';
import axios from 'axios';

const { TextArea } = Input;

export const MessageInput: React.FC = (): React.ReactElement => {
  const [text, setText] = React.useState<string>('');
  const [files, setFiles] = React.useState<File[]>([]);
  // const [files, setFiles] = React.useState<FileList>();

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
    // setFiles(fileInput.current?.files!);
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
    console.log(data);
    // try {
    //   await axios.post('/messages', {
    //     data: data,
    //     headers: {
    //       "Content-Type": "multipart/form-data"
    //     }
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <div className="message_input">
      <div className="message_input_block">
        <SmileOutlined className="message_input_block_smile"/>
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
  )
}