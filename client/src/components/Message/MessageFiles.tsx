import React from 'react';
import './messageFiles.scss';
import { DeleteFilled } from '@ant-design/icons';

interface IMessageFileProps {
  file: File,
  deleteOne: (name: string) => void
}

export const MessageFiles: React.FC<IMessageFileProps> = ({file: {name}, deleteOne}: IMessageFileProps): React.ReactElement => {
  return (
    <div className="message_input_files">
      <span className="file_name">{name}</span>
      <DeleteFilled onClick={() => deleteOne(name)} className="file_delete"/>
    </div>
  )
}