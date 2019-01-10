import React from 'react';

const Question = (props) =>{

    const listOfObjectQuestion = props.question 

    let shuffleQuestion = (array) =>{
        
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i]; 
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // const listOfQuestions = [];
    // shuffleQuestion(listOfObjectQuestion).forEach((eachQuestion) =>{
    //     listOfQuestions.push(eachQuestion.question)
    // })
    
    // const firstQuestion = listOfQuestions[0];
    
    // const something = firstQuestion.question
    // console.log(something)
    // console.log(firstQuestion.answer)

    // const oneObjectQuestion = shuffleQuestion(listOfObjectQuestion)[0]

    // console.log(oneObjectQuestion)
    // console.log(oneObjectQuestion.question)

    const listOfQuestions = [];
    const listOfAnswers = [];
    const listOfQuestionId = []
    const listOfQA = shuffleQuestion(listOfObjectQuestion).map(data =>{
        listOfQuestions.push(data.question);
        listOfAnswers.push(data.answer);
        listOfQuestionId.push(data.id);
    })

    const questionId = listOfQuestionId[0]

    // console.log(listOfAnswers[0])

    return(
        <div>
            {listOfQuestions[0]}
            {/* <Answer /> */}
            <form className='answer-form'
                method='POST'
                action=''
                onSubmit = {(event) =>{
                    props.theAnswer(event.target.value);
                }}
                // value = {this.state.inputAnswer}
                id='resetAnswer'
            >
            <input
                
            />
            </form>
        </div>
    )
}

export default Question;