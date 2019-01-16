import React from 'react';

const DeckQandA = (props) => {
    return (
        <form
            className='form'
            method='POST'
            action='/api/user/userId'
            onSubmit = {(event) => {props.submit(event)}}
        >
            <label>Subject:
                <input 
                    name='subject'
                    className='input'
                    type='text'
                    onChange = {(event) => {props.inputSubject(event.target.value)}}
                    value = {props.newSubject}
                />
            </label>
            
            <label>Question:
                <input 
                    name='question'
                    className='input'
                    type='text'
                    onChange = {(event) => {props.inputQuestion(event.target.value)}}
                    value = {props.newQuestion}
                />
            </label>
            
            <label>Answer:
                <input 
                    name='answer'
                    className='input'
                    type='text'
                    onChange = {(event) => {props.inputAnswer(event.target.value)}}
                    value = {props.newAnswer}
                />
            </label>
            
            <input 
                className='input-submit'
                type='submit'
                value={`${props.btnValue} Flash Card`}
            />
        </form>
    )
}

export default DeckQandA;