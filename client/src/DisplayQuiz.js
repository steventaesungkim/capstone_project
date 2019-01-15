import React, { Component } from 'react';
import Clock from './Clock';
import Question from './Question';


class DisplayQuiz extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            theUser: [],
            isLogged: Boolean,
            question: [],
            questionId: '',
            displayQuestion: '',
            questionAnswer: ''
            // resultSetId: ''
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
                }, () => {
                    const categoryId = this.props.match.params.categoryId;
                    const levelSelection = this.props.match.params.levelSelection;
                
                    fetch(`/api/question/${categoryId}/${levelSelection}`)
                    .then(r => r.json())
                    .then(data => {
                        const listOfObjectQuestion = data 

                        let shuffleQuestion = (array) => { 
                            for (let i = array.length - 1; i > 0; i--) {
                                let j = Math.floor(Math.random() * (i + 1));
                                let temp = array[i]; 
                                array[i] = array[j];
                                array[j] = temp;
                            }
                            return array;
                        }

                        const listOfQuestions = [];
                        const listOfAnswers = [];
                        const listOfQuestionId = [];

                        shuffleQuestion(listOfObjectQuestion).forEach(data => {
                            listOfQuestions.push(data.question);
                            listOfAnswers.push(data.answer);
                            listOfQuestionId.push(data.id);
                        })

                        const theQuestionId = listOfQuestionId[0];
                        const theQuestion = listOfQuestions[0];
                        const userAnswer = listOfAnswers[0];

                        this.setState ({
                            question: data,
                            displayQuestion: theQuestion,
                            questionId: theQuestionId,
                            questionAnswer: userAnswer
                        })
                    })
                })
            }
        })    
    }

    render() {   
        return(
            <div>
                <Clock />

                <Question 
                    all = {this.state.question}
                    displayQuestion = {this.state.displayQuestion}
                    questionId = {this.state.questionId}
                    questionAnswer = {this.state.questionAnswer}

                    // resultSetId = {this.state.resultSetId}
                    // handleResultSet = {this._handleResultSet}

                    timeStamp = {this.props.timeStamp}

                    handleNextQuestion = {this._handleNextQuestion}
                />
            </div>
        )
    }

    // _handleResultSet = () =>{

    // }

    _handleNextQuestion = () => {
        const categoryId = this.props.match.params.categoryId;
        const levelSelection = this.props.match.params.levelSelection;
    
        fetch(`/api/question/${categoryId}/${levelSelection}`)
        .then(r => r.json())
        .then(data => {
            const listOfObjectQuestion = data 

            let shuffleQuestion = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    let temp = array[i]; 
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }

            const listOfQuestions = [];
            const listOfAnswers = [];
            const listOfQuestionId = [];

            shuffleQuestion(listOfObjectQuestion).forEach(data => {
                listOfQuestions.push(data.question);
                listOfAnswers.push(data.answer);
                listOfQuestionId.push(data.id);
            })

            const theQuestionId = listOfQuestionId[0];
            const theQuestion = listOfQuestions[0];
            const userAnswer = listOfAnswers[0];

            this.setState ({
                question: data,
                displayQuestion: theQuestion,
                questionId: theQuestionId,
                questionAnswer: userAnswer
            })
        })
    }
}

export default DisplayQuiz; 