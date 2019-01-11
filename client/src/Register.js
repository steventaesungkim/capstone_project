import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Axios from 'axios';


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
                    inputPassword = {this.state.password}
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
        // console.log('Registering..')

        Axios
        .post('/api/user/register', this.state)
        .then((response) =>{
            console.log(response)

            // if (response.data.name === ""){
            //     alert('Please enter in your name');
            //     if (response.data.pwhash === ""){
            //         alert('Please enter in your password');
            //         if (response.data.username === ""){
            //             alert('Please enter in your username');
            //             if (response.data.avatar === ""){
            //                 alert('Please select an avatart');
            //             }
            //         }
            //     }
            // }else{
            //     this.props.history.push("/register");
            // }
            if ((response.data.name === '') || (response.data.pwhash === '') || (response.data.username === '') ||
            (response.data.avatar === '')){
                alert('Please enter all input fields');
                document.getElementById('resetRegisterName').value="";
                document.getElementById('resetRegisterUsername').value="";
                document.getElementById('resetRegisterPassword').value="";
                document.getElementById('resetRegisterAvatar').value="";
                
                if (response.data === "Username exist") {
                    // console.log(response.data.name)
                    alert('Username already exist. Please choose another username');
                    document.getElementById('resetRegisterName').value="";
                    document.getElementById('resetRegisterUsername').value="";
                    document.getElementById('resetRegisterPassword').value="";
                    document.getElementById('resetRegisterAvatar').value="";
                }
            }else{
                this.props.history.push('/timer');
            }
        })
    };





}

export default Register;


