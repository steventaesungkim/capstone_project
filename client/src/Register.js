import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
// import axios from 'axios';


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
            // .then(Nu => {
            //     if (Nu.data.status !== 'okay') {
            //         alert("Almost in, try again.")
            //     } else {
            //         this.props.history.push('/');
            //         console.log(`Your're REGISTERED!`)
            //     }
            //     console.log(r.data);
            // })
            // .catch(err => {
            //     console.log(err);
            // });
    };





}

export default Register;


