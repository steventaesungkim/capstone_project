import React, { Component } from 'react';
import AnswerForm from './AnswerForm';
import Axios from 'axios';

class UserAnswer extends Component {
    constructor(props) {
        // console.log(props)
        console.log(props.history)
        super(props);
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            userInput: '',
            correct: Boolean,
            numberCorrect: 0,
            numberIncorrect: 0,
            nextQuestion: true
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
        // console.log(this.state.numberCorrect.length)
        // console.log(this.state.numberIncorrect.length)
        return (
            <div className='answer'>
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
             </div>
        )
    }

    _submit = (input) => {
        if (this.props.questionAnswer === input) {

            if (this.state.numberCorrect !== 3){
                alert('Correct');

            this.setState ({
                numberCorrect: this.state.numberCorrect + 1,
                userInput: ''
            })

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

            }else{
                const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
                let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0); 

                alert(`Your score is: ${score}`);
                alert(`totalnumber: ${totalNumberAnswered}`);

                this.props.history.push('/timer');
        
                Axios
                .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
                .then(response => {
                    this.setState ({
                        numberCorrect: 0,
                        numberIncorrect: 0
                    })
                })
            }

        }else{

            if(this.state.numberIncorrect !== 3) {
                alert('Incorrect');
                this.setState ({
                    numberIncorrect: this.state.numberIncorrect + 1,
                    userInput: ''
                })
                Axios
                .post('/api/result/create', {
                    correct: false,
                    id_question: this.props.questionId,
                    id_resultset: this.props.resultsetId
                })

            }else{
                const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
                let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0);
                
                alert(`Your score is: ${score}`);
                alert(`totalnumber: ${totalNumberAnswered}`);

                this.historyprops.history.push('/timer');

                Axios
                .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
                .then(response => {
                    this.setState ({
                        numberCorrect: 0,
                        numberIncorrect: 0
                    })
                })
            }
        }





        // if ((this.props.questionAnswer === input) && (this.state.numberCorrect !== 3)) {
        //     alert('Correct');

        //     this.setState ({
        //         numberCorrect: this.state.numberCorrect + 1,
        //         userInput: ''
        //     })

        //     Axios
        //     .post('/api/result/create', {
        //         correct: true,
        //         id_question: this.props.questionId,
        //         id_resultset: this.props.resultsetId
        //     })
        //     .then(
        //         this.setState ({
        //             numberCorrect: this.state.numberCorrect + 1,
        //             userInput: ''
        //         })
        //     )
        // }else{
        //     const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
        //     let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0); 
        //     alert(`Your score is: ${score}`);
                    
        //     alert(`totalnumber: ${totalNumberAnswered}`);
    
        //     Axios
        //     .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
        //     .then(response => {
        //         this.setState ({
        //             numberCorrect: 0,
        //             numberIncorrect: 0
        //         })
        //         this.props.history.push('/timer')
        //     })
        // }else{
        //     const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
        //     let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0);
        //     console.log(this.state.numberIncorrect)
        //     console.log(totalNumberAnswered)
        //     console.log(score)
        //     alert(`Your score is: ${score}`);
            
        //     alert(`totalnumber: ${totalNumberAnswered}`);
        //     this.state.history.push('/timer');
        //     Axios
        //     .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
        //     .then(response => {
        //         this.setState ({
        //             numberCorrect: 0,
        //             numberIncorrect: 0
        //         })
        //     })
        // }

        // if((this.props.questionAnswer !== input) && (this.state.numberIncorrect !== 3)) {
        //     alert('Incorrect');
        //     this.setState ({
        //         numberIncorrect: this.state.numberIncorrect + 1,
        //         userInput: ''
        //     })
        //     Axios
        //     .post('/api/result/create', {
        //         correct: false,
        //         id_question: this.props.questionId,
        //         id_resultset: this.props.resultsetId
        //     })
        // }else{
        //     const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
        //     let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0);
        //     console.log(this.state.numberIncorrect)
        //     console.log(totalNumberAnswered)
        //     console.log(score)
        //     alert(`Your score is: ${score}`);
            
        //     alert(`totalnumber: ${totalNumberAnswered}`);
        //     this.state.history.push('/timer');
        //     Axios
        //     .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
        //     .then(response => {
        //         this.setState ({
        //             numberCorrect: 0,
        //             numberIncorrect: 0
        //         })
        //     })
        // }
        
        













    //     if (this.props.questionAnswer === input) {
    //         if (this.state.numberCorrect === 3) {
    //             const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
    //             let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0); 
    //             alert(`Your score is: ${score}`);
                
    //             alert(`totalnumber: ${totalNumberAnswered}`);

    //             Axios
    //             .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
    //             .then(response => {
    //                 this.setState ({
    //                     numberCorrect: 0,
    //                     numberIncorrect: 0
    //                 })
    //             // history.push('/timer');
    //             })
    //         } else {
                // alert('Correct')
                // this.setState ({
                //     numberCorrect: this.state.numberCorrect + 1,
                //     userInput: ''
                // })

                // Axios
                // .post('/api/result/create', {
                //     correct: true,
                //     id_question: this.props.questionId,
                //     id_resultset: this.props.resultsetId
                // })
                // // .then(
                // //     this.setState ({
                // //         numberCorrect: this.state.numberCorrect + 1,
                // //         userInput: ''
                // //     })
                // // )
    //         }
    //     } else {
    //         if (this.state.numberIncorrect === 3) {
    //             this.setState ({
    //                 nextQuestion: false
    //             })
    //             if (this.state.nextQuestion === true) {

    //             }
                // const totalNumberAnswered = (this.state.numberCorrect + this.state.numberIncorrect);
                // let score = (((this.state.numberCorrect) / (totalNumberAnswered)) * 100).toFixed(0);
                // console.log(this.state.numberIncorrect)
                // console.log(totalNumberAnswered)
                // console.log(score)

                // // if (this.state.numberIncorrect === 3) {
                //     alert(`Your score is: ${score}`);
                    
                //     alert(`totalnumber: ${totalNumberAnswered}`);
                //     this.state.history.push('/timer');
                // // }

                // Axios
                // .post(`/api/resultset/${this.props.resultsetId}`, `${score}`)
                // .then(response => {
                //     this.setState ({
                //         numberCorrect: [],
                //         numberIncorrect: []
                //     })
                //     // history.push('/timer');
                // })
    //         } else {
                // alert('Incorrect');
                // this.setState ({
                //     numberIncorrect: this.state.numberIncorrect + 1,
                //     userInput: ''
                // })

                // Axios
                // .post('/api/result/create', {
                //     correct: false,
                //     id_question: this.props.questionId,
                //     id_resultset: this.props.resultsetId
                // })
    //             // .then(
                    
    //             // )
    //         }
    //     }
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