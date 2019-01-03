import React from 'react';

const Login = (props) => {
    // console.log(props)
    return (
        <form className='login-form' onSubmit = {(event) => {props.submit(event)}}>

            <label>
                <input 
                    className='input'
                    type='text'
                    placeholder='UserName'
                    onChange = {(e) => {
                        console.log(e.target.value);
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
            <input 
                className='input-submit'
                type='submit'
                value='Login'
            />
            <br />
            <button 
                className='btn' 
                type='submit' 
                value='submit'
                
                >Register</button>

            <button 
                className='btn' 
                type='submit' 
                value='submit'
                
                >Sign in as Guest</button>
        </form>
    )
}

export default Login;