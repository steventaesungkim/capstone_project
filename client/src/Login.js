import React, { Component } from 'react';
import LogInForm from './LogInForm';
import Axios from 'axios';


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
    //     .then(loginUser => {
    //         console.log(loginUser)
    //     })
    //     .then(users =>{
    //         // console.log(users)
    //         users.filter(larry => {
    //             console.log(larry);
    //             if ((this.state) === 3) {
    //             console.log('Matched!');
    //             } else {
    //                 console.log('Naga');
    //             }
    //         })
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

    _onSubmit = (event) =>{
        event.preventDefault();
        console.table(this.state)
        
        Axios
        .post(`/api/user/login/`, this.state)
        .then(response =>{
            console.log(response);
        })
    }

    // _onSubmit = (event) => {
    //     console.log(this.state.username)
    //     // console.log(event)
    //     event.preventDefault();
    //     console.log('Logging In..')
    //     // console.log(this.state.username)
    //     fetch(`/api/user/login/`,
    //         {
    //         method: 'POST',
    //         headers: {'Content-Type':'application/json'},
    //         body: {
    //             inputUserName: this.state.username,
    //             inputPassword: this.state.password
    //             }
    //         }) 
    //         // .then(r => {
    //         //     // console.log(r)
    //         //     return r.json();
    //         // })
    //         // .then(theUser => {
    //         // console.log(theUser)
    //             // if (theUser.passwordDoesMatch(theUser.pwhash)) {
    //             // console.log('Matched!');
    //             // } else {
    //             //     console.log('NOPE');
    //             // }
    //         // })
    // }



}

export default Login;