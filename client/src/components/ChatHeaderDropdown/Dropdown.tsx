import React from 'react';
import { useDispatch } from 'react-redux';
import { setPartner, setUser } from '../../store/ducks/user/actionCreators';
import { useHistory } from 'react-router-dom';
import { setDialogsData } from '../../store/ducks/dialogs/actionCreators';
import { setMessagesData } from '../../store/ducks/messages/actionCreators';

export const Dropdown: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useHistory();

  const handleExit = (): void => {
    router.push('/auth/singin');
    localStorage.removeItem('token');
    dispatch(setUser(undefined));
    dispatch(setPartner(undefined));
    dispatch(setDialogsData(undefined));
    dispatch(setMessagesData(undefined));
  }

  return (
    <div className="chat_header_dropdown">
      <ul>
        <li onClick={handleExit}>Выход</li>
        <li>Настройки</li>
      </ul>
    </div>
  )
}