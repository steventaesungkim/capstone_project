import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccount extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password:'',
            // avatar: '',
            theUser: [],
            isLoggedIn: Boolean
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data => {
            console.log(data)
            if(data.isLoggedIn === false){
                this.props.history.push('/');
            }else{
                this.setState({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                })
            }

        })
    }
    

    render() {
        console.log(this.state.theUser)
        console.log(this.state.isLoggedIn)
        return (
            <div>
                <h2>MyAccount</h2>
                <Link to = {{
                    pathname: '/settings',
                    state: {
                        theUser: [],
                        isLoggedIn: ''
                    }
                }} 
                    className='links'
                >Settings</Link>

                   
            </div>
        )
    }

    _updateUsername = (input) => {
        console.log(input)
        this.setState ({
            username: input
        });
    }

    // _linkToProperty = () => {
    //     const settingProps = {
    //         pathname: '/settings',
    //         state: (this.state.username)
    //     } 
    // }




}


export default MyAccount;