import React, { Component } from 'react';
import AnswerForm from './AnswerForm';
import Axios from 'axios';
import { timingSafeEqual } from 'crypto';

class UserAnswer extends Component {
    constructor(props) {
        // console.log(props)
        super(props);
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            userInput: '',
            correct: Boolean,
            numberCorrect: 0,
            numberIncorrect: 0
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
        console.log(this.state.numberCorrect.length)
        console.log(this.state.numberIncorrect.length)
        return (
            <AnswerForm 
                userInput = {this.state.userInput}
                questionResult = {this.state.correct}

                userAnswer = {this._handleInputAnswer}
                answerResult = {this._isCorrect}
                handleSubmit = {this._submit}

                questionId = {this.props.questionId}
                questionAnswer = {this.props.questionAnswer}

                // resultset_id = {this.props.resultset_id}
                
                // handleResultSet = {this._handleResultSet}
                handleNextQuestion = {this.props.handleNextQuestion}
            />

        )
    }

    // _handleResultSet = (input) =>{
    //     console.log(input)
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
    // }

    _submit = (input) => {
        // console.log(this.state.numberCorrect)
        // console.log(this.state.numberIncorrect)
        // console.log(this.props.questionId)


        if (this.props.questionAnswer === input) {

            if (this.state.numberCorrect === 2) {

                const totalNumberQuestions = (this.state.numberCorrect + this.state.numberIncorrect);
                const score = (((this.state.numberCorrect) / (totalNumberQuestions)) * 100).toFixed(0); 
                
                alert(`Your score is: ${score}`);

                Axios
                .post(`/api/resultset/${this.props.resultsetId}`, score)
                .then(response => {

                    this.setState ({
                        numberCorrect: []
                    })
                
                this.props.history.push('/timer');
                })

            } else {
                alert('Correct')

                Axios
                .post('/api/result/create', {
                    correct: true,
                    id_question: this.props.questionId,
                    id_resultset: this.props.resultsetId
                })

                .then(
                    this.setState ({
                        numberCorrect: this.state.numberCorrect + 1,
                        userInput: ''
                    })
                )
            }
        } else {

            if (this.state.numberIncorrect === 2) {

                const totalNumberQuestions = (this.state.numberCorrect + this.state.numberIncorrect);
                const score = (((this.state.numberCorrect) / (totalNumberQuestions)) * 100).toFixed(0);

                alert(`Your score is: ${score}`);

                Axios
                .post(`/api/resultset/${this.props.resultsetId}`, score)
                .then(response => {

                    this.setState ({
                        numberIncorrect: []
                    })

                    this.props.history.push('/timer');
                })

            } else {
                alert('Incorrect');

                Axios
                .post('/api/result/create', {
                    correct: false,
                    id_question: this.props.questionId,
                    id_resultset: this.props.resultsetId
                })

                .then(
                    this.setState ({
                        numberIncorrect: this.state.numberIncorrect + 1,
                        userInput: ''
                    })
                )
            }
        }


            // alert('Correct');
            // return Axios
            // .post('/api/result/create', {
            //     correct: true,
            //     id_question: this.props.questionId,
            //     id_resultset: this.props.resultsetId
            // })    
            // .then(response => {
            //     // console.log(response)
            //     if (this.state.numberCorrect.length === 3) {
            //         const totalNumberQuestions = (this.state.numberCorrect.length + this.state.numberIncorrect.length);
            //         const score = (((this.state.numberCorrect.length) / (totalNumberQuestions.length)) * 100).toFixed(0); 
                    
            //         alert(`Your score is: ${score}`)

            //         Axios
            //         .post(`/api/resultset/${this.props.resultsetId}`, score)
            //         .then(response => {
            //             this.setState ({
            //                 numberCorrect: []
            //             })

            //             this.props.history.push('/timer');
            //         })
            //     } else {
            //         this.setState ({
            //             numberCorrect: {... this.props.questionId},
            //             userInput: ''
            //         })
            //     }


                
            // })
        // } else {
        //     alert('Incorrect');
        //     return Axios
        //     .post('/api/result/create', {
        //         correct: false,
        //         id_question: this.props.questionId,
        //         id_resultset: this.props.resultsetId
        //     })
        //     .then(response => {
        //         // console.log(response)
        //         if(this.state.numberIncorrect.length === 3) {
        //             console.log("YOU GOT IT CORRECT")
        //             const totalNumberQuestions = (this.state.numberIncorrect.lenth + this.state.numberIncorrect.length);
        //             const score = (((this.state.numberIncorrect.length) / (totalNumberQuestions.length)) * 100).toFixed(0);

        //             alert(`Your score is: ${score}`)

        //             Axios
        //             .post(`/api/resultset/${this.props.resultsetId}`, score)
        //             .then(response => {
        //                 this.setState ({
        //                     numberIncorrect: []
        //                 })

        //                 this.props.history.push('/timer');
        //             })
        //         }else{
        //             this.setState ({
        //                 numberIncorrect: {... this.props.questionId},
        //                 userInput: ''
        //             })

        //         }
        //     })

        // }
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