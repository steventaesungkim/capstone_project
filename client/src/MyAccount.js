import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from './List';
import ResultHistoryTable from './ResultHistoryTable';

class MyAccount extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            userHistory: [],
            subjects: [],
            decks: []

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
                    fetch(`/api/question/subjects/${data.user.id}`)
                    .then(r => r.json())
                    .then(subs => {


                    this.setState({
                        theUser: data.user,
                        isLoggedIn: data.isLoggedIn,
                        userHistory: results,
                        subjects: subs
                    })
                    })
                })
            }
        })
    }
    

    render() {
        const theUser = (this.state.theUser)
        const thisUser = theUser.username

        return (
            <section className='section-myaccount'>
                <div className='title'>
                    <h2>MyAccount</h2>
                </div>
                <Link to = {{
                    pathname: '/settings', 
                    state: {
                        thisUser
                    }
                }} 
                    className='sep-link'
                    >Settings
                </Link>

                <h3>{`${thisUser}'s Flash Card Decks`}</h3>
                <List items={this.state.subjects}/>
                <Link to = {{
                    pathname: '/deckadd', 
                    state: {
                        thisUser: theUser
                    }
                }} 
                    className='sep-link'
                    >Add a Flash Card Deck
                </Link>

                <h3>{`${thisUser}'s Results `}</h3>
                <ResultHistoryTable results={this.state.userHistory}/>
                   
            </section>
        )
    }
}

export default MyAccount;