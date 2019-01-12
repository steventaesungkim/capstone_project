import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = (props) => {
    return(
        <header className='navbar'>
            <Link to = '/myaccount' className='links'>MyAccount</Link>
            <Logout 
                logout = {props.handleLogout}
            />
        </header>
    );
}

export default Navbar;