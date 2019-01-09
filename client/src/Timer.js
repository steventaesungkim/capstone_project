import React, { Component } from 'react';
import Clock from './Clock';
import CategoryDropdown from './CategoryDropdown';

import LevelsDropdown from './LevelsDropdown';

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
            categorySelection: 'Select',
            levelSelection: 'Select',
            categoryId: '',
            levelId: '',
            showLevel: false
            
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
        fetch('/api/question')
        .then(r => r.json())
        .then(data => {
            // console.log(data)
            this.setState({
                level: data
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
                        categorySelection = {this.state.categorySelection}
                        categoryId = {this.state.categoryId}
                        
                        levelList = {this.state.level}
                        handleLevelSelect = {this._handleLevelSelect}
                        levelSelection = {this.state.levelSelection}
                        showLevel = {this.state.showLevel}
                    />

                    {/* <LevelsDropdown
                        testlevel = {this.state.categories}
                    /> */}


                        {/* <button>Set Timer</button> */}

                        {/* <Route path = '/timer' render = {() =>{ 
                            return <Categories categoryList={this.state.categories}/>                        
                        }} /> */}
                </div>
            </Router>
        );
    }


    _handleSelect = (event) => {
        const selected = {name: event.target.value, value: event.target.value}

        this.state.categories.map((compare) =>{
            if (selected.name === compare.category_type){
                this.setState({
                    categoryId: compare.id,
                    categorySelection: selected.value,
                    showLevel: true 
                })
            }
        })
    }

    _handleLevelSelect = (event) => {
        console.log(event.target.value)
        const levelSelected = {value: event.target.value}
        this.setState({
            levelSelection: levelSelected.value
        })

    }
    
}

export default Timer;