import React from 'react';
import './dialogs.scss';
import DialogItem from '../../components/DialodItem/DialogItem';
import DialogItemLoader from '../../components/DialodItem/DialogItemLoader';
import { Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs, searchDialog, setDialogsData } from '../../store/ducks/dialogs/actionCreators';
import { selectDialogsData, selectStatusIsLoadng, selectStatusIsLoaded } from '../../store/ducks/dialogs/selector';
import { fetchMessagesData } from '../../store/ducks/messages/actionCreators';
import { IDialog } from '../../interfaces/dialog';

interface IDialogsProps {
  search: string
}

export const Dialogs: React.FC<IDialogsProps> = ({search}: IDialogsProps): React.ReactElement => {
  const dispatch = useDispatch();
  const dialogs = useSelector(selectDialogsData);
  const isLoading = useSelector(selectStatusIsLoadng);
  const isLoaded = useSelector(selectStatusIsLoaded);
  let cachedDialogs = React.useRef<IDialog[]>([]);

  React.useEffect(() => {
    dispatch(fetchDialogs());
  }, []);

  React.useEffect(() => {
    if (dialogs && dialogs!.length && !cachedDialogs.current.length) {
      cachedDialogs.current = [...dialogs!];
    }
  }, [dialogs]);

  React.useEffect(() => {
    dispatch(searchDialog(search));

    if (!search.length && cachedDialogs.current.length) {
      dispatch(setDialogsData([...cachedDialogs.current]));
    }
  }, [search]);

  const handleChooseDialog = (dialog: string) => {
    dispatch(fetchMessagesData(dialog));
  }

  return (
    <div className="dialogs">
      {isLoading && 
        <> 
          <DialogItemLoader />
          <DialogItemLoader />
          <DialogItemLoader />
          <DialogItemLoader />
        </>
      }
      {!dialogs?.length && isLoaded ? 
        <Empty description="Нет диалогов"/>
      :
        dialogs?.map(item => {
          return <DialogItem chooseDialog={handleChooseDialog} key={item._id} dialog={item}/>
        })
      }
    </div>
  )
}