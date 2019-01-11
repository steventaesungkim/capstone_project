import React, { Component } from 'react';
import Clock from './Clock';
import Question from './Question';
import AnswerInput from './AnswerInput';


class DisplayQuiz extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            question: [],
            answer: [],
            // randomNumber: parseInt(Math.random() * (this.state.question.length).toFixed(0)),
            randomNumber: '',
            questionId: '',
            displayQuestion: '',
            inputAnswer: ''
        }
    }

    componentDidMount(){
        const categoryId = this.props.match.params.categoryId;
        const levelSelection = this.props.match.params.levelSelection;
       
        
        
        fetch(`/api/question/${categoryId}/${levelSelection}`)
        .then(r => r.json())
        .then((data) =>{
            // console.log(data)
            this.setState({
                question: data
            })
        })
    }

    // numberGenerator() {
    //     const listOfObjectQuestion = this.state.question;
    //     const numOfQuestions = listOfObjectQuestion.length;  
    //     const getRandomNumber = parseInt(Math.random() * (numOfQuestions).toFixed(0));
    //     // this.setState({
    //     //     randomNumber: getRandomNumber
    //     // })
    //     console.log(getRandomNumber)
    //     return (
    //         getRandomNumber
    //     )
    // }
    
    

    
    render() {   
        return(
            <div>
                <Clock />
                <Question 
                    question = {this.state.question}
                    displayQuestion = {this.state.displayQuestion}
                    // ehh = {this._displayQuestion}
                    // QD = {this.numberGenerator}
                    randomNum = {this.state.randomNumber}
                />
                <AnswerInput 
                    // userAnswer = {props.theAnswer}
                    newAnswer = {this.state.inputAnswer}
                    theAnswer = {this._handleAnswerInput}

                />
                
            </div>
        )
    }

    _handleAnswerInput = (input) => {
        console.log(input)
        this.setState({
            inputAnswer: input  
        })



        // event.preventDefault();
        // console.log('got something')
        // const userAnswer = {value: event.target.value}

        // this.setState ({
        //     inputAnswer: userAnswer
        // });
    }

    // _displayQuestion = () => {
    //     // console.log(why)
    //     numberGenerator() {
    //         const listOfObjectQuestion = this.state.question;
    //         const numOfQuestions = listOfObjectQuestion.length;  
    //         const getRandomNumber = parseInt(Math.random() * (numOfQuestions).toFixed(0));
    //         this.setState({
    //             randomNumber: getRandomNumber
    //         })
    //         console.log(getRandomNumber)
    //     }
    // }



}

export default DisplayQuiz; 