import React from 'react';
import { Route } from 'react-router-dom';
import { SignIn, SignUp } from '../../modules/index';

let count = 0;

export const AuthPage = () => {
  return (
    <>
      <Route path="/auth/signin" exact component={SignIn}/>
      <Route path="/auth/signup" exact component={SignUp}/>
    </> 
  )
}