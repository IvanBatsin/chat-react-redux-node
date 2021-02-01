import React from 'react';
import './register.scss';
import { WhiteBlock } from '../../components';
import { RegisterMessage } from './components/RegisterMessage';
import { RegisterForm } from './components/RegisterForm';
import { useSelector } from 'react-redux';
import { selectUserStateData } from '../../store/ducks/user/selector';

export const Register: React.FC = (): React.ReactElement => {
  const user = useSelector(selectUserStateData);

  return (
    <section className="auth">
      <div className="auth_content">
        <div className="auth_top">
          <h2>Регистрация</h2>
          <p>{!user ? 'Зарегистрируйте новый аккаунт' : 'Подтвердите свой аккаунт'}</p>
        </div>
        <WhiteBlock>
          {(user && !user.confirmed) ? <RegisterMessage/> : <RegisterForm/> }
        </WhiteBlock>
      </div>
    </section>
  )
}