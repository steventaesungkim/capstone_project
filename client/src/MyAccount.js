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
                        if (subs[0]) {
                            let CategoryID = subs[0].id_category; 
                            subs = subs.map(x => x.level);
                            fetch(`/api/question/category/${CategoryID}`)
                            .then(r => r.json())
                            .then(q => {
                                // console.log("QUESTIONS");
                                // console.log(q);
                                this.setState({
                                    theUser: data.user,
                                    isLoggedIn: data.isLoggedIn,
                                    userHistory: results,
                                    subjects: subs,
                                    flashID: CategoryID,
                                    questions: q
                                })
                            })
                        } else {
                            this.setState({
                                theUser: data.user,
                                isLoggedIn: data.isLoggedIn,
                                userHistory: results,
                                //subjects: subs,
                                //flashID: CategoryID,
                                //questions: q
                            })
                        }

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

                <List 
                    items={this.state.subjects}
                    categoryID={this.state.flashID}
                    questionList={this.state.questions}
                    btnClickEdit={this._handleEditBtn}
                    btnClickDelete={this._handleDeleteBtn}
                />
                <Link to = {{pathname: '/deckadd', state: {thisUser: theUser}}} className='sep-link'>
                   Add a Flash Card Deck

                </Link>

                <h3>{`${thisUser}'s Results `}</h3>
                <ResultHistoryTable results={this.state.userHistory}/>
                   
            </section>
        )
    }

    _handleEditBtn = (id, event) => {
        // console.log("id");
        // console.log(id);
        const myQues = this.state.questions.filter(x => x.id === id);
        // this.props.history.push(`/deckedit/${id}`)
        this.props.history.push({
            pathname: `/deckedit/${id}`,
            state: {q: myQues}
        })

    }

    _handleDeleteBtn = (id, event) => {
        // console.log("id");
        // console.log(id);
        const myQues = this.state.questions.filter(x => x.id === id);
        // this.props.history.push(`/deckedit/${id}`)
        this.props.history.push({
            pathname: `/deckdelete/${id}`,
            state: {q: myQues}
        })

    }
}



export default MyAccount;