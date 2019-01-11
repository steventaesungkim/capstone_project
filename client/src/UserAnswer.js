import React, { Component } from 'react';
import AnswerForm from './AnswerFrom';
import Axios from 'axios';

class UserAnswer extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInput: '',
            correct: Boolean
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
                
                click = {this.props.click}
            />

        )
    }

    

    _refreshPage = ()  => {
        window.location.reload();
    }
    

    _submit = (input) => {
     
        if(this.props.questionAnswer === input){
            Axios
            .post(`/api/result/100/${this.props.questionId}`, {correct: true})
            .then(response => {
                console.log(response)
                // {this._refreshPage()}
                document.getElementById('answerInput').value="";
            })
        } else {
            Axios
            .post(`/api/result/100/${this.props.questionId}`, {correct: false})
            .then(response => {
                console.log(response)
                // {this._refreshPage()}
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