import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


import Dashboard from './components/Dashboard/Dashboard';
import Restaurants from './components/Restaurants/Restaurants';

const Routes = (props) => {
    return (
        <Switch>
           <PrivateRoute path='/dashboard' component={Dashboard} />
           <PrivateRoute path='/restaurants' component={Restaurants} />
        </Switch>
    )
}

export default Routes;