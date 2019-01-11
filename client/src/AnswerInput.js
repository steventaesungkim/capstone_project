import React from 'react';

const AnswerInput = (props) =>  {
    return (
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
                className='input'
                type='text'
                placeholder='What is your answer?'
                onChange = {(e) => {props.userAnswer(e.target.value)}}
                value = {props.theAnswer}
                
            />
            <input
                className='input-submit'
                type='submit'
                value='Submit'
            />
        </form>
    )

}


export default AnswerInput;