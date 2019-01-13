import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccount extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            // username: '',
            // password:'',
            // avatar: '',
            theUser: [],
            isLoggedIn: Boolean
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data => {
            // console.log(data.user)
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
        // console.log(this.state.isLoggedIn)

        const theUser = (this.state.theUser)

        // const inputValue = {
        //     username: '',
        //     password: '',
        //     avatar: ''
        // }

        console.log(theUser)

        return (
            <div>
                <h2>MyAccount</h2>
                <Link to = {{
                    pathname: '/settings',
                    state: {
                        thisUser: theUser
                        // inputValue
                    }    
                }} 
                    className='links'
                >Settings</Link>

                   
            </div>
        )
    }


    

}


export default MyAccount;