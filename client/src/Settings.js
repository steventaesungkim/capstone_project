import React, { Component } from 'react';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
import UpdateAvatar from './UpdateAvatar';
import Axios from 'axios';



class Settings extends Component {
    constructor(props) {
        // console.log(props)
        super(props); 
        this.state = {
            name: '',
            username: '',
            avatar: '',
            pwhash: ''
        }
    }
    render () {
        console.log(this.props.location.state.thisUser)
        
        // console.log(theUser.id)
        return (
            <div>
                <h2>Settings</h2>
                <p>Change user info</p>
                <UpdateUser 
                    inputName = {this._updateName}
                    newName = {this.state.name}
                    inputUsername = {this._updateUsername}
                    newUsername = {this.state.username}
                    submit = {this._onSubmit}
                />
                <p>Change password</p>
                <UpdatePassword 
                    inputPassword = {this._updatePassword}
                    inewPassword = {this.state.pwhash}
                    submit = {this._pwSubmit}
                />
                <p>Change avatar</p>
                <UpdateAvatar 
                    inputAvatar = {this._updateAvatar}
                    newAvatar = {this.state.avatar}
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
            pwhash: input
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
            
            // if (response)
            alert('Information Updated')

        })
    }
    _pwSubmit = (event) => {
        event.preventDefault();
        const theUser = (this.props.location.state.thisUser)
        const userId = theUser.id
        // const userPw = theUser.pwhash

        Axios
        .post(`/api/user/pwd/${userId}`, this.state.password)
        .then((response) => {
            alert('Password Updated')
            console.log(response)
        })
    }
}

export default Settings;