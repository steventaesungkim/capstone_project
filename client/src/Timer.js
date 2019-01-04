import React, { Component } from 'react';
import Clock from './Clock';



class Timer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            time: "",
            category: "",
            level: ""
        }
    }

    // componentDidMount() {
    //     this.intervalID = setInterval(() => (
    //         this.tick(), 1000
    //     ));
    // }

    // componentWillUnmount() {
    //     clearInterval(this.intervalID);
    // }
    
    // tick() {
    //     this.setState({
    //         date: new Date().toLocaleString()
    //     });
    // }
    
    render() {
        return (
            <div>
                <header className = "navBar" >
                    <button>myAccount</button>
                    <button>Logout</button>
                </header>
                <Clock />
                <div>
                    <button>Set Timer</button>
                    <button>Select Category</button>
                    <button>Select Level</button>
                </div>
            </div>
        );
    }

    
}

export default Timer;