import React from 'react';
import './dialogs.scss';
import DialogItem from '../../components/DialodItem/DialogItem';
import DialogItemLoader from '../../components/DialodItem/DialogItemLoader';
import { Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDialogs } from '../../store/ducks/dialogs/actionCreators';
import { selectDialogsData, selectDialogsStatusIsLoading, selectDialogsStatusIsLoaded, selectDialogsStatusIsError } from '../../store/ducks/dialogs/selector';
import { fetchMessagesData } from '../../store/ducks/messages/actionCreators';
import { IDialog } from '../../interfaces/dialog';
import { DialogsError } from '../../components/Dialogs/DialogsError';
import { selectUserStateData } from '../../store/ducks/user/selector';
import { getPartner } from '../../helpers/getPartner';
import { setPartner } from '../../store/ducks/user/actionCreators';
import { IUser } from '../../interfaces';
import { socket } from '../../core/socket';
import { SocketActions } from '../../interfaces/socketActions';

interface IDialogsProps {
  search: string
}

let count = 0;

export const Dialogs: React.FC<IDialogsProps> = ({search}: IDialogsProps): React.ReactElement => {
  const dispatch = useDispatch();
  const allDialogs = useSelector(selectDialogsData);
  const [dialogsState, setDialogsState] = React.useState<IDialog[]>([]);
  const [currentDialogId, setCurrentDialogId] = React.useState<string>('');

  console.log('dialogs render - ', ++count);
  
  // Selectors
  const isLoading = useSelector(selectDialogsStatusIsLoading);
  const isLoaded = useSelector(selectDialogsStatusIsLoaded);
  const isError = useSelector(selectDialogsStatusIsError);
  const user = useSelector(selectUserStateData);

  const handleFetchAllDialogs = (): void => {
    if (user) {
      dispatch(fetchDialogs(user?._id));
    }
  }

  const handleSearchDialogs = (): void => {
    const searchedDialogs = allDialogs!.filter(dialog => {
      const partner = getPartner(user!, dialog.author, dialog.partner);
      if (partner.fullName.toUpperCase().indexOf(search.toUpperCase()) >= 0){
        return dialog;
      }
    });
    setDialogsState(searchedDialogs!);
  }

  const handleSelectDialog = React.useCallback((dialogId: string, partner: IUser): void => {
    if (dialogId !== currentDialogId) {
      dispatch(fetchMessagesData(dialogId));
      dispatch(setPartner(partner));
      setCurrentDialogId(dialogId);
    }
  }, [dispatch, currentDialogId]);


  // Initial set dialogs
  React.useEffect(() => {
    if (allDialogs && isLoaded) {
      console.log('SET INITIALS DIALOGS');
      setDialogsState(allDialogs);
    }
  }, [allDialogs]);


  // Check search string change
  React.useEffect(() => {
    if (user && isLoaded) {
      console.log('SEARCH DIALOGS');
      if (search.length) {
        handleSearchDialogs();
      } else {
        setDialogsState(allDialogs || []);
      }
    }
  }, [search]);

  // Fetch all dialogs
  React.useEffect(() => {
    console.log('FETCH DIALOGS');
    handleFetchAllDialogs();

    // socket.on(SocketActions.DIALOG_CREATED, (obj: any) => {
    //   console.log(obj);
    //   dispatch(fetchDialogs(user?._id));
    // });
  }, []);

  return (
    <div className="dialogs">
      {isError && <DialogsError fetchDialogs={handleFetchAllDialogs}/>}
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