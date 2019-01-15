import React, { Component } from 'react';
import DeckQandA from './DeckQandA';
import Axios from 'axios';



class DeckAdd extends Component {
    constructor(props) {
        // console.log(props)
        super(props); 
        this.state = {
            theUser: [],
            isLogged: Boolean,
            categoryId: '',
            subject: '',
            question: '',
            answer: ''

        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data =>{
            console.log(data.isLoggedIn)
            if(data.isLoggedIn === false){
                this.props.history.push('/');
            } else {
                // Get the user's Flash category ID. Add one if they don't have one yet
                fetch(`/api/category/user/${data.user.id}`)
                .then(r => r.json())
                .then(d =>{
                    console.log(d);
                    //console.log(d[0].id);

                    if (d.length > 0) {
                        this.setState({
                            theUser: data.user,
                            isLoggedIn: data.isLoggedIn,
                            categoryId: d[0].id
                        })
                    } else {
                        Axios
                        .post(`/api/category/create`, {
                            category_type: "Flash Cards",
                            levels: false,
                            userID: data.user.id
                        })
                        .then((response) => {
                            // console.log(response.data);
                            console.log(`Category added: ${response.data.id} / ${response.data.category_type}`);

                            this.setState ({
                                theUser: data.user,
                                isLoggedIn: data.isLoggedIn,
                                categoryId: response.data.id
                            })
                        })
                    }

                })
            }
        })    
    }

    render () {
        return (
            <div>
                <h2>Flash Cards</h2>
                <h4>Create a new flash card</h4>
                <DeckQandA 
                    inputSubject = {this._updateSubject}
                    newSubject = {this.state.subject}
                    inputQuestion = {this._updateQuestion}
                    newQuestion = {this.state.question}
                    inputAnswer = {this._updateAnswer}
                    newAnswer = {this.state.answer}
                    submit = {this._onSubmit}
                />

            </div>
        )
    }
    
    _updateSubject = (input) => {
        this.setState({subject: input})
    }

    _updateQuestion = (input) => {
        this.setState({question: input})
    }

    _updateAnswer = (input) => {
        this.setState({answer: input})
    }


    _onSubmit = (event) => {
        event.preventDefault();

        Axios
            .post(`/api/question/create`, {
                level: this.state.subject,
                question: this.state.question,
                answer: this.state.answer,
                id_category: this.state.categoryId
            })
            .then((response) => {
                // console.log(response.data);
                console.log(`Flash Card added: ${response.data.id}`);

                this.setState ({
                    subject: '',
                    question: '',
                    answer: ''
                })
            })
    }
}

export default DeckAdd;