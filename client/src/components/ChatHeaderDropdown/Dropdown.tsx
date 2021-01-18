import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserToInitial } from '../../store/ducks/user/actionCreators';
import { useHistory } from 'react-router-dom';

export const Dropdown: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const router = useHistory();

  const handleExit = (): void => {
    router.push('/auth/singin');
    localStorage.removeItem('token');
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