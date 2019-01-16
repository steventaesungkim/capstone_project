import React, { Component } from 'react';
import UpdateUser from './UpdateUser';
import UpdatePassword from './UpdatePassword';
// import UpdateAvatar from './UpdateAvatar';
import Axios from 'axios';



class Settings extends Component {
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
            // console.log(data.isLoggedIn)
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
            <section className='section-settings'>
                <div className='title'>
                    <h2>Settings</h2>
                </div>
                <div className='title'>
                    <h4>Change user info:</h4>
                </div>
                    <UpdateUser 
                        inputName = {this._updateName}
                        newName = {this.state.name}
                        inputUsername = {this._updateUsername}
                        newUsername = {this.state.username}
                        submit = {this._onSubmit}
                    />
                <div className='title'>  
                    <h4>Update password:</h4>
                </div>
                    <UpdatePassword 
                        theUser = {this.props.location.state.thisUser}
                        inputPassword = {this._updatePassword}
                        newPassword = {this.state.password}
                        passwordSubmit = {this._pwSubmit}
                />
                <div>
                    <div className='title'>
                        <h3>Delete account</h3>
                    </div>
                    <p>Please rethink your next action.</p>
                    <input
                        className='input-dummy'
                        type='submit'
                        value="Delete"
                    />
                </div>
            </section>
        )
    }
    
    _updateName = (input) => {
        // const letters = /^[a-z A-Z \s]$/; 

        // if (input.search(letters) === letters.length) {
        //     this.setState ({
        //         name: input
        //     })
        // } else {
        //     alert('Please input alphabet characters only');
        //     // document.getElementById('updateName').value="";
        // }
        this.setState({
            name: input
        })
    }

    _updateUsername = (input) => {
        // const letters = /[0-9,a-z,A-Z]*/;

        // if (letters.test(input)) {
        //     this.setState ({
        //         username: input
        //     }) 
        // } else {
        //     alert('Please input alphanumeric characters only');
        //     // document.getElementById('updatedUserName').value="";
        // }
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