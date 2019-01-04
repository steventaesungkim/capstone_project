// import React from 'react';

// let time = new Date().toLocaleString();

// // // Creating a military Digital Clock

// const Clock = (props) =>{
//     // Date instance
//     let date = new Date();

//     // 0 - 23 hours
//     let hrs = date.getHours(); 
//     // 0 - 59 minutes
//     let mins = date.getMinutes();
//     // 0 - 59 seconds
//     let secs = date.getSeconds();

//     // Always showing double digits
//     hrs = (hrs < 10) ? ("0" + hrs) : hrs;
//     mins = (mins < 10) ? ("0" + mins) : mins;
//     secs = (secs < 10) ? ("0" + secs) :secs;
    
//     // Clock format
//     let time = hrs + `:` + mins + `:` + secs;

//     // // Displaying on body
//     // const clockElement = document.getElementById('clock');
//     // clockElement.innertext = time;
//     // clockElement.textContent = time;

//     // setTimeout(showTime, 1000);

//     setTimeout(Clock, 1000);

//     return(
//         <div className="clockDisplay">{time}</div>
//     );
// }

// export default Clock;

import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toLocaleString()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => {this.tick()}, 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            date: new Date().toLocaleString()
        });
    }

    render() {
        // console.log(this.state.time)
        return (
        <p className="App-clock">
            The time is {this.state.date}.
        </p>
        );
    }
} 

export default Clock;
