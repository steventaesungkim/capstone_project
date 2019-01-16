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
            decks: [],
            flashID: 1,
            questions: []
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
                        // console.log(subs);
                        let CategoryID = subs[0].id_category; 
                        subs = subs.map(x => x.level);
                        fetch(`/api/question/category/${CategoryID}`)
                        .then(r => r.json())
                        .then(q => {
                            console.log("QUESTIONS");
                            console.log(q);
                            this.setState({
                                theUser: data.user,
                                isLoggedIn: data.isLoggedIn,
                                userHistory: results,
                                subjects: subs,
                                flashID: CategoryID,
                                questions: q
                            })
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
            <div>
                <h2>MyAccount</h2>
                <Link to = {{
                    pathname: '/settings', 
                    state: {
                        thisUser
                        }}} className='links'>
                   Settings
                </Link>

                <h3>{`${thisUser}'s Flash Card Decks`}</h3>
                <List 
                    items={this.state.subjects}
                    categoryID={this.state.flashID}
                    questionList={this.state.questions}
                />
                <Link to = {{pathname: '/deckadd', state: {thisUser: theUser}}} className='links'>
                   Add a Flash Card Deck
                </Link>

                <h3>{`${thisUser}'s Results `}</h3>
                <ResultHistoryTable results={this.state.userHistory}/>
                   
            </div>
        )
    }
}



export default MyAccount;