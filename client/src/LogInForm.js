import React from 'react';
import { Link } from 'react-router-dom';


const LogInForm = (props) => {
    return (
        <form 
            className='login-form' 
            name='login-form'
            method="POST"
            action='/api/user/login/'
            onSubmit = {(event) => {
                props.submit(event)
            }}
        >
            <label>Username:
            <input 
                required
                name='username'
                className='input'
                type='text'
                // placeholder='UserName'
                onChange = {(e) => {
                    props.newUserName(e.target.value);
                }}
                value = {props.inputUserName}
                id="resetUsername"
            /></label>
            <br />
            <label>Password:
            <input 
                required
                name='password'
                className='input'
                type='text'
                // placeholder='Password'
                onChange = {(e) => {
                    props.newPassword(e.target.value);
                }}
                value = {props.inputPassword}
                id="resetPassword"
            /></label>
            <br />
            <input 
                className='input-submit'
                type='submit'
                value='Login'
            />
            <br />
            <Link to = '/register'>
            <button 
                className='btn' 
                type='submit' 
                value='submit'
                
                >Register
            </button>
            </Link>
            <Link to = '/#'>   
                <button 
                    className='btn' 
                    type='submit' 
                    value='submit'
                    
                    >Sign in as Guest
                </button>
            </Link> 
        </form>
    )
}

export default LogInForm;