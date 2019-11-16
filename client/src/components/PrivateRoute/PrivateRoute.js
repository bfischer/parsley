import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} 
        render={props => 
            !auth.isAuthenticated && !auth.loading ? (
            <Redirect to='/login' />
            ) : (
            <Component {...props} />
            )} 
    />
)

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PrivateRoute);