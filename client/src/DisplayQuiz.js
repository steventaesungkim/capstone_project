import React, { Component } from 'react';
import Clock from './Clock';
import Question from './Question';


class DisplayQuiz extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            question: [],

            questionId: '',
            displayQuestion: '',
            questionAnswer: '',

            userInput: '',

            correct: ''
        }
    }

    componentDidMount(){
        const categoryId = this.props.match.params.categoryId;
        const levelSelection = this.props.match.params.levelSelection;
        
        fetch(`/api/question/${categoryId}/${levelSelection}`)
        .then(r => r.json())
        .then((data) =>{
            // console.log(data)
            const listOfObjectQuestion = data 

            let shuffleQuestion = (array) =>{
            
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i]; 
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }

            const listOfQuestions = [];
            const listOfAnswers = [];
            const listOfQuestionId = [];

            shuffleQuestion(listOfObjectQuestion).map(data =>{
                listOfQuestions.push(data.question);
                listOfAnswers.push(data.answer);
                listOfQuestionId.push(data.id);
            })

            const theQuestionId = listOfQuestionId[0];
            const theQuestion = listOfQuestions[0];
            const theAnswer = listOfAnswers[0];
                this.setState({
                    question: data,
                    displayQuestion: theQuestion,
                    questionId: theQuestionId,
                    questionAnswer: theAnswer
                })
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
                    userInput = {this.state.userInput}

                    userAnswer = {this._handleInputAnswer}

                    answerResult = {this._isCorrect}

                    questionResult = {this.state.correct}

                />
                
                
            </div>
        )
    }

    _handleInputAnswer = (input) =>{
        console.log(input)
        this.setState({
            userInput: input
        })
    }

    _isCorrect = (input) =>{
        // console.log(input)
        this.setState({
            correct: input
        })
        // const categoryId = this.props.match.params.categoryId;
        // const levelSelection = this.props.match.params.levelSelection;

        // this.props.history.push(`/question/${categoryId}/${levelSelection}`);
    }



}



export default DisplayQuiz; 