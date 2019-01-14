import React from 'react';

const UpdatePassword = (props) => {
    // console.log(props.userId.id)
    const userId = props.theUser.id;
    // console.log(props.newPassword)

    return (
        <form
            className='update-form'
            method='POST'
            action={`/api/user/pwd/${userId}`}
            onSubmit = {(event) => {
                // console.log(event)
                props.passwordSubmit(props.newPassword)
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
