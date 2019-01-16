import React from 'react';

const UpdateUser = (props) => {
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

            <input 
                className='input-submit'
                type='submit'
                value='Change username'
            />
        </form>
    )
}

export default UpdateUser;