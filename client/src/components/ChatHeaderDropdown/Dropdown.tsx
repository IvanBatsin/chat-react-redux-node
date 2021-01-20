import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserToInitial } from '../../store/ducks/user/actionCreators';
import { useHistory } from 'react-router-dom';
import { setMessagesToInitial } from '../../store/ducks/messages/actionCreators';
import { setDialogsToInitial } from '../../store/ducks/dialogs/actionCreators';

export const Dropdown: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useHistory();

  const handleExit = (): void => {
    router.push('/auth/singin');
    localStorage.removeItem('token');
    dispatch(setMessagesToInitial());
    dispatch(setDialogsToInitial());
    dispatch(setUserToInitial());
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