import React from 'react';
import './signUp.scss';
import { WhiteBlock } from '../../components';
import { SignUpForm } from './components/SignUpForm';

export const SignUp: React.FC = ()=> {
  return (
    <section className="auth">
      <div className="auth_content">
        <div className="auth_top">
          <h2>Регистрация</h2>
          <p>Зарегистрируйте новый аккаунт</p>
        </div>
        <WhiteBlock>
          <SignUpForm/>
        </WhiteBlock>
      </div>
    </section>
  )
}