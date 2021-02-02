import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Home, AuthPage} from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStateData, selectUserLoadingState, selectIsUser, selectIsUserConfirmed } from './store/ducks/user/selector';
import { getUserMe } from './store/ducks/user/actionCreators';
import { LoadingState } from './interfaces/loadingState';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserStateData);
  const userLoadingState = useSelector(selectUserLoadingState);
  const isUser = useSelector(selectIsUser);
  const isConfirmed = useSelector(selectIsUserConfirmed);
  const isReady = userLoadingState !== LoadingState.ERROR && userLoadingState !== LoadingState.LOADING;

  React.useEffect(() => {
    dispatch(getUserMe());
  }, []);

  React.useEffect(() => {

  }, [isReady]);

  return (
    <Router>
      <div className="wrapper">
        <Switch>
          <Route exact path='/home' component={Home}/>
          <Route exact path={['/auth/signin', '/auth/signup']} component={AuthPage}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  )
}