import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Home, AuthPage} from './pages';
import { useSelector } from 'react-redux';
import { selectUserStateData } from './store/ducks/user/selector';

export const App: React.FC = () => {
  const user = useSelector(selectUserStateData);
  // const userLoadingState = useSelector(selectUser)
  return (
    <Router>
      <div className="wrapper">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path={['/auth/signin', '/auth/signup']} component={AuthPage}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    </Router>
  )
}