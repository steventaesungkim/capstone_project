import React, { Component } from 'react';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
import UpdateAvatar from './UpdateAvatar';
import Axios from 'axios';



class DeckAdd extends Component {
    constructor(props) {
        // console.log(props)
        super(props); 
        this.state = {
            theUser: [],
            isLogged: Boolean,
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
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data =>{
            console.log(data.isLoggedIn)
            if(data.isLoggedIn === false){
                this.props.history.push('/');
            }else{
                this.setState({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                }, () => {
                    fetch('/api/avatar')
                    .then(r => r.json())
                    .then(data =>{
                        // console.log(data)
                        this.setState({
                            avatarData: data
                        })
                    })
                })
            }
        })    
    }
    render () {
        // console.log(this.props.location.state.thisUser)
        
        // console.log(theUser.id)
        return (
            <div>
                <h2>Flash Cards</h2>
                <h4>Create a new flash card deck</h4>
                <UpdateUser 
                    inputName = {this._updateName}
                    newName = {this.state.name}
                    inputUsername = {this._updateUsername}
                    newUsername = {this.state.username}
                    submit = {this._onSubmit}
                />

            </div>
        )
    }
    
    _updateName = (input) => {

    
        this.setState({
            name: input
        })
    }

    _updateUsername = (input) => {

        this.setState({
            username: input
        })
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
                this.setState ({
                    name: '',
                    username: ''
                })
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
                this.setState ({
                    avatar: 'Select a Avatar'
                })
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
                this.setState ({
                    password: ''
                })
            }
        })
    }


}

export default DeckAdd;