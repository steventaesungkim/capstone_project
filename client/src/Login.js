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

    // componentDidMount(){
    //     fetch('/api/user')
    //     .then(r => {
    //         return r.json();
    //     })
    //     .then(users =>{
    //         console.log(users)
    //     })
    // }
    render() {
        return (
            <div>
                <h2>Login</h2> 
                <LogInForm 
                    inputUserName = {this.state.username}
                    newUserName = {this._userName}
                    inputPassword = {this.state.password}
                    newPassword = {this._password}
                    submit = {this._onSubmit}
                />
            </div>
        )
    }
    _userName = (input) => {
        this.setState ({
            username: input
        });
    }
    _password = (input) => {
        this.setState ({
            password: input
        });
    }
    _onSubmit = (event) => {
        event.preventDefault();
        console.log('Logging In..')
        fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(r => {
            console.log(r);
        })
    }



}

export default Login;