import React from 'react';
import { IUser } from '../../interfaces';

interface IAvatarMessageProps {
  user: IUser
}

export const AvatarMessage: React.FC<IAvatarMessageProps> = ({user}: IAvatarMessageProps): React.ReactElement => {
  console.log(user);
  if (!user.avatarUrl) {
    const letter = user.fullName[0].toUpperCase();
    return <div className="message_avatar_empty" style={{backgroundColor: user.bgColor}}>{letter}</div>
  }

  return <div className="message_avatar_picture" style={{backgroundImage: `url(${user.avatarUrl})`}}></div>
}