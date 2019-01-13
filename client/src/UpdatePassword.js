import React from 'react';

const UpdatePassword = (props) => {
    return (
        <form
            className='update-form'
            method='POST'
            action='/api/user/pwd/userId'
            onSubmit = {(event) => {
                props.submit(event)
            }}
        >
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
            <input 
                className='input-submit'
                type='submit'
                value='Update password'
            />
        </form>
    )
}

export default UpdatePassword;

// $2b$10$mR0mYHjUO//SoDD7dyIRxuOH/TYkwglgGTmPx9FbHpoptUgeP8MhS