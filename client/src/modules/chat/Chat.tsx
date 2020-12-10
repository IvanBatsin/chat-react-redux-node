import React from 'react';
import "./chat.scss";
import { Message } from '../../components/index';
import { IMessage, IUser } from '../../interfaces/index';
import { ChatHeader } from '../../components/ChatHeader/ChatHeader';
import { MessageEmpty } from '../../components/Loader/MessageLoader';
import { MessageInput } from '../../components/Message/MessageInput';
import LoadMessage from '../../img/loadMessage.svg';
import SendMessage from '../../img/sendMessage.svg';
import { messagesApi } from '../../API/fetchMessages';

export const Chat: React.FC = (): React.ReactElement => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [isFetched, setIsFetched] = React.useState<boolean>(false);
  const fetchMessages = async (): Promise<void> => {
    try {
      const data = await messagesApi.fetchMessages();
      setMessages(data);
      setIsFetched(true);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    fetchMessages();
  }, []);

  const user: IUser  = {
    _id: 'wwe13',
    createdAt: 'December 17, 2009 03:24:00',
    email: 'mymail@dengi.cvv',
    fullName: 'GhosteMane',
    online: true,
    userName: 'Tiger',
    avatarUrl: '',
    password: 'machineGun'
  };
  const typing = false;

  return (
    <div className="chat">
      <ChatHeader user={user}/>
      <div className="chat_content">
        {!isFetched ? 
          <MessageEmpty src={LoadMessage}/>
        :
          !messages.length ? 
            <MessageEmpty src={SendMessage}/>
          :
          messages.map(item => {
            return (
              <Message
                key={item._id}
                isReaded={item.isReaded}
                isTyping={typing}
                itsMe={item.user._id === user._id}
                attachments={item.attachments}
                createdAt={item.createdAt}
                text={item.text}
                user={item.user}
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