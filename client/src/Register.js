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
                    newName = {this._name}
                    inputUserName = {this.state.username}
                    newUserName = {this._userName}
                    inputPassWord = {this.state.password}
                    newPassword = {this._password}
                    inputAvatar = {this.state.avatar}
                    newAvatar = {this._avatar}
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
        fetch('/api/user/register',{
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                username: this.state.username, 
                password: this.state.password,
                avatar: this.state.avatar
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(r => {
                return r.json();
            })
    };





}

export default Register;


