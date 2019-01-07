import React from 'react';
import { Link } from 'react-router-dom';


const LogInForm = (props) => {
    // console.log(props);
    return (
        <form className='login-form' 
            method="POST"
            action='/api/user/login/'
            onSubmit = {(event) => 
            // console.log(event)
            {props.submit(event)}
            
            }>
            <label>Username:</label>
                <input 
                    className='input'
                    type='text'
                    // placeholder='UserName'
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
                    // placeholder='Password'
                    onChange = {(e) => {
                        props.newPassword(e.target.value);
                    }}
                    value = {props.inputPassword}
                />
            <br />
            <input 
                className='input-submit'
                type='submit'
                // value={(props.inputUserName, props.inputPassword)}
                // value={props.inputPassword}
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