import React, { Component } from 'react';
import Clock from './Clock';
import CategoryDropdown from './CategoryDropdown';
import Logout from './Logout';

import Axios from 'axios';
import Navbar from './Navbar';



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
            showLevel: false,
            showButton: false,
            isLoggedIn: ''
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
        fetch('/api/user/isValid')
        .then(r => r.json())
        // .then(data =>{
        //     console.log(data)
        // })
    }

    render() {
        return (
            <div>
                <Navbar 
                    handleLogout = {this._handleLogout}  
                />
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

                    showButton = {this.state.showButton}
                />

                    {/* <button>Set Timer</button> */}

            </div>
        );
    }


    _handleSelect = (event) => {
        console.log('Category Selected')
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
        console.log('Level Selected')
        const levelSelected = {value: event.target.value}

        this.setState({
            levelSelection: levelSelected.value,
            showButton: true
        })
    }
    
    _handleLogout = (event) =>{
        // console.log("clicked")
        this.setState({
            inSession: false
        })  
        Axios
        .post('/api/user/logout')
        .then((response) =>{
            if (response.data.message === "Successfully logged out"){
                this.props.history.push('/')
            }
        })
    }
}

export default Timer;