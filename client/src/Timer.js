import React, { Component } from 'react';
import Clock from './Clock';
import Categories from './Categories';
import Dropdown from './Dropdown';

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
            level: [],
            selection: 'Select'
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
        })
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

                    <Dropdown 
                        name = 'Category'
                        categoryList = {this.state.categories}
                        handleChange= {this._handleSelect}
                        selection = {this.state.selection}
                    />



                        {/* <button>Set Timer</button> */}

                        {/* <Route path = '/timer' render = {() =>{ 
                            return <Categories categoryList={this.state.categories}/>                        
                        }} /> */}
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