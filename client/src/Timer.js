import React, { Component } from 'react';
import Axios from 'axios';
import Clock from './Clock';
import CategoryDropdown from './CategoryDropdown';
import Navbar from './Navbar';
import SetTimer from './SetTimer';



class Timer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            theUser: [],
            isLoggedIn: Boolean,
            time: [],
            categories: [],
            level: [],
            dateSelection: '',
            hourSelection: '00',
            minuteSelection: '00',
            categorySelection: 'Select',
            levelSelection: 'Select',
            timeId: '',
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
            } else {
                this.setState({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                }, () =>{
                    fetch(`/api/categories/${data.user.id}`)
                    .then(r => r.json())
                    .then(data => { 
                        // console.log(data);
                        this.setState({
                            categories: data
                        }, () => {
                            fetch(`/api/questions/${this.state.theUser.id}`)
                            .then(r => r.json())
                            .then(data => {
                                // console.log(data)
                                this.setState({
                                    level: data
                                })
                            })
                        })
                    })
                })
            }
        })    
    }

    render() {
        console.log(`LOGIN-STATUS:`,this.state.isLoggedIn)
        const currentUser = (this.state.theUser)
        return (
            <div>
                <Navbar 
                    user = {currentUser}
                    
                    inSession = {this.state.isLoggedIn}
                    handleLogout = {this._handleLogout}
                />
                <Clock />

                <SetTimer 
                    userInfo = {this._userInfo}
                    inSession = {this.state.isLoggedIn}

                    name = 'Set Timer'
                    dateSelection = {this.state.dateSelection}
                    hourSelection = {this.state.hourSelection}
                    minuteSelection = {this.state.minuteSelection}
                    handleDateChange = {this._handleDateChange}
                    handleHourChange = {this._handleHourChange}
                    handleMinuteChange = {this._handleMinuteChange}
                    // handleTimeSubmit = {this._handleTimeSubmit}
                />







                <CategoryDropdown 
                    name = 'Category'

                    categoryList = {this.state.categories}
                    handleCategoryChange= {this._handleCategorySelect}
                    categorySelection = {this.state.categorySelection}
                    categoryId = {this.state.categoryId}
                    
                    levelList = {this.state.level}
                    handleLevelSelect = {this._handleLevelSelect}
                    levelSelection = {this.state.levelSelection}
                    showLevel = {this.state.showLevel}

                    showButton = {this.state.showButton}

                    userInfo = {this._userInfo}
                    inSession = {this.state.isLoggedIn}
                />

            </div>
        );
    }

    _handleDateChange = (input) =>{
        // console.log(input)

        this.setState({
            dateSelection: input
        })
        
    }

    _handleHourChange = (input) => {
        const date = new Date().toLocaleDateString()
        console.log(date)



        input = (input < 10) ? ("0" + input) : input;
        const hrs = input
        console.log(hrs)
        this.setState ({
            hourSelection: hrs
        }) 
    }

    
    _handleMinuteChange = (input) => {
        input = (input < 10) ? ("0" + input) : input;
        const mins = input
        console.log(mins)
        this.setState ({
            minuteSelection: mins
        })
    }
    // _handleTimeSubmit = () =>{
    //     const hr = this.state.hourSelection;
    //     const min = this.state.minuteSelection;
        
    // }
    

    _handleCategorySelect = (event) => {
        //console.log('Category Selected')
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
        //console.log('Level Selected')
        this.setState({
            levelSelection: event.target.value,
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