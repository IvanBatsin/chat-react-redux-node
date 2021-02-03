import React from 'react';
import './message.scss';
import { IUser, IAttachments, IMessage } from '../../interfaces/';
import format from 'date-fns/format';
import { ru } from 'date-fns/locale';
import classNames from 'classnames';
import { AudioMessage } from '../../components/Audio/AudioMessage';
import { AvatarMessage } from '../../components/Avatar/AvatarMessage';

// Img
import Check from '../../img/check.svg';
import Send from '../../img/send.svg';

interface MessageProps {
  message: IMessage,
  isTyping: boolean,
  itsMe: boolean
}

const Message: React.FC<MessageProps> = ({message, isTyping, itsMe}: MessageProps) => {
  return (
    <div className={classNames('message', {'message_me': itsMe, "message_typing": isTyping})}>
      <div className="message_avatar">
       <AvatarMessage user={message.author}/>
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
            {message.audio ? 
              <AudioMessage audio={message.audio}/>
            :
              <>
                {message.text ? 
                  <div className="message_bubble">
                    <p className="message_text">{message.text}</p> 
                  </div>
                : null
                }

                <div className="message_attachments">
                  {message.attachments!.length > 0 && message.attachments!.map((item, index) => {
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

          {message.createdAt && <span className="message_date">{format(new Date(message.createdAt), 'H:mm MMMM yyy', {locale: ru})}</span>}
          </div>
        </div>
        <div className="message_check">
          <img src={!message.unread ? Check : Send} alt="Check Icon"></img>
        </div>
      </>
    }
    </div>
  )
}

export default Message;