import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Slide from '@material-ui/core/Slide';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  
const useStyles1 = makeStyles(theme => ({
success: {
    backgroundColor: green[600],
},
error: {
    backgroundColor: theme.palette.error.dark,
},
info: {
    backgroundColor: theme.palette.primary.main,
},
warning: {
    backgroundColor: amber[700],
},
icon: {
    fontSize: 20,
},
iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
},
message: {
    display: 'flex',
    alignItems: 'center',
},
}));

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

const Alert = (props) => {
    const classes = useStyles1();
    const { className, message, onClose, ...other } = props;
    const variant = 'success';
    const Icon = variantIcon[variant];

    return (
        <Snackbar 
            open={props.alerts && props.alerts.length > 0} 
            autoHideDuration={6} 
            anchorOrigin={{ vertical:'top', horizontal: 'center' }}
            TransitionComponent={SlideTransition}
        >
            <SnackbarContent
              className={clsx(classes[variant], 'success')}
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className={classes.message}>
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                  {'Hello'}
                </span>
              }
              action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={()  => {}}>
                  <CloseIcon className={classes.icon} />
                </IconButton>,
              ]}
              {...other}
            />
        </Snackbar>
    );
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alert,
    }
}

export default connect(mapStateToProps)(Alert);