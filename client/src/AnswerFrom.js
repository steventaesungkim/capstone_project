import React from 'react';

const AnswerForm = (props) => {
    return (
        <form className='answer-form'
                method='POST'
                //  ${resultset_id} needs to be add in place of '100'
                action={`/api/result/100/${props.questionId}`}
                onSubmit={(event) =>{
                    event.preventDefault();
                    props.handleSubmit(props.userInput)
                }}
                id='resetAnswer'
            >
    
            <input
                id='answerInput'
                required
                className='input'
                type='text'
                placeholder='What is your answer?'
                onChange={(event) =>{
                    props.userAnswer(event.target.value)
                }}
                value={props.userInput}
            />
            <input 
                className='input-submit'
                type='submit'
                value='submit'
                onClick = {props.click}
            />
        </form>
    )

}


export default AnswerForm;