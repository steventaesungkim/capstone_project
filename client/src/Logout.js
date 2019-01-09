import React, { Component } from 'react';


const Logout = (props) =>{
    // console.log(props.inSession)

    return(
        <div>
            <header className = "navBar" >
                <button>myAccount</button>
                <button 
                    onClick={(event) =>{
                        props.handleLogout(event)
                    }}
                
                >Logout</button>
            </header>
        </div>
    )
}

export default Logout;