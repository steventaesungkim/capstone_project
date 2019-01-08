import React, { Component } from 'react';
import Clock from './Clock';
// import Categories from './Categories';
import CategoryDropdown from './CategoryDropdown';

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

                    <CategoryDropdown 
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
        // console.log(category)
        this.setState({
            categories: category
        })
        // const list = category.map((thecategory) => {
        //     console.log(thecategory);
        // })
    }

    _handleSelect = (event) => {
        // console.log('Selecting..')
        const selected = {name: event.target.value, value: event.target.value}
        // console.log(selected)
            this.setState({
                selection: selected.value
                
            })
        
        // if (selected.value !== this.state.selection) {

        // }
        // console.log(this.state.categories)
    }
    
}

export default Timer;