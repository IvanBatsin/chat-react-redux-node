import React from 'react';
import "./chat.scss";
import { Message } from '../../components/index';
import { ChatHeader } from '../../components/ChatHeader/ChatHeader';
import { MessageEmpty } from '../../components/Loader/MessageLoader';
import { MessageInput } from '../../components/Message/MessageInput';
import LoadMessage from '../../img/loadMessage.svg';
import SendMessage from '../../img/sendMessage.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesData, selectIsLoading, selectIsLoaded } from '../../store/ducks/messages/selector';
import { selectUserObject } from '../../store/ducks/user/selector';

export const Chat: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectIsLoading);
  const isLoaded = useSelector(selectIsLoaded);
  const user = useSelector(selectUserObject);
  const messagesContainer = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messages) {
      messagesContainer.current?.scrollTo(0, 9999);
    }
  }, [messages]);

  // const user: IUser  = {
  //   _id: 'wwe13',
  //   createdAt: 'December 17, 2009 03:24:00',
  //   email: 'mymail@dengi.cvv',
  //   fullName: 'GhosteMane',
  //   userName: 'Tiger',
  //   avatarUrl: '',
  //   confirmed: true,
  //   last_seen: 'December 17, 2009 03:24:00',
  //   updatedAt: 'December 17, 2009 03:24:00'
  // };
  const typing = false;

  return (
    <div className="chat">
      <ChatHeader/>
      <div ref={messagesContainer} className="chat_content">
        {isLoading && <MessageEmpty src={LoadMessage}/>}
        {isLoaded && !messages?.length ?
          <MessageEmpty src={SendMessage}/>
        :
          messages?.map(item => {
            return (
              <Message
                key={item._id}
                isReaded={item.unread}
                isTyping={typing}
                itsMe={item.author === user!._id}
                // attachments={item.attachments}
                attachments={[]}
                createdAt={item.createdAt}
                text={item.text}
                user={user!}
                audio={item.audio}
              />
            )
          })
        }
      </div>
      <MessageInput/>
    </div>
  )
}