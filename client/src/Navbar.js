import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';


const Navbar = (props) => {
    // console.log(props)
    // const thisUser = (props.user)
    // const logout = (props.handleLogout)
    // const inSession = (props.inSession)
    // console.log(thisUser)
    return(
        <header className='navbar'>
            <Link to = '/myaccount' className='links'>MyAccount</Link> 
            <br />

            {/* <Link to = {{
                pathname: '/',
                state: {
                    thisUser,
                    logout,
                    inSession
                }
            }}
                className='links'
                onClick={(event) =>{logout(event)}}
                
            >Logout</Link>  */}
             <Logout 
                 logout = {props.handleLogout}
                 thisUser = {props.userInfo}
                 inSession = {props.inSession}
            />
        </header>
    );
}

export default Navbar;