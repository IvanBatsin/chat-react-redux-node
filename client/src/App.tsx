import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { Home, AuthPage} from './pages';
import { Info } from './components/InfoBlock/Info';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserStateData, selectUserLoadingState, selectIsUser } from './store/ducks/user/selector';
import { getUserMe } from './store/ducks/user/actionCreators';
import { LoadingState } from './interfaces/loadingState';
import { useHistory } from 'react-router-dom';
import { MainLoader } from './components/Loader/MainLoader';

export const App: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUserStateData);
  const userLoadingState = useSelector(selectUserLoadingState);
  const isUser = useSelector(selectIsUser);
  const isReady = userLoadingState !== LoadingState.NEVER && userLoadingState !== LoadingState.LOADING;

  React.useEffect(() => {
    dispatch(getUserMe());
  }, []);

  React.useEffect(() => {
    if (isReady && isUser && user?.confirmed) {
      history.push('/home');
    } else if (isReady && isUser && !user?.confirmed) {
      history.push('/info');
    } else if (!isUser && isReady) {
      history.push('/auth/signin');
    } 
  }, [isReady, isUser]);

  if (!isReady) return <MainLoader/>

  return (
    <div className="wrapper">
      <Switch>
        <Route exact path='/home' component={Home}/>
        <Route exact path={['/auth/signin', '/auth/signup']} component={AuthPage}/>
        <Route exact path="/info">
          <Info title={'Ваш аккаунт не активирован!'} message={'Мы отправили письмо на вашу почту. Пройдите по ссылке указанной в письме, тем самым вы сможете подтвердить свой аккаунт'}/>
        </Route>
      </Switch>
    </div>
  )
}