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
    passwordDoesMatch = (thePassword) => {
        const didMatch = bcrypt.compareSync(thePassword, this.state.password);
        return didMatch;
    }

    _onSubmit = (event) => {
        // console.log(event)
        event.preventDefault();
        console.log('Logging In..')
        fetch(`/api/user/login`) 
            .then(r => {
                return r.json();
            })
            .then(theUser => {
            console.log(theUser)
                if (theUser.passwordDoesMatch(theUser.pwhash)) {
                console.log('Matched!');
                } else {
                    console.log('NOPE');
                }
            })
    }



}

export default Login;