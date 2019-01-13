import React from 'react';

const AnswerForm = (props) => {
    // console.log(props.resultset_id)
    return (
        <form className='answer-form'
                method='POST'
                //  ${resultset_id} needs to be add in place of '100'
                action={'/api/result/create'}
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
                id='id_resultset'
                name='id_resultset'
                type='hidden'
                value={props.resultset_id}
            />
            <input 
                id='id_question'
                name='id_question'
                type='hidden'
                value={props.questionId}
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