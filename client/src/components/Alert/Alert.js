import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
    if(!props.alerts || props.alerts.length === 0) return null;

    return null;
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alert,
    }
}

export default connect(mapStateToProps)(Alert);