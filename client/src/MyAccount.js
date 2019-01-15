import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccount extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            userHistory: []
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data => {
            //console.log(data.user)
            if (data.isLoggedIn === false) {
                this.props.history.push('/');
            } else {
                fetch(`/api/resultset/history/${data.user.id}`)
                .then(r => r.json())
                .then(results => {
                    this.setState({
                        theUser: data.user,
                        isLoggedIn: data.isLoggedIn,
                        userHistory: results
                    })
                })
            }
        })
    }
    

    render() {
        //console.log("this.state.theUser!!!!!!!!!!!!!")
        //console.log(this.state.theUser)
        // console.log(this.state.isLoggedIn)
        const theUser = (this.state.theUser)
        const thisUser = theUser.username

        //console.log("thisUser: ", thisUser);

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