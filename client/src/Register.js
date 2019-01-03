import React, { Component } from 'react';
import RegisterForm from './RegisterForm';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            avatar: ''
        }
    }
    render() {
        return (
            <div>
                <h2>Register</h2>
                <RegisterForm 
                    inputName = {this.state.name}
                    updateName = {this._name}
                    inputUserName = {this.state.username}
                    updateUserName = {this._userName}
                    inputPassWord = {this.state.password}
                    updatePassword = {this._password}
                    inputAvatar = {this.state.avatar}
                    updateAvatar = {this._avatar}
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
    _password = (input) => {
        this.setState ({
            password: input
        });
    }
    _avatar = (input) => {
        this.setState ({
            avatar: input
        });
    }
    _onSubmit = (event) => {
        event.preventDefault();
        console.log('Registered')
        // What happens after submitting??
    }





}

export default Register;


