import React, { Component } from 'react';
import DeckQandA from './DeckQandA';
import Axios from 'axios';



class DeckEdit extends Component {
    constructor(props) {
        // console.log(props)
        super(props); 
        this.state = {
            theUser: [],
            isLogged: Boolean,
            questionId: '',
            categoryId: '',
            subject: '',
            question: '',
            answer: ''
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data =>{
            console.log(data.isLoggedIn)
            if(data.isLoggedIn === false){
                this.props.history.push('/');
            } else {
                const flashCard = this.props.location.state.q[0];
                
                
                this.setState({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn,
                    questionId: flashCard.id,
                    categoryId: flashCard.id_category,
                    subject: flashCard.level,
                    question: flashCard.question,
                    answer: flashCard.answer
                })
                    

            }
        })    
    }

    render () {
        return (
            <section className='section-deck'>
                <div className='title'>
                    <h2>Flash Cards</h2>
                </div>
                <p>Delete an existing flash card</p><br />
                <p>User:  {this.state.theUser.username} |  Card#: {this.state.questionId}</p>

                <form className='form' method='POST' action='/api/user/userId'
                    onSubmit = {(event) => {this._onSubmit(event)}}
                >
                    <label>Subject:
                        <input 
                            name='subject'
                            className='input'
                            type='text'
                            value = {this.state.subject}
                            disabled
                        />
                    </label>
                    
                    <label>Question:
                        <input 
                            name='question'
                            className='input'
                            type='text'
                            value = {this.state.question}
                            disabled
                        />
                    </label>
                    
                    <label>Answer:
                        <input 
                            name='answer'
                            className='input'
                            type='text'
                            value = {this.state.answer}
                            disabled
                        />
                    </label>
                    
                    <input 
                        className='input-submit'
                        type='submit'
                        value='DELETE Flash Card'
                    />
                </form>

            </section>
        )
    }
    


    _onSubmit = (event) => {
        event.preventDefault();

        Axios
            .delete(`/api/question/${this.state.questionId}`)
            .then((response) => {
                console.log(response.data);
                this.props.history.push(`/myaccount`);
            })
    }
}

export default DeckEdit;