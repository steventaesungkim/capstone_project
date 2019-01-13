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
        .then(data =>{
            console.log(`LOGIN-STATUS:`,data.isLoggedIn)
            if(data.isLoggedIn === false){
                this.props.history.push('/');
            }else{
                this.setState({
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
        
        Axios
        .post(`/api/user/login`, this.state)
        .then((response) => {
            console.log(response)
             
            if ((response.data === "Invalid Username") || (response.data === "Invalid Password")) {
                alert('Incorrect Username or Password. Please re-enter correct Username or Password');
                document.getElementById('resetUsername').value="";
                document.getElementById('resetPassword').value="";
            } else {
                this.props.history.push('/timer'); 
            }
        })
    }
}

export default Login;