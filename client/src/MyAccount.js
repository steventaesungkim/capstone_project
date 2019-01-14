import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccount extends Component {
    constructor(props) {
        super(props); 
        this.state = {
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
        const thisUser = theUser.username

        console.log(thisUser)

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
                <h3>{`${thisUser}'s Results `}</h3>
                   
            </div>
        )
    }


    

}


export default MyAccount;