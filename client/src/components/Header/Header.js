import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
// import { Button } from 'react-rainbow-components';
import { logout } from '../../actions/auth';
import './Header.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    appBar: {
        borderBottom: '3px solid #3f51b5',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        textDecoration: 'none !important',
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();


    const handleLogout = () => {
        props.logout();
        props.history.push('/');
    }

    const authLinks = (
        <Button color="primary" variant="outlined" className={classes.link} onClick={handleLogout}>
            Sign out
        </Button>
    );

    const guestLinks = (
        <React.Fragment>
            <nav>
            <RouterLink to='/register' style={{ textDecoration: 'none' }}>
                <Link variant="button" color="textPrimary" className={classes.link} underline="none">
                    Register
                </Link>
            </RouterLink>
            </nav>
            <RouterLink to='/login' style={{ textDecoration: 'none' }}>
                <Button href="#" color="primary" variant="outlined" className={classes.link}>
                    Sign In
                </Button>
            </RouterLink>
        </React.Fragment>
    )

    let links = guestLinks;

    if(props.auth.isAuthenticated) {
        links = authLinks;
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="white" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" color="inherit" noWrap className={classes.toolbarTitle}>
                        <RouterLink to='/' style={{ textDecoration: 'none', color: 'black' }}>Parsley</RouterLink>
                    </Typography>
                   {links}
                </Toolbar>
            </AppBar>
        </div>
      );

    // return (
    //     <div className="global-header">
    //         <div className="global-header__left">
    //             <h1>
    //                 Parsley
    //             </h1>
    //         </div>
    //         <div className="global-header__right">
    //             <div className="global-header__button-group">
    //                 <span className="global-header__sign-in">
    //                     {links}
    //                 </span>
    //             </div>
    //         </div>
    //     </div>
    // )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

export default withRouter(connect(mapStateToProps, { logout })(Header));