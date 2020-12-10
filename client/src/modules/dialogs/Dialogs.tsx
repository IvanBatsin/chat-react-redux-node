import React from 'react';
import './dialogs.scss';
import { IMessage } from '../../interfaces';
import DialogItem from '../../components/DialodItem/DialogItem';
import DialogItemLoader from '../../components/DialodItem/DialogItemLoader';
import { Empty } from 'antd';
import { dialogsApi } from '../../API/fetchDialogs';
import { IDialog } from '../../interfaces/dialog';

interface IDialogsProps {
  search: string
}

export const Dialogs: React.FC<IDialogsProps> = ({search}: IDialogsProps): React.ReactElement => {
  const [dialogs, setDialogs] = React.useState<IMessage[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const cacheDialogs = React.useRef<IDialog[]>([]);

  const findDialogs = () => {
    const template = [...cacheDialogs.current];
    const filteredDialogs = template.filter(item => item.user.fullName.toUpperCase().indexOf(search.toUpperCase()) >= 0);
    setDialogs(filteredDialogs);
  }

  const handleFetchDialogs = async (): Promise<void> => {
    try {
      const data = await dialogsApi.fetchAllDialogs();
      cacheDialogs.current = data;
      setDialogs(data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    handleFetchDialogs();
  }, []);

  React.useEffect(() => {
    findDialogs();
  }, [search]);

  return (
    <div className="dialogs">
      {!isLoaded ? 
        new Array(4).fill(1).map((item, index) => {
          return <DialogItemLoader key={index}/>
        })
      :
        !dialogs.length ? 
        <Empty description="Нет диалогов"/>
      :
        dialogs.map(item => {
          return <DialogItem key={item._id} message={item}/>
        })
      }
    </div>
  )
}