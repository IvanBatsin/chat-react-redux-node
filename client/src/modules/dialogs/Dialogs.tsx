import React from 'react';
import './dialogs.scss';
import { IMessage } from '../../interfaces';
import DialogItem from '../../components/DialodItem/DialogItem';
import { Empty } from 'antd';

interface IDialogsProps {
  search: string
}

export const Dialogs: React.FC<IDialogsProps> = ({search}: IDialogsProps): React.ReactElement => {
  const [dialogs, setDialogs] = React.useState<IMessage[]>([]);
  const fetchDialogs: IMessage[] = [
    {
      createdAt: 'Mon Dec 07 2020 19:37:48 GMT+0300 (Москва, стандартное время)',
      isReaded: false,
      text: 'Some text to check word break lorem ipsum natir',
      _id: 'some string',
      attachments: [],
      user: {
        _id: 'some string',
        avatarUrl: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        createdAt: 'Sun Dec 06 2008 7:25:01 GMT+0300 (Москва, стандартное время)',
        email: 'test@gmail.com',
        fullName: 'Lorelei Lee',
        userName: 'Sorry',
        online: true
      }
    },
    {
      createdAt: 'Sun Dec 06 2020 7:25:01 GMT+0300 (Москва, стандартное время)',
      isReaded: true,
      text: 'Second text to check width and overfflow block hidden',
      _id: 'some string',
      attachments: [],
      user: {
        _id: 'some string',
        avatarUrl: 'https://images.unsplash.com/photo-1513207565459-d7f36bfa1222?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=335&q=80',
        createdAt: 'Sun Dec 06 2008 7:25:01 GMT+0300 (Москва, стандартное время)',
        email: 'test@gmail.com',
        fullName: 'Gia Derza',
        userName: 'Sorry',
        online: false
      }
    },
    {
      createdAt: 'Sun Dec 06 2012 7:25:01 GMT+0300 (Москва, стандартное время)',
      isReaded: true,
      text: 'Hidden text',
      _id: 'some string',
      attachments: [],
      user: {
        _id: 'some string',
        avatarUrl: '',
        createdAt: 'Sun Dec 06 2008 7:25:01 GMT+0300 (Москва, стандартное время)',
        email: 'test@gmail.com',
        fullName: 'Phoenix Marie',
        userName: 'Sorry',
        online: true
      }
    },
  ];

  const filterDialogs = () => {
    if (!search) {
      setDialogs(fetchDialogs);
    } else {
      const filteredDialogs = fetchDialogs.filter(item => item.user.fullName.toUpperCase().indexOf(search.toUpperCase()) >= 0);
      setDialogs(filteredDialogs);
    }
  }

  React.useEffect(() => {
    setDialogs(fetchDialogs);
  }, []);

  React.useEffect(() => {
    filterDialogs();
  }, [search]);

  return (
    <div className="dialogs">
      {!dialogs.length ? 
        <Empty description="Нет диалогов"/>
      :
        dialogs.map((item, index) => {
          return <DialogItem key={`${item.user.userName}-${index}`} message={item}/>
        })
      }
    </div>
  )
}