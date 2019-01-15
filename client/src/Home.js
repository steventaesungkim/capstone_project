import React, { Component } from 'react'; 
import {
    BrowserRouter as Router, 
    Route, 
}   from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Timer from './Timer';
import DisplayQuiz from './DisplayQuiz';
import MyAccount from './MyAccount';
import Settings from './Settings';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
import UpdateAvatar from './UpdateAvatar';



class Home extends Component {
    render() {
        return (
            <Router>
                <div className='main'>
                    <h1>Clock Signal</h1>
                    <Route path =  '/' exact component = {Login} /> 
                    <Route path = '/register' component = {Register} />
                    <Route path = '/timer' component = {Timer} />
                    <Route path = '/question/:categoryId/:levelSelection/:resultset_id' component = {DisplayQuiz} />

                    <Route path = '/myaccount' component = {MyAccount} />
                    <Route path = '/settings' component = {Settings} />
                    <Route path = '/updateUser' component = {UpdateUser} />
                    <Route path = '/updatePassword' component = {UpdatePassword} />
                    <Route path = '/updateAvatar' component = {UpdateAvatar} />
                    
                </div>
            </Router>
        );
    }
    
}


export default Home;