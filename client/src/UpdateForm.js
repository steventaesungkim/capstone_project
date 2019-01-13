import React from 'react';

const UpdateForm = (props) => {
    console.log(props)
    return (
        <form
            className='update-form'
            method='POST'
            action='/api/user/userId'
            onSubmit = {(event) => {
                props.submit(event)
            }}
        >
            <label>Name:</label>
            <input 
                name='name'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputName(event.target.value)
                }}
                value = {props.newName}
            />
            <br />
            <label>Username:</label>
            <input 
                name='username'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputUsername(event.target.value)
                }}
                value = {props.newUsername}
            />
            <br />
            <label>Password:</label>
            <input 
                name='password'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputPassword(event.target.value)
                }}
                value = {props.newPassword}
            />
            <br />
            <label>Avatar:</label>
            <input 
                name='avatar'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputAvatar(event.target.value)
                }}
                value = {props.newAvatar}
            />
            <br />
            <input 
                className='input-submit'
                type='submit'
                value='Update'
            />
        </form>
    )
}

export default UpdateForm;