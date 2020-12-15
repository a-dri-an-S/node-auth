import React, { useState, useEffect } from 'react';
import './login.css'

import axios from 'axios';
import { Link } from 'react-router-dom';

import logo from '../../resources/moon.png';

const Login = ({ setToken }) => {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const submitLogin = async (e) => {

        e.preventDefault();
        let dbUrl = '/login/';

        let status = await axios.post(dbUrl, { email: emailInput, password: passwordInput });
        setToken(status.data);
        setLoginStatus(status.data.message);

    }

    return ( 
        <div className="main__login">
            <div className="login__welcome-message">
                <h3>Welcome</h3>
                <img src={ logo } alt="moon" width="30%"/>
            </div>
            <form className="login__form">
                <input 
                    className="login__input email" 
                    type="text" 
                    placeholder="Email"
                    value={ emailInput }
                    onChange={ e => setEmailInput(e.target.value) }
                    required
                    />
                <input 
                    className="login__input password" 
                    type="password" 
                    placeholder="Password"
                    value={ passwordInput }
                    onChange={ e => setPasswordInput(e.target.value) }
                    required
                    />
                <input 
                    className="login__btn" 
                    type="submit" 
                    value="Login"
                    onClick={ e => submitLogin(e) }
                    />
            </form>
            <Link to='/register'>Register Now!</Link>
            <h5>{ loginStatus }</h5>
        </div>
    );
}

export default Login;