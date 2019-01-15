import React, { Component } from 'react';
import AnswerForm from './AnswerForm';
import Axios from 'axios';

class UserAnswer extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            userInput: '',
            correct: Boolean
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data => {
            if (data.isLoggedIn === false) {
                this.props.history.push('/');
            } else {
                this.setState ({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                })
            }    
        })
    }

    

    render() {
        return (
            <AnswerForm 
                userInput = {this.state.userInput}
                questionResult = {this.state.correct}

                userAnswer = {this._handleInputAnswer}
                answerResult = {this._isCorrect}
                handleSubmit = {this._submit}

                questionId = {this.props.questionId}
                questionAnswer = {this.props.questionAnswer}

                resultset_id = {this.props.resultset_id}
                
                handleResultSet = {this._handleResultSet}
                handleNextQuestion = {this.props.handleNextQuestion}
            />

        )
    }

    _handleResultSet = (input) =>{
        console.log(input)
        // let session = [];
        // if (session.length === 0) {
        //     Axios
        //     .post('/api/resultset/create', {

        //     })
        //     .then(response => {
        //         console.log(response)
        //         session.push(input)
        //         console.log(session)
        //     })

        // } else {
        //     session.push(input)
        //     console.log(session)
        // }
    }

    _submit = (input) => {
        // console.log(input)
        console.log(this.state.resultset_id)
        // console.log(this.props.questionId)
     
        if(this.props.questionAnswer === input){
            alert('Correct');
            return Axios
            .post('/api/result/create', {
                correct: true,
                id_question: this.props.questionId,
                id_resultset: this.props.resultsetId
            })    
            .then(response => {
                // console.log(response)
                this.setState ({
                    userInput: ''
                })
            })
        } else {
            alert('Incorrect');
            return Axios
            .post('/api/result/create', {
                correct: false,
                id_question: this.props.questionId,
                id_resultset: this.props.match.params.resultset_id
            })
            .then(response => {
                // console.log(response)
                this.setState ({
                    userInput: ''
                })
            })

        }
    }

    _handleInputAnswer = (input) => {
        this.setState({
            userInput: input
        })
    }

    _isCorrect = (input) => {
        this.setState({
            correct: input
        })
    }



}    

    

export default UserAnswer;