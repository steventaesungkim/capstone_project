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


class Home extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>What do you want to be tested on?</h1>
                    <Route path =  '/' exact component = {Login} /> 
                    <Route path = '/register' component = {Register} />
                    <Route path = '/timer' component = {Timer} />
                    <Route path = '/question/:categoryId/:levelSelection' component = {DisplayQuiz} />
                    <Route path = '/myaccount' component = {MyAccount} />
                </div>
            </Router>
        );
    }
    
}


export default Home;