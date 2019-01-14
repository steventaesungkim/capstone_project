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
            password: '',
            avatarData: [],
            avatarSelection: 'Select',
            avatarId: ''
        }
    }

    componentDidMount() {
        fetch('/api/avatar')
            .then(r => r.json())
            .then(data =>{
                // console.log(data)
                this.setState({
                    avatarData: data
                })
            })
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
                    newPassword = {this.state.password}
                    passwordSubmit = {this._pwSubmit}
                />
                <h4>Change avatar</h4>
                <UpdateAvatar 
                    name = 'Avatar'
                    avatarData = {this.state.avatarData}
                    avatarSelection = {this.state.avatarSelection}
                    avatarId = {this.state.avatarId}
                    handleAvatar = {this._handleAvatar}

                    inputAvatar = {this._updateAvatar}
                    newAvatar = {this.state.avatar}
                    avatarSubmit = {this._avatarSubmit}
                />
                <h3>Delete account</h3>
                <p>Please rethink your next action.</p>
                <button>Delete this account</button>
            </div>
        )
    }
    
    _updateName = (input) => {
        const letters = /[a-z,A-Z]/; 

        if (input.match(letters)) {
            this.setState ({
                name: input
            })
        } else {
            document.getElementById('updateName').value="";
            alert('Please input alphabet characters only');
        }
    }

    _updateUsername = (input) => {
        const letters = /[0-9,a-z,A-Z]/;

        if (input.match(letters)) {
            this.setState ({
                username: input
            }) 
        } else {
            alert('Please input alphanumeric characters only');
            document.getElementById('updatedUserName').value="";
        }
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

    _handleAvatar = (event) =>{
        event.preventDefault()
        const selectedImg = event.target.value
        // console.log(this.state.avatarData)

        this.state.avatarData.forEach((compare) =>{
            if (selectedImg === compare.img){
                this.setState({
                    avatar: selectedImg,
                    avatarSelection: selectedImg,
                    avatarId: compare.id
                })
            }
        })
    }

    _onSubmit = (event) => {
        event.preventDefault();
        const theUser = (this.props.location.state.thisUser);
        const userId = theUser.id;

        Axios
        .post(`/api/user/${userId}`,this.state)
        .then((response) => {
            // console.log(response)
            // if ((response.data.updated === true) && ((response.data.name === 'Name Updated') || (response.data.username === 'Username Updated') ) ) {
            if ((response.data.name === 'Name Updated') || (response.data.username === 'Username Updated'))  {

                alert('User info updated')
                document.getElementById('updatedName').value="";
                document.getElementById('updatedUserName').value="";
            }
        })
    }

    _avatarSubmit = (event) => {
        event.preventDefault();
        const theUser = (this.props.location.state.thisUser);
        const userId = theUser.id;

        Axios
        .post(`/api/user/${userId}`,this.state)
        .then((response) => {
            // console.log(response)
            if (response.data.avatar === "Avatar Updated") {
                alert('Avatar updated')
                document.getElementById('updatedAvatar').value="Select a Avatar";
            }
        })
    }

    _pwSubmit = (event) => {
        event.preventDefault()
        const theUser = (this.props.location.state.thisUser);
        const userId = theUser.id;
        const newPassword = this.state.password;

        Axios
        .post(`/api/user/pwd/${userId}`, {password: newPassword})
        .then((response) => {
            if (response.data === true) {
                alert('Password updated')
                document.getElementById('updatedPassword').value="";
            }
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