import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button, Input } from 'react-rainbow-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../actions/auth';
import './Login.css';

const Login = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const handleEmailChanged = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChanged = (e) => {
        setPassword(e.target.value);
    }

    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }

    const handleLogin = () => {
        let isValid = email && password;

        if(!email) {
            setEmailError('An email is required')
        }

        if(!password) {
            setPasswordError('A password is required')
        }

        if(isValid) {
            setIsLoading(true);
            props.login(email, password);
            setIsLoading(false);
        }
    }

    //Redirect if logged in
    if(props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="login">
            <div className="login__form">
                <Input
                    label="Email Address"
                    placeholder="Enter your email address"
                    icon={<FontAwesomeIcon icon={faEnvelope} color="#00c0ff" />}
                    required
                    onChange={handleEmailChanged}
                    error={emailError}
                />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    className="login__form-password"
                    icon={<FontAwesomeIcon icon={faLock} color="#00c0ff" />}
                    required
                    type="password"
                    onChange={handlePasswordChanged}
                    error={passwordError}
                />
                <Button label="Login" variant="brand" className="login__form-login-button" onClick={handleLogin} isLoading={isLoading} />
                <div className="login__form-register-link">
                    Not a member? <Link to='/register'>Register here!</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, { login })(Login);