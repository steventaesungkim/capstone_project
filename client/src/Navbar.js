import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';


const Navbar = (props) => {
    // const thisUser = (props.user)
    // const logout = (props.handleLogout)
    // const inSession = (props.inSession)

    return (
        <header className='navbar'>
            <Link to = '/timer'
                className='links'
            >
                Timer
            </Link>

            <Link to = '/myaccount' 
                className='links'
            >
                MyAccount
            </Link> 
{/* 
            <Link to = {{
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