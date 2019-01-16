import React, { Component } from 'react'; 
import {
    BrowserRouter as Router, 
    Route,
}   from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Axios from 'axios';
import Timer from './Timer';
import DisplayQuiz from './DisplayQuiz';
import MyAccount from './MyAccount';
import Settings from './Settings';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
import UpdateAvatar from './UpdateAvatar';
import DeckAdd from './DeckAdd';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            theUser: [],
            isLoggedIn: Boolean
        }
    }
    render() {
        const currentUser = (this.state.theUser)
        return (
            <Router>
                <div className='main'>
                    <Navbar 
                        user = {currentUser}
                        
                        inSession = {this.state.isLoggedIn}
                        handleLogout = {this._handleLogout}
                    />   
                    <Route path =  '/' exact component = {Login} /> 
                    <Route path = '/register' component = {Register} />
                    <Route path = '/timer' component = {Timer} />
                    <Route path = '/question/:categoryId/:levelSelection/:resultset_id' component = {DisplayQuiz} />

                    <Route path = '/myaccount' component = {MyAccount} />
                    <Route path = '/settings' component = {Settings} />
                    <Route path = '/updateUser' component = {UpdateUser} />
                    <Route path = '/updatePassword' component = {UpdatePassword} />
                    <Route path = '/updateAvatar' component = {UpdateAvatar} />
                    <Route path = '/deckadd' component = {DeckAdd} />
                    
                </div>
            </Router>
        );
    }

    _handleLogout = (event) => {
        this.setState ({
            inSession: false
        })  

        Axios
        .post('/api/user/logout')
        .then(response =>{
            if (response.data.message === "Successfully logged out") {
                this.props.history.push('/')
            }
        })
    }
    
}


export default Home;