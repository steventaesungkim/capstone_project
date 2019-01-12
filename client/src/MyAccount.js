import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyAccount extends Component {
    // constructor(props) {
    //     super(props); 
    //     this.state = {

    //     }
    // }

    render() {
        return (
            <div>
                <h2>MyAccount</h2>
                <Link to ='/results' className='links'>Results</Link>
                <br/>
                <Link to = '/settings' className='links'>Settings</Link>
            </div>
        )
    }

}

export default MyAccount;