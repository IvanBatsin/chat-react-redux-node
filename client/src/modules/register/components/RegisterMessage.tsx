import React from 'react';

export const RegisterMessage: React.FC = (): React.ReactElement => {
  return (
    <div className="auth_message">
      <img alt="Caution" src="https://cdn2.iconfinder.com/data/icons/pictograms-vol-1/400/exclamation-256.png"></img>
      <p>Мы отправили письмо на вашу почту. Подтвердите свой аккаунт</p>
    </div>
  )
}