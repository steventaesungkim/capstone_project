import React, { Component } from 'react';
import Clock from './Clock';
import Question from './Question';


class DisplayQuiz extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            question: [],
            answer: [],
            questionId: '',
            displayQuestion: '',
            inputAnswer: ''
        }
    }

    componentDidMount(){
        const categoryId = this.props.match.params.categoryId;
        const levelSelection = this.props.match.params.levelSelection;
        
        fetch(`/api/question/${categoryId}/${levelSelection}`)
        .then(r => r.json())
        .then((data) =>{
            // console.log(data)
            this.setState({
                question: data
            })
        })
        
    }

    
    

    
    render() {   
        return(
            <div>
                <Clock />
                <Question 
                    question = {this.state.question}
                    
                />
                {/* <form className='answer-form'
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
                </form> */}
                {/* <Answer /> */}
            </div>
        )
    }



}



export default DisplayQuiz; 