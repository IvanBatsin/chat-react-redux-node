import React from 'react';
import { IMessage } from '../../interfaces';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import distance from 'date-fns/esm/formatDistanceToNow'; 
import { ru } from 'date-fns/locale';
import Check from '../../img/check.svg';
import { AvatarCheck } from '../Avatar/AvatarDialog';

interface IDialogProps {
  message: IMessage
}

const DialogItem: React.FC<IDialogProps> = ({message: {user, text, isReaded, createdAt}}: IDialogProps): React.ReactElement => {
  return (
    <div className="dialogs_item">
      <AvatarCheck avatar={user.avatarUrl} userName={user.fullName}>
        {user.online && <div className="dialogs_onlineStatus"></div>}
      </AvatarCheck>
      <div className="dialogs_item_message">
        <div className="dialogs_item_message_info">
          <span className="dialogs_item_message_info_user">{user.fullName}</span>
          {isToday(new Date(createdAt)) ? 
            <span className="dialogs_item_message_info_time">{format(new Date(createdAt), 'H:mm', {locale: ru})}</span>
          :
            <span className="dialogs_item_message_info_time">{distance(new Date(createdAt), {locale: ru})}</span>
          }
        </div>
        <div className="dialogs_item_message_content">
          <span className="dialogs_item_message_content_text">{text}</span>
          {!isReaded ? 
            <div className="dialogs_item_message_content_unCheck"></div>
          : 
            <img className="dialogs_item_message_content_check" alt="Checked" src={Check}></img>
          }
        </div>
      </div>
    </div>
  )
}

export default DialogItem;