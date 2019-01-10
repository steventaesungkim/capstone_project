import React, { Component } from 'react';


class Questions extends Component {
    constructor(props){
        
        super(props);
        this.state = {
            question: [],
            answer: []
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
                <h1>hi</h1>
                {this.state.question.map(something =>{
                    return(
                        <div>
                            {something.question}
                        </div>
                    )
                })}
            </div>
        )
    }



}



export default Questions; 