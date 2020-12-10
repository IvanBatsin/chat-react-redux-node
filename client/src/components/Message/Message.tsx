import React from 'react';
import './message.scss';
import { IUser, IAttachments } from '../../interfaces/';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';
import classNames from 'classnames';
import { AudioMessage } from '../../components/Audio/AudioMessage';
import { AvatarMessage } from '../../components/Avatar/AvatarMessage';

// Img
import Check from '../../img/check.svg';
import Send from '../../img/send.svg';

interface MessageProps {
  text: string,
  createdAt: string,
  user: IUser,
  itsMe: boolean,
  isReaded: boolean,
  attachments: IAttachments[],
  isTyping: boolean
  audio?: string
}

const Message: React.FC<MessageProps> = ({text, user, createdAt, itsMe, isReaded, attachments, isTyping, audio}: MessageProps): React.ReactElement => {
  return (
    <div className={classNames('message', {'message_me': itsMe, "message_typing": isTyping})}>
      <div className="message_avatar">
       <AvatarMessage user={user}/>
      </div>
      {isTyping ? 
        <div className="message_content">
          <div>
            <div className="message_bubble">
              <p className="message_text">Typing...</p>  
            </div>
          </div>
        </div>
      : 
      <>
        <div className="message_content">
          <div>
            {audio ? 
              <AudioMessage audio={audio}/>
            :
              <>
                {text ? 
                  <div className="message_bubble">
                    <p className="message_text">{text}</p> 
                  </div>
                : null
                }

                <div className="message_attachments">
                  {attachments.length > 0 && attachments.map((item, index) => {
                    return (
                      <div key={`${item.fileName}${index}`} className="message_attachments_item">
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <img src={item.url} alt={item.fileName}></img>
                        </a>
                      </div>
                    )
                  })}
                </div>        
              </>
            }

          {createdAt && <span className="message_date">{format(new Date(createdAt), 'H:mm MMMM yyy', {locale: ru})}</span>}
          </div>
        </div>
        <div className="message_check">
          <img src={isReaded ? Check : Send} alt="Check Icon"></img>
        </div>
      </>
    }
    </div>
  )
}

export default Message;