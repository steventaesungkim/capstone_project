import React from 'react';

const Question = (props) =>{
    // console.log(props.all)
    // console.log(props.questionId)
    // console.log(props.displayQuestion)
    // console.log(props.questionAnswer)
    // console.log(props.userInput)
    const showQuestion = props.displayQuestion;
    const questionId = props.questionId;
    const questionAnswer = props.questionAnswer;

    const userInput = props.userInput;
    const questionResult = props.questionResult;

    // const listOfObjectQuestion = props.question 

    // let shuffleQuestion = (array) =>{
        
    //     for (var i = array.length - 1; i > 0; i--) {
    //         var j = Math.floor(Math.random() * (i + 1));
    //         var temp = array[i]; 
    //         array[i] = array[j];
    //         array[j] = temp;
    //     }
    //     return array;
    // }

    // const listOfQuestions = [];
    // const listOfAnswers = [];
    // const listOfQuestionId = []
    // const listOfQA = shuffleQuestion(listOfObjectQuestion).map(data =>{
    //     listOfQuestions.push(data.question);
    //     listOfAnswers.push(data.answer);
    //     listOfQuestionId.push(data.id);
    // })

    // const questionId = listOfQuestionId[0];
    // const theQuestion = listOfQuestions[0];
    // const theAnswer = listOfAnswers[0];

    // console.log(listOfAnswers[0])

    return(
        <div>
            {showQuestion}
            {/* <Answer /> */}
            <form className='answer-form'
                method='POST'
                //  ${resultset_id} needs to be add in place of '100'
                action={`/api/result/100/${questionId}`}
                onSubmit = {(event) =>{
                    if(questionAnswer === event.target.value){
                        props.answerResult(true);
                    }else{
                        props.answerResult(false);
                    }
                }}
                value = {questionResult}
                id='resetAnswer'
            >
            <br></br>
            <input
                onChange={(event) =>{
                    props.userAnswer(event.target.value)
                }}
                value={userInput}
            />
            <input 
                className='input-submit'
                type='submit'
                value='submit'
            />
            </form>
        </div>
    )
}

export default Question;