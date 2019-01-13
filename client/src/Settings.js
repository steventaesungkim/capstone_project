import React, { Component } from 'react';
import UpdateForm from './UpdateForm';
import Axios from 'axios';



class Settings extends Component {
    constructor(props) {
        // console.log(props)
        super(props); 
        this.state = {
            name: '',
            username: '',
            avatar: '',
            password: ''
        }
    }
    render () {
        console.log(this.props.location.state.thisUser)
        
        // console.log(theUser.id)
        return (
            <div>
                <h2>Settings</h2>
                {/* <p>Please update your information</p> */}
                <UpdateForm 
                    inputName = {this._updateName}
                    newName = {this.state.name}
                    inputUsername = {this._updateUsername}
                    newUsername = {this.state.username}
                    inputAvatar = {this._updateAvatar}
                    newAvatar = {this.state.avatar}

                    inputPassword = {this._updatePassword}
                    inewPassword = {this.state.password}

                    submit = {this._onSubmit}
                    />                    
            </div>
        )
    }
    
    _updateName = (input) => {
        this.setState ({
            name: input
        });
    }
    _updateUsername = (input) => {
        // console.log(input)
        this.setState ({
            username: input
        });
    }
    _updatePassword = (input) => {
        this.setState ({
            password: input
        });
    }
    _updateAvatar = (input) => {
        this.setState ({
            avatar: input
        });
    }
    _onSubmit = (event) => {
        event.preventDefault();
        const theUser = (this.props.location.state.thisUser)
        const userId = theUser.id
        Axios
        .post(`/api/user/${userId}`,this.state)
        .then((response) => {
            console.log(response)
            alert('Information Updated')
        })
    }
}

export default Settings;