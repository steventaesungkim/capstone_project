import React, { Component } from 'react';
import Axios from 'axios';
import Clock from './Clock';
import CategoryDropdown from './CategoryDropdown';
import Navbar from './Navbar';
import SetTimer from './SetTimer';


class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theUser: [],
            isLoggedIn: Boolean,
            time: [],
            categories: [],
            level: [],
            dateSelection: '',
            hourSelection: '',
            minuteSelection: '',
            timeStamp: '',
            categorySelection: 'Select',
            levelSelection: 'Select',
            timeId: '',
            categoryId: '',
            levelId: '',
            resultset_id: '',
            showLevel: false,
            showButton: false
        }
    }

    componentDidMount() {
        fetch('/api/user/isValid')
        .then(r => r.json())
        .then(data => {
            if (data.isLoggedIn === false) {
                this.props.history.push('/');
            } else {
                this.setState ({
                    theUser: data.user,
                    isLoggedIn: data.isLoggedIn
                }, () => {
                    fetch(`/api/categories/${data.user.id}`)
                    .then(r => r.json())
                    .then(data => { 
                        this.setState ({
                            categories: data
                        }, () => {
                            fetch(`/api/questions/${this.state.theUser.id}`)
                            .then(r => r.json())
                            .then(data => {
                                this.setState ({
                                    level: data
                                }, () => {
                                    let timezoneOffSet = (new Date()).getTimezoneOffset() * 60000;
                                    let localISOTime = (new Date(Date.now() - timezoneOffSet)).toISOString().slice(0, -1);
                                    let date = localISOTime.substr(0,10);

                                    let hrs = new Date().getHours();
                                    let mins = new Date().getMinutes();

                                    this.setState ({
                                        dateSelection: date,
                                        hourSelection: hrs,
                                        minuteSelection: mins
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })    
    }

    render() {
        // console.log(`LOGIN-STATUS:`,this.state.isLoggedIn)
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

                    handleTimeSubmit = {this._handleTimeSubmit}
                    timeStamp = {this.state.timeStamp}

                    resultset_id = {this.state.resultset_id}
                    handleResultSet_id = {this._handleResultSet_id}

                    history = {this.props.history}
                />
            </div>
        );
    }

    _handleDateChange = (input) => {
        this.setState ({
            dateSelection: input
        })
    }

    _handleHourChange = (input) => {
        input = (input < 10) ? ("0" + input) : input;
        const hrs = input;
        
        this.setState ({
            hourSelection: hrs
        }) 
    }

    _handleMinuteChange = (input) => {
        input = (input < 10) ? ("0" + input) : input;
        const mins = input;

        this.setState ({
            minuteSelection: mins
        })
    }
    
    _handleTimeSubmit = () => {
        const date = this.state.dateSelection;
        const hour = this.state.hourSelection;
        const minute = this.state.minuteSelection;
        const level = this.state.levelSelection;
        const id_category = this.state.categoryId;
        const id_user = this.state.theUser.id;
        const time = `${date} ${hour}:${minute}`;

        this.setState ({
            timeStamp: time
        })

        return Axios
        .post('/api/timer/create', {
            time, 
            level, 
            id_category, 
            id_user
        })
        // .then(response => {
        //     console.log(response);
        // })
    }

    _handleResultSet_id = () =>{
        const date = this.state.dateSelection;
        const hour = this.state.hourSelection;
        const minute = this.state.minuteSelection;
        const time = `${date} ${hour}:${minute}`;
        const id_user = this.state.theUser.id;

        return Axios
        .post('/api/resultset/create', {
            time,
            id_user,
            score: 100
        })
        .then(response => {
            console.log("OMG ITS BRITNEY!!!!!")
            console.log( response)
            this.setState ({
                resultset_id: response.data.id
            })
        })
    }
    
    _handleCategorySelect = (event) => {
        let selectedCategory = this.state.categories.filter(c => {
            return event.target.value === c.category_type})[0];
                
        this.setState ({
            categoryId: selectedCategory.id,
            categorySelection: event.target.value,
            showLevel: true,
            showButton: false
        })
    }

    _handleLevelSelect = (event) => {
        this.setState ({
            levelSelection: event.target.value,
            showButton: true
        })
    }
    
    _handleLogout = () => {
        this.setState ({
            inSession: false
        })  

        Axios
        .post('/api/user/logout')
        .then(response => {
            if (response.data.message === "Successfully logged out") {
                this.props.history.push('/')
            }
        })
    }
}

export default Timer;