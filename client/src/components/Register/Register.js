import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import  { setAlert } from '../../actions/alert';
import  { register } from '../../actions/auth';
import './Register.css';

const Register = (props) => {
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [emailError, setEmailError] = React.useState('');
    const [firstNameError, setFirstNameError] = React.useState('');
    const [lastNameError, setLastNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    const handleRegisterButtonClick = () => {
        let isValid = true;

        if(!email) {
            setEmailError('An email is required')
            isValid = false;
        }

        if(!firstName) {
            setFirstNameError('A first name is required')
            isValid = false;
        }

        if(!lastName) {
            setLastNameError('A last name is required')
            isValid = false;
        }

        if(!password) {
            setPasswordError('A password is required')
            isValid = false;
        }

        if(!confirmPassword || confirmPassword !== password) {
            console.error(confirmPassword); console.error(password)
            setConfirmPasswordError('Oops! Looks like your passwords don\'t match')
            isValid = false;
        }

        if(isValid) {
            props.register({
                name: firstName + ' ' + lastName,
                email,
                password,
            });
        }
    }

    const handleEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const handleFirstNameChanged = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChanged = (e) => {
        setLastName(e.target.value);
    }

    const handlePasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChanged = (e) => {
        setConfirmPassword(e.target.value);
    }

     //Redirect if logged in
     if(props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }


    return (
        <div className="register">
            <div className="register__form">
                <Input
                    label="First Name"
                    placeholder="Enter your first name"
                    required
                    onChange={handleFirstNameChanged}
                    error={firstNameError}
                />
                <Input
                    label="Last Name"
                    placeholder="Enter your last name"
                    required
                    className="register__form-margin-input"
                    onChange={handleLastNameChanged}
                    error={lastNameError}
                />
                <Input
                    label="Email Address"
                    placeholder="Enter your email address"
                    required
                    type="email"
                    className="register__form-margin-input"
                    onChange={handleEmailChanged}
                    error={emailError}
                />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    required
                    className="register__form-margin-input"
                    onChange={handlePasswordChanged}
                    error={passwordError}
                />
                <Input
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    required
                    className="register__form-margin-input"
                    onChange={handleConfirmPasswordChanged}
                    error={confirmPasswordError}
                />
                <Button 
                    onClick={handleRegisterButtonClick}
                    label="Register" 
                    variant="brand" 
                    className="register__form-register-button"/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, { setAlert, register })(Register);