import React from 'react';
import "./chat.scss";
import { Message } from '../../components/index';
import { ChatHeader } from '../../components/ChatHeader/ChatHeader';
import { MessageEmpty } from '../../components/Loader/MessageLoader';
import { MessageInput } from '../../components/Message/MessageInput';
import LoadMessage from '../../img/loadMessage.svg';
import SendMessage from '../../img/sendMessage.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessagesData, selectMessagesStatusIsLoading, selectMessagesStatusIsLoaded } from '../../store/ducks/messages/selector';
import { selectUserStateData, selectUserPartner } from '../../store/ducks/user/selector';
import { IUser } from '../../interfaces';

export const Chat: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const messages = useSelector(selectMessagesData);
  const isLoading = useSelector(selectMessagesStatusIsLoading);
  const isLoaded = useSelector(selectMessagesStatusIsLoaded);
  const messagesContainer = React.useRef<HTMLDivElement>(null);

  const user = useSelector(selectUserStateData);
  const partner = useSelector(selectUserPartner);

  React.useEffect(() => {
    if (messages) {
      messagesContainer.current?.scrollTo(0, 9999);
    }
  }, [messages]);


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
            const itsMe = item.author === user!._id;
            return (
              <Message
                key={item._id}
                unread={item.unread}
                isTyping={typing}
                itsMe={itsMe}
                attachments={[]}
                createdAt={item.createdAt}
                text={item.text}
                user={itsMe ? user! : partner!}
              />
            )
          })
        }
      </div>
      <MessageInput/>
    </div>
  )
}