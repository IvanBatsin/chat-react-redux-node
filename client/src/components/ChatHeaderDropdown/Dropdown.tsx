import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/ducks/user/actionCreators';

export const Dropdown: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();

  const handleExit = (): void => {
    window.localStorage.removeItem('token');
    dispatch(setUser(undefined));
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