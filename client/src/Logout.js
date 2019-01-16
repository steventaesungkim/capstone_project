import React from 'react';


const Logout = (props) => {

    return (
        <a href='/' className='links' onClick={(event) =>{props.logout(event)}}>Logout</a>
    )
}

export default Logout;