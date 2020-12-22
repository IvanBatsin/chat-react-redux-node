import React from 'react';
import { IUser } from '../../interfaces/user';

interface IChatHeaderProps {
  user: IUser
}

export const ChatHeader: React.FC<IChatHeaderProps> = ({user: {fullName, last_seen}}: IChatHeaderProps): React.ReactElement => {
  return (
    <div className="chat_header">
      <div className="chat_header_options">
        <div className="options_round"></div>
        <div className="options_round"></div>
        <div className="options_round"></div>
      </div>
      <span className="chat_header_user">{fullName}</span>
      <div className="chat_header_info">
        <span className={`chat_header_info_status ${last_seen ? 'online' : 'out'}`}></span>{last_seen ? 'Онлайн' : 'Не в сети'}
      </div>
    </div>
  )
}