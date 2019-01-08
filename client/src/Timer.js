import React, { Component } from 'react';
import Clock from './Clock';
import SelectCategory from './SelectCategory';

import {
    BrowserRouter as Router, 
    Route, 
}   from 'react-router-dom';



class Timer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            // time: "",
            categories: "",
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
        })
    }

    render() {
        const shithead = (this.state.categories)
        // shithead.map((moreBullShit) =>{
        //     console.log(moreBullShit)
        // })
        
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
                        <Route path = '/timer' render = {(props) =>{ 
                            return <SelectCategory categoryList= {this._theList} {...props}/>                        
                        }} />

                    </div>
                </div>
            </Router>
        );
    }



    _theList = () =>{
        const category = (this.state.categories)

        const list = category.map((thecategory) => {
            // console.log(thecategory);
        })
    }
    
}

export default Timer;