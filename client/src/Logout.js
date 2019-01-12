import React, { Component } from 'react';
// import { Link } from 'react-router-dom';



const Logout = (props) =>{
    // console.log(props.inSession)

    return(
        <div>
            <button onClick={(event) =>{props.logout(event)}}>
                Logout
            </button>
        </div>
    )
}

export default Logout;