import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Routes from './Routes';
import logo from './logo.svg';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
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
            <div className="app">
              <div className="app__wrapper">
                <Header />
                <div className="app__content-wrapper">
                  <NavigationBar />
                  <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                  </Switch>
                  <div className="app__content">
                    <Routes />
                  </div>
                </div>
              </div>
            </div>
      </Router>
    </Provider>
   
  );
}

export default App;
