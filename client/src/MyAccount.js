import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccount extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password:'',
            // avatar: ''
        }
    }

    componentDidMount() {
        fetch('/api/user/userId')
        .then(r => r.json())
        .then(data => {
            console.log(data)

        })
    }

    render() {
        return (
            <div>
                <h2>MyAccount</h2>
                <Link to = '/settings' className='links'>Settings</Link>
            </div>
        )
    }

}

export default MyAccount;