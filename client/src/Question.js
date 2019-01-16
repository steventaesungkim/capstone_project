import React from 'react';
import UserAnswer from './UserAnswer';


const Question = (props) => {
    // console.log(props)
    const questionId = props.questionId;
    const questionAnswer = props.questionAnswer;
    const showQuestion = props.displayQuestion;

    return(
        <div className='questions-display'>
        <h3>Your question is!</h3>
            <div className='questions'>
                {showQuestion}
            </div>

            <UserAnswer 
                questionId = {questionId}
                questionAnswer = {questionAnswer}
                
                timeStamp = {props.timeStamp}

                resultsetId = {props.resultsetId}
                handleResultSet = {props.handleResultSet}
                handleNextQuestion = {props.handleNextQuestion}

                history = {props.history}
            />
        </div>
    )
}

export default Question;