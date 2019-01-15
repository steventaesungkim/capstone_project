import React, { Component } from 'react';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
import UpdateAvatar from './UpdateAvatar';
import Axios from 'axios';



class Settings extends Component {
    constructor(props) {
        console.log(props)
        super(props); 
        this.state = {
            name: '',
            username: '',
            avatar: '',
            pwhash: ''
        }
    }
    render () {
        // console.log(this.props.location.state.thisUser)
        
        // console.log(theUser.id)
        return (
            <div>
                <h2>Settings</h2>
                <h4>Change user info</h4>
                <UpdateUser 
                    inputName = {this._updateName}
                    newName = {this.state.name}
                    inputUsername = {this._updateUsername}
                    newUsername = {this.state.username}
                    submit = {this._onSubmit}
                />
                <h4>Update password</h4>
                <UpdatePassword 
                    theUser = {this.props.location.state.thisUser}
                    inputPassword = {this._updatePassword}
                    newPassword = {this.state.pwhash}
                    passwordSubmit = {this._pwSubmit}
                />
                <h4>Change avatar</h4>
                <UpdateAvatar 
                    inputAvatar = {this._updateAvatar}
                    newAvatar = {this.state.avatar}
                    submit = {this._onSubmit}
                />
                <h3>Delete account</h3>
                <p>Please rethink your next action.</p>
                <button>Delete this account</button>
            </div>
        )
    }
    
    _updateName = (input) => {
        this.setState ({
            name: input
        }); 
    }
    _updateUsername = (input) => {
        this.setState ({
            username: input
        });
        
    }
    _updatePassword = (input) => {
        console.log(input)
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
        
            // alert('Information Updated')

        })
    }
    _pwSubmit = (event) => {
        // console.log(event)
        event.preventDefault()
        const theUser = (this.props.location.state.thisUser)
        const userId = theUser.id
        const userPw = theUser.pwhash
        
        Axios
        .post(`/api/user/pwd/${userId}`, this.state.pwhash)
        .then((response) => {
            console.log(response)
            // if (response.message === 'done') {
            //     this.props.history.push('/timer');
            // }
            
            // alert('Password Updated')
        })
    }

    // _delete = (event) => {
    //     const theUser = (this.props.location.state.thisUser)
    //     const userId = theUser.id
    //     Axios 
    //     .post(`/api/user/${userId}`, this.state)
    //     .then((response) => {

    //     })
    // }
}

export default Settings;