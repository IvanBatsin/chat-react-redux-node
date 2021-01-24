import React from 'react';
import './dialogs.scss';
import DialogItem from '../../components/DialodItem/DialogItem';
import DialogItemLoader from '../../components/DialodItem/DialogItemLoader';
import { Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs } from '../../store/ducks/dialogs/actionCreators';
import { selectDialogsData, selectStatusIsLoadng, selectStatusIsLoaded, selectStatusIsError } from '../../store/ducks/dialogs/selector';
import { fetchMessagesData } from '../../store/ducks/messages/actionCreators';
import { IDialog } from '../../interfaces/dialog';
import { DialogsError } from '../../components/Dialogs/DialogsError';
import { selectUserObject } from '../../store/ducks/user/selector';
import { getPartner } from '../../helpers/getPartner';
import { setPartner } from '../../store/ducks/user/actionCreators';
import { IUser } from '../../interfaces';
import { socket } from '../../core/socket';
import { SocketActions } from '../../interfaces/socketActions';

interface IDialogsProps {
  search: string
}

export const Dialogs: React.FC<IDialogsProps> = ({search}: IDialogsProps): React.ReactElement => {
  const dispatch = useDispatch();
  const fetchedDialogs = useSelector(selectDialogsData);
  const [dialogsState, setDialogsState] = React.useState<IDialog[]>([]);
  const [currentDialog, setCurrentDialog] = React.useState<string>('');
  
  // Selectors
  const isLoading = useSelector(selectStatusIsLoadng);
  const isLoaded = useSelector(selectStatusIsLoaded);
  const isError = useSelector(selectStatusIsError);
  const user = useSelector(selectUserObject);

  const handleFetchDialogs = (): void => {
    if (user) {
      dispatch(fetchDialogs(user?._id));
    }
  }

  const searchDialogs = (): void => {
    const searchedDialogs = fetchedDialogs!.filter(dialog => {
      const partner = getPartner(user!, dialog.author, dialog.partner);
      if (partner.fullName.toUpperCase().indexOf(search.toUpperCase()) >= 0){
        return dialog;
      }
    });
    setDialogsState(searchedDialogs);
  }

  const handleSelectDialog = React.useCallback((dialog: string, partner: IUser): void => {
    if (dialog !== currentDialog) {
      dispatch(fetchMessagesData(dialog));
      dispatch(setPartner(partner));
      dispatch(fetchMessagesData(dialog));
      setCurrentDialog(dialog);
    }
  }, [dispatch, currentDialog]);

  React.useEffect(() => {
    handleFetchDialogs();

    socket.on(SocketActions.DIALOG_CREATED, (obj: any) => {
      console.log(obj);
      // dispatch(fetchDialogs(user?._id));
    });
  }, []);

  React.useEffect(() => {
    if (fetchedDialogs && fetchedDialogs!.length && !dialogsState.length) {
      setDialogsState(fetchedDialogs);
    }
  }, [fetchedDialogs]);

  React.useEffect(() => {
    if (user) {
      if (search.length > 0) {
        searchDialogs();
      } else if (search.length === 0) {
        setDialogsState(fetchedDialogs || []);
      }
    }
  }, [search]);

  return (
    <div className="dialogs">
      {isError && <DialogsError fetchDialogs={handleFetchDialogs}/>}
      {isLoading && 
        <> 
          <DialogItemLoader />
          <DialogItemLoader />
          <DialogItemLoader />
          <DialogItemLoader />
        </>
      }
      {!dialogsState?.length && isLoaded ? 
        <Empty description="Нет диалогов"/>
      :
        dialogsState?.map(item => {
          return <DialogItem selectDialog={handleSelectDialog} key={item._id} dialog={item} currentUser={user!}/>
        })
      }
    </div>
  )
}