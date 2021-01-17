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

interface IDialogsProps {
  search: string
}

export const Dialogs: React.FC<IDialogsProps> = ({search}: IDialogsProps): React.ReactElement => {
  const dispatch = useDispatch();
  const fetchedDialogs = useSelector(selectDialogsData);
  const [dialogsState, setDialogsState] = React.useState<IDialog[]>([]);
  
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

  React.useEffect(() => {
    handleFetchDialogs();
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

  const handleChooseDialog = (dialog: string, partner: IUser): void => {
    dispatch(fetchMessagesData(dialog));
    dispatch(setPartner(partner));
  }

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
          return <DialogItem chooseDialog={handleChooseDialog} key={item._id} dialog={item} currentUser={user!}/>
        })
      }
    </div>
  )
}