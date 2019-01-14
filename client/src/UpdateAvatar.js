// import React from 'react';

// const UpdateAvatar = (props) => {
//     return (
//         <form
//             className='update-form'
//             method='POST'
//             action='/api/user/userId'
//             onSubmit = {(event) => {
//                 props.avatarSubmit(event)
//             }}
//         >
//             <label>Avatar:
//             <input 
//                 id='updateAvatar'
//                 name='avatar'
//                 className='input'
//                 type='text'
//                 onChange = {(event) => {
//                     props.inputAvatar(event.target.value)
//                 }}
//                 value = {props.newAvatar}
//             /></label>
//             <br />
//             <input 
//                 className='input-submit'
//                 type='submit'
//                 value='Change avatar'
//             />
//         </form>
//     )
// }

// export default UpdateAvatar;

import React from 'react';
import AvatarDropdown from './AvatarDropdown';

const UpdateAvatar = (props) => {
    return (
        <form
            className='update-form'
            method='POST'
            action='/api/user/userId'
            onSubmit = {(event) => {
                props.avatarSubmit(event)
            }}
        >
            
            <AvatarDropdown
                name='Avatar'
                id='updatedAvatar'
                avatarData = {props.avatarData}
                avatarSelection = {props.avatarSelection}
                avatarId ={props.avatarId}
                handleAvatar = {props.handleAvatar}
            />
            {/* <label>Avatar:
            <input 
                id='updateAvatar'
                name='avatar'
                className='input'
                type='text'
                onChange = {(event) => {
                    props.inputAvatar(event.target.value)
                }}
                value = {props.newAvatar}
            /></label> */}
            <br />
            <input 
                className='input-submit'
                type='submit'
                value='Change avatar'
            />
        </form>
    )
}

export default UpdateAvatar;