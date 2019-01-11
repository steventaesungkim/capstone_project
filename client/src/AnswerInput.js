import React from 'react';

const AnswerInput = (props) =>  {
    console.log(props.newAnswer)

    return (
        <input 
                className='input'
                type='text'
                placeholder='What is your answer?'
                // onChange = {(event) => {
                //     event.preventDefault()
                //     // props.userAnswer(e.target.value)}}
                //     props.theAnswer(event.target.value)}}
                onChange={(event) =>{
                    props.theAnswer(event.target.value)
                    // alert('correct')
                }}
                value = {props.newAnswer}     
            />







        // <form className='answer-form'
        //     // method='POST'
        //     // action=''
        //     // onSubmit = {(event) =>{
        //     //     props.theAnswer(event.target.value);
        //     //     alert('correct')
        //     // }}
        //     // value = {this.state.inputAnswer}
        //     // id='resetAnswer'
        // >
        //     <input 
        //         className='input'
        //         type='text'
        //         placeholder='What is your answer?'
        //         // onChange = {(event) => {
        //         //     event.preventDefault()
        //         //     // props.userAnswer(e.target.value)}}
        //         //     props.theAnswer(event.target.value)}}
        //         onChange={(event) =>{
        //             props.theAnswer(event.target.value)
        //             alert('correct')
        //         }}
        //         value = {props.newAnswer}
                
        //     />
        //     <input
        //         className='input-submit'
        //         type='submit'
        //         value='Submit'
        //     />
        // </form>
    )

}


export default AnswerInput;