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
            <label>Name:
            <input 
                name='name'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputName(event.target.value)
                }}
                value = {props.newName}
            /></label>
            <br />
            <label>Username:
            <input 
                name='username'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputUsername(event.target.value)
                }}
                value = {props.newUsername}
            /></label>
            <br />
            <label>Password:
            <input 
                name='password'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputPassword(event.target.value)
                }}
                value = {props.newPassword}
            /></label>
            <br />
            <label>Avatar:
            <input 
                name='avatar'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputAvatar(event.target.value)
                }}
                value = {props.newAvatar}
            /></label>
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