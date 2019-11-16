import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-rainbow-components';
import { logout } from '../../actions/auth';
import './Header.css';

const Header = (props) => {
    const handleLogout = () => {
        props.logout();
        props.history.push('/');
    }

    const authLinks = (
        <Button variant="outline-brand" label="Logout" onClick={handleLogout} />
    );

    const guestLinks = (
        <Link to='/login' style={{ textDecoration: 'none' }}>
            <Button variant="outline-brand" label="Sign In" />
        </Link>
    )

    let links = guestLinks;

    if(props.auth.isAuthenticated) {
        links = authLinks;
    }

    return (
        <div className="global-header">
            <div className="global-header__left">
                <h1>
                    Parsley
                </h1>
            </div>
            <div className="global-header__right">
                <div className="global-header__button-group">
                    <span className="global-header__sign-in">
                        {links}
                    </span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default withRouter(connect(mapStateToProps, { logout })(Header));