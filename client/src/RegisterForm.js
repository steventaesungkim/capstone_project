import React from 'react';
import {
    BrowserRouter as Router, 
    Link
}   from 'react-router-dom';

const RegisterForm = (props) => {
    return (
        <form className='register-form' onSubmit = {(event) => {props.submit(event)}}>
            <label>
                <input 
                    className='input'
                    type='text'
                    placeholder='name'
                    onChange = {(e) =>{
                        props.updateName(e.target.value);
                    }}
                    value = {props.inputName}
                />
            </label>
            <label>
                <input 
                    className='input'
                    type='text'
                    placeholder='UserName'
                    onChange = {(e) => {
                        // console.log(e.target.value);
                        props.updateUserName(e.target.value);
                    }}
                    value = {props.inputUserName}
                />
            </label>
            <label>
                <input 
                    className='input'
                    type='text'
                    placeholder='Password'
                    onChange = {(e) => {
                        props.updatePassword(e.target.value);
                    }}
                    value = {props.inputPassword}
                />
            </label>
            <label>
                <input 
                    className='input'
                    type='text'
                    placeholder='Select an Avatar'
                    onChange = {(e) => {
                        props.updateAvatar(e.target.value);
                    }}
                    value = {props.inputAvatar}
                />
            </label>
            <input 
                className='input-submit'
                type='submit'
                value='Register'
            />
            <br />
            <Link to = '/'>
                <button 
                    className='btn' 
                    type='submit' 
                    value='submit'
                    
                    >Log In</button>
            </Link>        
            <button 
                className='btn' 
                type='submit' 
                value='submit'
                
                >Sign in as Guest</button>
        </form>
    )
}

export default RegisterForm;