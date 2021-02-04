import React from 'react';
import { useDispatch } from 'react-redux';
import { setDialogsData } from '../../store/ducks/dialogs/actionCreators';
import { setMessagesToInitial } from '../../store/ducks/messages/actionCreators';
import { setUserExit } from '../../store/ducks/user/actionCreators';

export const Dropdown: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const handleExit = (): void => {
    window.localStorage.removeItem('token');
    dispatch(setDialogsData(undefined));
    dispatch(setMessagesToInitial());
    dispatch(setUserExit());
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