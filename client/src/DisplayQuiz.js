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
            alreadyAnswered: []
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
            const userAnswer = listOfAnswers[0];
                this.setState({
                    question: data,
                    displayQuestion: theQuestion,
                    questionId: theQuestionId,
                    questionAnswer: userAnswer
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
                    alreadyAnswered = {this.state.alreadyAnswered}
                />
                
            </div>
        )
    }

    _howManyQuestions = () => {
        const refreshPage = () => {
            window.location.reload();
        }

        if (this.alreadyAnswered.length <= 6) {
            this.alreadyAnswered.push(this.questionId)
            refreshPage()
            console.log('Keep answering');
        } else {
            console.log('No more questions');
        }

    }

    
}

export default DisplayQuiz; 