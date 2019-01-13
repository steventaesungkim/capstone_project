import React, { Component } from 'react';
import Axios from 'axios';
import Clock from './Clock';
import CategoryDropdown from './CategoryDropdown';
import Navbar from './Navbar';



class Timer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            theUser: [],
            isLoggedIn: Boolean,
            categories: [],
            level: [],
            categorySelection: 'Select',
            levelSelection: 'Select',
            categoryId: '',
            levelId: '',
            showLevel: false,
            showButton: false
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data =>{
            // console.log(data.user.id)
            if(data.isLoggedIn === false){
                this.props.history.push('/');
            }else{
                this.setState({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                })
            }
            fetch(`/api/categories/${data.user.id}`)
            .then(r => r.json())
            .then(data =>{ 
                // console.log(data);
                this.setState({
                    categories: data
                })
                fetch('/api/question')
                .then(r => r.json())
                .then(data => {
                    // console.log(data)
                    this.setState({
                        level: data
                    })
                })
            })
        })    
    }

    render() {
        // console.log(this.state.theUser)
        console.log(`LOGIN-STATUS:`,this.state.isLoggedIn)
        return (
            <div>
                <Navbar 
                    // userInfo = {this.state.theUser}
                    
                    inSession = {this.state.isLoggedIn}
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
                    // handleButtonClick = {this._handleButton}

                    userInfo = {this._userInfo}
                    inSession = {this.state.isLoggedIn}
                />

                    {/* <button>Set Timer</button> */}

            </div>
        );
    }


    _handleSelect = (event) => {
        console.log('Category Selected')

        let selectedCategory = this.state.categories.filter(c => {
            return event.target.value === c.category_type})[0];
                
        this.setState({
                    categoryId: selectedCategory.id,
                    categorySelection: event.target.value,
                    showLevel: true,
                    showButton: false
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