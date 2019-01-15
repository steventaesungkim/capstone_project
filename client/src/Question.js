import React from 'react';
import UserAnswer from './UserAnswer';


const Question = (props) => {
    console.log(props)
    const questionId = props.questionId;
    const questionAnswer = props.questionAnswer;
    const showQuestion = props.displayQuestion;

    return(
        <div>
            {showQuestion}

            <UserAnswer 
                questionId = {questionId}
                questionAnswer = {questionAnswer}

                timeStamp = {props.timeStamp}

                resultsetId = {props.resultsetId}
                handleResultSet = {props.handleResultSet}
                handleNextQuestion = {props.handleNextQuestion}
            />
        </div>
    )
}

export default Question;