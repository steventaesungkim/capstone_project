import React, { Component } from 'react';
import Clock from './Clock';
import Categories from './Categories';

import {
    BrowserRouter as Router, 
    Route, 
}   from 'react-router-dom';



class Timer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            // time: "",
            categories: [],
            level: ""
        }
    }

    componentDidMount() {
        fetch('/api/category')
        .then(r => r.json())
        .then(data =>{ 
            // console.log(data);
            this.setState({
                categories: data
            })
            // return data
        })
        // .then(categories => {
        //     // console.log(categories)
        //     this._theList(categories)
        // })
    }

    render() {
        return (
            <Router>
                <div>
                    <header className = "navBar" >
                        <button>myAccount</button>
                        <button>Logout</button>
                    </header>
                    <Clock />
                        {/* <button>Set Timer</button> */}

                    <div>
                        <Route path = '/timer' render = {() =>{ 
                            return <Categories categoryList={this.state.categories}/>                        
                        }} />

                    </div>
                </div>
            </Router>
        );
    }



    _theList = () =>{
        const category = (this.state.categories)
        console.log(category)
        this.setState({
            categories: category
        })
        // const list = category.map((thecategory) => {
        //     console.log(thecategory);
        // })
    }
    
}

export default Timer;