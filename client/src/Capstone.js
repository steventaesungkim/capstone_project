import React, { Component } from 'react'; 
import Login from './Login';


class Capstone extends Component {
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
                <h1>What do you want to be tested on?</h1>
                <Login 
                    inputUserName = {this.state.username}
                    updateUserName = {this._inputUserName}
                    inputPassWord = {this.state.password}
                    updatePassword = {this.state._inputPassword}
                    submit = {this._onSubmit}
                />
            </div>
        );
    }


    _inputUserName = (input) => {
        this.setState ({
            username: input
        }); 
    }
    _inputPassword = (input) => {
        this.setState ({
            password: input
        });
    }
    _onSubmit = (event) => {
        event.preventDefault();
        console.log('Button clicked')
        // What happens after submitting??
    }

}


export default Capstone;