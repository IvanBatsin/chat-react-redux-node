import React from 'react';
import {Route} from 'react-router-dom';
import { Auth, Register } from '../../modules/index';

export const AuthPage = () => {
  return (
    <>
      <Route exact path="/auth" component={Auth}/>
      <Route path="/auth/register" exact component={Register}/>
    </>
  )
}