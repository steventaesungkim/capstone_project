import React, { Component } from 'react';
import LogInForm from './LogInForm';
import Axios from 'axios';


class Login extends Component {
    constructor (props) {
        super (props); 
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data => { 
            if (data.isLoggedIn === false) {
                this.props.history.push('/');
            } else {
                this.setState ({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                })
                this.props.history.push('/timer');
            }
        })
    }

    render() {
        // console.log(this.state.isLoggedIn)
        return (
            <section className='section-login'>
                <div className='title'>
                    <h2>Login</h2> 
                </div>
                <LogInForm 
                    inputUserName = {this.state.username}
                    newUserName = {this._userName}
                    inputPassword = {this.state.password}
                    newPassword = {this._password}
                    submit = {this._onSubmit}
                />
            </section>
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
        
        Axios
        .post(`/api/user/login`, this.state)
        .then((response) => {
            if ((response.data === "Invalid Username") || (response.data === "Invalid Password")) {
                alert('Incorrect Username or Password. Please re-enter correct Username or Password');
                
                this.setState ({
                    username: '',
                    password: ''
                })
            } else {
                this.props.history.push('/timer'); 
            }
        })
    }
}

export default Login;