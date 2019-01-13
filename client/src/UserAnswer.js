import React, { Component } from 'react';
import AnswerForm from './AnswerForm';
import Axios from 'axios';

class UserAnswer extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: '',
            correct: Boolean,
            resultset_id: '100'
        }
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

                resultset_id = {this.state.resultset_id}
                
                click = {this.props.click}
            />

        )
    }

    _submit = (input) => {
        console.log(input)
        console.log(this.state.resultset_id)
        console.log(this.props.questionId)
     
        if(this.props.questionAnswer === input){
            Axios
            .post('/api/result/create', (
                {
                    correct: true,
                    id_question: this.props.questionId,
                    id_resultset: this.state.resultset_id
                })
            )    
            .then(response => {
                console.log(response)
                document.getElementById('answerInput').value="";
            })
        } else {
            Axios
            .post('/api/result/create', (
                {
                    correct: false,
                    id_question: this.props.questionId,
                    id_resultset: this.state.resultset_id
                })
            )
            .then(response => {
                console.log(response)
                document.getElementById('answerInput').value="";
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