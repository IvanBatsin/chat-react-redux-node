import React from 'react';
import { colorPicker } from '../../helpers/colorPicker';

interface IAvatarCheck {
  avatar: string | undefined,
  userName: string,
  children?: React.ReactNode
}

export const AvatarCheck: React.FC<IAvatarCheck> = ({avatar, userName, children}: IAvatarCheck): React.ReactElement => {
  if (!avatar){
    const letter = userName[0].toUpperCase();
  return <div className="dialogs_item_avatar_icon" style={{backgroundColor: colorPicker()}}>{letter}{children}</div>
  }
  return (
    <div className="dialogs_item_avatar" style={{backgroundImage: `url(${avatar})`}}>{children}</div>
  )
}