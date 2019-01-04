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
                    inputPassWord = {this.state.password}
                    newPassword = {this.state._password}
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
        fetch()
    }



}

export default Login;