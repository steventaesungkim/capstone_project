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
        // console.table(this.state)
        
        Axios
        .post(`/api/user/login/`, this.state)
        .then(response =>{
            // console.log(response);

            if(response.data.message === "No data returned from the query.") {
                console.log("error")
                alert('Incorrect Username and Password. Please re-enter correct Username and Password');
            }else{
                this.props.history.push("/timer");
            }
        })
    }
}

export default Login;