import React from 'react';


const Logout = (props) =>{
    // console.log(props.inSession)

    return(
        <a href='/' onClick={(event) =>{props.logout(event)}}>Logout</a>
    )
}

export default Logout;