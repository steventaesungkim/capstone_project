import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';


const Navbar = (props) => {
    const thisUser = {}

    return(
        <header className='navbar'>
            <Link to = {{
                pathname: '/myaccount',
                state: {
                    userInfo: props.userInfo
                } 
            }}
                className='links'
            >MyAccount</Link> 
            <br />
            <Logout 
                logout = {props.handleLogout}
                userInfo = {props.userInfo}
                inSession = {props.inSession}
            />
        </header>
    );
}

export default Navbar;