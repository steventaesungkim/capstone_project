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
            <div>
                <h2>Flash Cards</h2>
                <h4>Edit an existing flash card</h4>
                <span>User:  {this.state.theUser.username} |  Card#: {this.state.questionId}</span>
                <DeckQandA 
                    inputSubject = {this._updateSubject}
                    newSubject = {this.state.subject}
                    inputQuestion = {this._updateQuestion}
                    newQuestion = {this.state.question}
                    inputAnswer = {this._updateAnswer}
                    newAnswer = {this.state.answer}
                    submit = {this._onSubmit}
                    btnValue = "Update"
                />

            </div>
        )
    }
    
    _updateSubject = (input) => {
        this.setState({subject: input})
    }

    _updateQuestion = (input) => {
        this.setState({question: input})
    }

    _updateAnswer = (input) => {
        this.setState({answer: input})
    }


    _onSubmit = (event) => {
        event.preventDefault();

        Axios
            .post(`/api/question/${this.state.questionId}`, {
                level: this.state.subject,
                question: this.state.question,
                answer: this.state.answer,
            })
            .then((response) => {
                //console.log(response.data);
                this.props.history.push(`/myaccount`);
            })
    }
}

export default DeckEdit;