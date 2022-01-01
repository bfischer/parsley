import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import './NavigationBar.css';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
    drawer: {
        backgroundColor: '#18202c',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
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
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      background: '#18202c',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
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
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
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
    listButton: {
        color: 'white',
        '&:hover': {
            background: "#273346",
          }
    },
    icon: {
        color: 'white',
    },
    listButtonSelected: {
        color: '#02adff'
    },
    divider: {
        backgroundColor: '#005882'
    }
  }));

const drawerWidth = 240;

const NavigationBar = (props) => {
    const classes = useStyles();
    const [selectedPage, setSelectedPage] = React.useState('/dashboard');
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleSelect = (page) => {
        setSelectedPage(page);
        props.history.push(page);
    }

    if(!props.auth.isAuthenticated) {
        return null;
    }

    return (
        <Drawer
            variant="permanent"
            open={open}
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
        >
            <div className={classes.toolbarIcon}>
                {
                    open ? 
                    <IconButton onClick={handleDrawerClose} className={classes.icon}>
                        <ChevronLeftIcon />
                    </IconButton>
                    : <IconButton onClick={handleDrawerOpen} className={classes.icon}>
                        <ChevronRightIcon />
                    </IconButton>
                }
            </div>
            <Divider classes={{root: classes.divider}}/>
            <List>
                <ListItem button  selected={selectedPage === '/dashboard'} onClick={() => handleSelect('/dashboard')} classes={{button: classes.listButton, selected: classes.listButtonSelected}}>
                    <ListItemIcon classes={{root: clsx(classes.listButton, selectedPage === '/dashboard' && classes.listButtonSelected)}}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button selected={selectedPage === '/restaurants' || selectedPage === '/restaurants-manage'} onClick={() => handleSelect('/restaurants')} classes={{button: classes.listButton , selected: classes.listButtonSelected}}>
                    <ListItemIcon classes={{root: clsx(classes.listButton, selectedPage === '/restaurants' && classes.listButtonSelected)}}>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Restaurants" />
                </ListItem>
                <ListItem button classes={{button: classes.listButton}} >
                    <ListItemIcon classes={{root: classes.listButton}}>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
            </List>
        </Drawer>
    )

    // return (
    //     <div className="navigation-bar">
    //         <VerticalNavigation
    //                 selectedItem={selectedPage}
    //                 onSelect={(handleSelect)}
    //             >
    //             <VerticalSection label="GETTING STARTED">
    //                 <VerticalItem name="/dashboard" label="Dashboard" />
    //                 <VerticalItem name="/restaurants" label="Restaurants" />
    //                 <VerticalItem name="/users" label="Users" />
    //             </VerticalSection>
    //             <VerticalSection label="FOLDERS">
    //                 <VerticalItem name="item-5" label="Created by Me" />
    //                 <VerticalItem name="item-6" label="Shared with Me" />
    //             </VerticalSection>
    //         </VerticalNavigation>
    //     </div>
    // )
}

const mapStateToProps =(state) => ({
    auth: state.auth,
})

export default withRouter(connect(mapStateToProps)(NavigationBar));