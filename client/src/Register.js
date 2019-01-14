import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import Axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            name: '',
            username: '',
            password: '',
            avatar: '',
            avatarData: [],
            avatarSelection: 'Select',
            avatarId: ''
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data =>{
            console.log(`LOGIN-STATUS:`,data.isLoggedIn)
            if(data.isLoggedIn === true){
                this.setState({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                })
                this.props.history.push('/timer');
            }
            // else{
            //     fetch('/api/user')
            //     .then(r => r.json())
            //     .then(data =>{
            //         this.setState({
            //             theUser: data
            //         })
            //     })
            // }
        })
        .then(
            fetch('/api/avatar')
            .then(r => r.json())
            .then(data =>{
                // console.log(data)
                this.setState({
                    avatarData: data
                })
            })
        )
    }


    render() {
        return (
            <div>
                <h2>Register</h2>
                <RegisterForm 
                    inputName = {this.state.name}
                    newName = {this._name}
                    inputUserName = {this.state.username}
                    newUserName = {this._userName}
                    inputPassword = {this.state.password}
                    newPassword = {this._password}
                    inputAvatar = {this.state.avatar}
                    submit = {this._onSubmit}

                    name = 'Avatar'
                    avatarData = {this.state.avatarData}
                    avatarSelection = {this.state.avatarSelection}
                    avatarId = {this.state.avatarId}
                    handleAvatar = {this._handleAvatar}
                />
            </div>
        )
    }

    _name = (input) => {
        const letters = /[a-z,A-Z]/; 

        // if (input !== '') {
        //     if (input.match(letters)) {
        //         this.setState ({
        //             name: input
        //         })
        //     }
        // } else {
        //     document.getElementById('resetRegisterName').value="";
        //     alert('Please input alphabet characters only');
        // }

        if (input.match(letters)) {
            this.setState ({
                name: input
            })
        } else {
            document.getElementById('resetRegisterName').value="";
            alert('Please input alphabet characters only');
        }

        // this.setState ({
        //     name: input
        // })
    }

    _userName = (input) => {
        const letters = /[0-9,a-z,A-Z]/; 
        // console.log(input)
        // console.log(this.state.theUser)
        


        if (input.match(letters)) {
            this.setState ({
                username: input
            }) 
        } else {
            alert('Please input alphanumeric characters only');
            document.getElementById('resetRegisterUsername').value="";
        }

        // this.setState ({
        //     username: input
        // })
    }

    _password = (input) => {
        this.setState ({
            password: input
        });
    }

    // _avatar = (input) => {
    //     this.setState ({
    //         avatar: input
    //     });
    // }
    
    _onSubmit = (event) => {
        event.preventDefault();
        // console.log('Registering..')
        console.log(this.state)
        Axios
        .post('/api/user/register', this.state)
        .then((response) =>{
            // console.log(response.data)


            if (response.data === "Username exist") {
                alert('Username already exist. Please choose another username');
                document.getElementById('resetRegisterName').value="";
                document.getElementById('resetRegisterUsername').value="";
                document.getElementById('resetRegisterPassword').value="";
                document.getElementById('resetRegisterAvatar').value="";
            }else{
                this.props.history.push('/timer');
            }
        })
    };

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





}

export default Register;


