import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Dashboard from './components/Dashboard/Dashboard';
import Restaurants from './components/Restaurants/Restaurants';
import RestaurantManage from './components/RestaurantManage/RestaurantManage';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
 
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'lightgrey',
    },
    container: {
      paddingBottom: theme.spacing(4),
      backgroundColor: 'lightgray',
      height: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

const Routes = (props) => {
    const classes = useStyles();

    if(!props.auth.isAuthenticated) {
        return null;
    }

    return (
        <main className={classes.content}>
            <Container maxWidth="xl" className={classes.container}>
                <Grid>
                    <Switch>
                        <PrivateRoute path='/dashboard' component={Dashboard} />
                        <PrivateRoute path='/restaurants' component={Restaurants} />
                        <PrivateRoute path='/restaurant-manage' component={RestaurantManage} />
                    </Switch>
                </Grid>
            </Container>
        </main>
    )

    // return (
    //     <div className="app__content">
    //         <Switch>
    //             <PrivateRoute path='/dashboard' component={Dashboard} />
    //             <PrivateRoute path='/restaurants' component={Restaurants} />
    //         </Switch>
    //     </div>
    // )
}

const mapStateToProps =(state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(Routes);