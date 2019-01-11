import React from 'react';
import UserAnswer from './UserAnswer';


const Question = (props) =>{

    const showQuestion = props.displayQuestion;
    const questionId = props.questionId;
    const questionAnswer = props.questionAnswer;

    console.log(`Answer:`, questionAnswer)

    return(
        <div>
            {showQuestion}
            {/* <Answer /> */}

            <UserAnswer 
                questionAnswer = {questionAnswer}
                questionId = {questionId}
                alreadyAnswered = {props.alreadyAnswered}

            />
        </div>
    )
}

export default Question;