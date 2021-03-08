import React from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import distance from 'date-fns/esm/formatDistanceToNow'; 
import { ru } from 'date-fns/locale';
import Check from '../../img/check.svg';
import { AvatarCheck } from '../Avatar/AvatarDialog';
import { IDialog } from '../../interfaces/dialog';
import { IUser } from '../../interfaces';
import { getPartner } from '../../helpers/getPartner';
import { isOnline } from '../../helpers/isOnline';

interface IDialogProps {
  dialog: IDialog,
  currentUser: IUser,
  selectDialog: (dialogId: string, partner: IUser) => void
}

const DialogItem: React.FC<IDialogProps> = ({dialog: {author, partner, createdAt, _id, lastMessage}, selectDialog, currentUser}: IDialogProps) => {
  if (!currentUser) return null;

  const dialogPartner = getPartner(currentUser, author, partner);
 
  return (
    <div className="dialogs_item" onClick={() => selectDialog(_id, dialogPartner)}>
      <AvatarCheck 
        avatar={dialogPartner.avatarUrl} 
        userName={dialogPartner.fullName}
        color={dialogPartner.bgColor!}
      >
        {isOnline(dialogPartner.last_seen!) && <div className="dialogs_onlineStatus"></div>}
      </AvatarCheck>
      <div className="dialogs_item_message">
        <div className="dialogs_item_message_info">
          <span className="dialogs_item_message_info_user">{dialogPartner.fullName}</span>
          {isToday(new Date(createdAt)) ? 
            <span className="dialogs_item_message_info_time">{format(new Date(createdAt), 'H:mm', {locale: ru})}</span>
          :
            <span className="dialogs_item_message_info_time">{distance(new Date(createdAt), {locale: ru})}</span>
          }
        </div>
        <div className="dialogs_item_message_content">
          <span 
            className={`dialogs_item_message_content_text ${lastMessage.author._id === currentUser._id && 'my_message'}`}>
              {lastMessage.text}
          </span>
          {lastMessage.unread ? 
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