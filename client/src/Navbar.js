import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';


const Navbar = (props) => {
    // console.log(props.inSession)
    return(
        <header className='navbar'>
            <Link to = '/myaccount' className='links'>MyAccount</Link> 
            <br />
            <Logout 
                logout = {props.handleLogout}
                thisUser = {props.userInfo}
                inSession = {props.inSession}
            />
        </header>
    );
}

export default Navbar;