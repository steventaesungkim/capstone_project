import React from 'react';
import { Link } from 'react-router-dom';
// import AvatarDropdown from './AvatarDropdown';


const RegisterForm = (props) => {
    return (
        <form 
            className='form' 
            method='POST'
            action='/api/user/register/'
            onSubmit = {(event) => {
                props.submit(event)
            }}
        >
            <label>Name:
            <input 
                required
                className='input field'
                type='text'
                // placeholder='name'
                name='name'
                onChange = {(e) =>{
                    props.newName(e.target.value);
                }}
                value = {props.inputName}
                id = "resetRegisterName"
            /></label>

            <label>UserName:
            <input 
                required
                className='input field'
                type='text'
                // placeholder='UserName'
                onChange = {(e) => {
                    // console.log(e.target.value);
                    props.newUserName(e.target.value);
                }}
                value = {props.inputUserName}
                id = "resetRegisterUsername"
            /></label>

            <label>Password:
            <input
                required
                className='input field'
                type='text'
                // placeholder='Password'
                onChange = {(e) => {
                    props.newPassword(e.target.value);
                }}
                value = {props.inputPassword}
                id = 'resetRegisterPassword'
            /></label>

            {/* <AvatarDropdown
                    name = 'Avatar'
                    avatarData = {props.avatarData}
                    avatarSelection = {props.avatarSelection}
                    avatarId ={props.avatarId}
                    handleAvatar = {props.handleAvatar}
                /> */}
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

            <input 
                className='input-submit'
                type='submit'
                value='Register'
            />

            <Link to = '/'>
                <input 
                    className='btn btn-ghost' 
                    type='submit' 
                    value='Login'
                    />
            </Link>    
            <Link to = '/#'>
                <input 
                    className='btn btn-ghost' 
                    type='submit' 
                    value='Sign in as guest'
                    />
            </Link>        
        </form>
    )
}

export default RegisterForm;