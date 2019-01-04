import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const LogInForm = (props) => {
    // console.log(props);
    return (
        <form className='login-form' onSubmit = {(event) => {props.submit(event)}}>
            <label>Username:</label>
                <input 
                    className='input'
                    type='text'
                    placeholder='UserName'
                    onChange = {(e) => {
                        // console.log(e.target.value);
                        props.newUserName(e.target.value);
                    }}
                    value = {props.inputUserName}
                />
            <br />
            <label>Password:</label>
                <input 
                    className='input'
                    type='text'
                    placeholder='Password'
                    onChange = {(e) => {
                        props.newPassword(e.target.value);
                    }}
                    value = {props.inputPassword}
                />
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