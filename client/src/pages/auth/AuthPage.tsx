import React from 'react';
import { Route } from 'react-router-dom';
import { SignIn, SignUp } from '../../modules/index';

export const AuthPage = () => {
  return (
    <>
      <Route path="/auth/signin" exact component={SignIn}/>
      <Route path="/auth/signup" exact component={SignUp}/>
    </> 
  )
}