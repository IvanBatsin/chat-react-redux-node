import React from 'react';
import { colorPicker } from '../../helpers/colorPicker';
import { IUser } from '../../interfaces';

interface IAvatarMessageProps {
  user: IUser
}

export const AvatarMessage: React.FC<IAvatarMessageProps> = ({user}: IAvatarMessageProps): React.ReactElement => {
  if (!user.avatarUrl) {
    const letter = user.fullName[0].toUpperCase();
    return <div className="message_avatar_empty" style={{backgroundColor: colorPicker()}}>{letter}</div>
  }
  return <div className="message_avatar_picture" style={{backgroundImage: `url(${user.avatarUrl})`}}></div>
}