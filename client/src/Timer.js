import React, { Component } from 'react';
import Clock from './Clock';
import SelectCategory from './SelectCategory';



class Timer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            // time: "",
            category: "",
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
        return (
            <div>
                <header className = "navBar" >
                    <button>myAccount</button>
                    <button>Logout</button>
                </header>
                <Clock />
                <div>
                    {/* <button>Set Timer</button> */}
                <SelectCategory 
                    _onSubmit = {this.onSubmit}

                />
                    
                </div>
            </div>
        );
    }

    _onSubmit (event) {
        console.log(event)
    }

    
}

export default Timer;