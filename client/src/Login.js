import React, { Component } from 'react';
import LogInForm from './LogInForm';

class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: ''
        }
    }
    render() {
        return (
            <div>
                <h2>Login</h2> 
                <LogInForm 
                    inputUserName = {this.state.username}
                    updateUserName = {this._userName}
                    inputPassWord = {this.state.password}
                    updatePassword = {this.state._password}
                    submit = {this._onSubmit}
                />
            </div>
        )
    }
    _name = (input) => {
        this.setState ({
            name: input
        });
    }

    _userName = (input) => {
        this.setState ({
            username: input
        });
    }
    _onSubmit = (event) => {
        event.preventDefault();
        console.log('Logging In')
        // What happens after submitting??
    }



}

export default Login;