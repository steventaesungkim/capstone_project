import React from 'react';


const Question = (props) =>{

    const listOfObjectQuestion = props.question 

    // // console.log(listOfObjectQuestion.length)
    // const numOfQuestions = listOfObjectQuestion.length  

    // const getRandomNumber = parseInt(Math.random() * (numOfQuestions).toFixed(0))
    // console.log(getRandomNumber)

    // console.log(props.displayQuestion)

    // console.log(listOfObjectQuestion)

    // const listOfObjectQuestion = this.state.question;
    // const numOfQuestions = listOfObjectQuestion.length;  
    // const getRandomNumber = parseInt(Math.random() * (numOfQuestions).toFixed(0));

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
    const listOfQuestionId = []
    const listOfQA = shuffleQuestion(listOfObjectQuestion).map(data =>{
        listOfQuestions.push(data.question);
        listOfAnswers.push(data.answer);
        listOfQuestionId.push(data.id);
    })

    const questionId = listOfQuestionId[0];
    const theQuestion = listOfQuestions[0];
    const theAnswer = listOfAnswers[0];

    console.log(`Answer:`, listOfAnswers[0])
    // console.log({props.newAnswer})

    return(
        <div>
            {theQuestion}
            {props.ehh}
        
            
        </div>
    )
}

export default Question;