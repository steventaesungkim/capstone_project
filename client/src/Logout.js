import React, { Component } from 'react';
import Axios from 'axios';


const Logout = (props) =>{
    // console.log(props.inSession)


    // if(props.inSession === false){
    //     // console.log("trying to logout")
    //     Axios
    //     .post('/api/user/logout')
    //     .then(this.props.history.push('/'))
    // }

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