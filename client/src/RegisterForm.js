import React from 'react';
import { Link } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown';


const RegisterForm = (props) => {
    return (
        <form 
            className='register-form' 
            method='POST'
            action='/api/user/register/'
            onSubmit = {(event) => {
                props.submit(event)
            }}
        >
            <label>Name:
            <input 
                required
                className='input'
                type='text'
                // placeholder='name'
                name='name'
                onChange = {(e) =>{
                    props.newName(e.target.value);
                }}
                value = {props.inputName}
            /></label>
            <br />
            <label>UserName:
            <input 
                required
                className='input'
                type='text'
                // placeholder='UserName'
                onChange = {(e) => {
                    // console.log(e.target.value);
                    props.newUserName(e.target.value);
                }}
                value = {props.inputUserName}
            /></label>
            <br />
            <label>Password:
            <input
                required
                className='input'
                type='text'
                // placeholder='Password'
                onChange = {(e) => {
                    props.newPassword(e.target.value);
                }}
                value = {props.inputPassword}
            /></label>
            <br />
            <AvatarDropdown
                    name = 'Avatar'
                    avatarData = {props.avatarData}
                    avatarSelection = {props.avatarSelection}
                    avatarId ={props.avatarId}
                    handleAvatar = {props.handleAvatar}
                />
            {/* <label>Avatar:
            <input 
                required
                className='input'
                type='text'
                // placeholder='Select an Avatar'
                onChange = {(e) => {
                    props.newAvatar(e.target.value);
                }}
                value = {props.inputAvatar}
                id = 'resetRegisterAvatar'
            /></label> */}
            <br />
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
                    >Log In
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

export default RegisterForm;