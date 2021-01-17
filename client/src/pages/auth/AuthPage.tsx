import React from 'react';
import {Route} from 'react-router-dom';
import { Auth, Register } from '../../modules/index';

export const AuthPage = () => {
  return (
    <>
      <Route exact path="/auth/signin" component={Auth}/>
      <Route path="/auth/signup" exact component={Register}/>
    </>
  )
}