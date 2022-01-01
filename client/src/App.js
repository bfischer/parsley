import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Application } from 'react-rainbow-components';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';
import Alert from './components/Alert/Alert';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Routes from './Routes';
import logo from './logo.svg';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

//Redux
import { Provider } from 'react-redux';
import store from './store';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <div className="app">
            <div className="app__wrapper">
              <Header />
              <div className="app__content-wrapper">
                <NavigationBar />
                <Alert />
                <Switch>
                  <Route exact path='/' component={Landing} />
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                </Switch>
                <Routes />
              </div>
            </div>
        </div>
      </Router>
    </Provider>
   
  );
}

export default App;
