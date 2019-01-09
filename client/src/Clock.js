import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            time: ''
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
        let hrs = new Date().getHours();
        let mins = new Date().getMinutes();
        let secs = new Date().getSeconds();

        hrs = (hrs < 10) ? ("0" + hrs) : hrs;
        mins = (mins < 10) ? ("0" + mins) : mins;
        secs = (secs < 10) ? ("0" + secs) :secs;

        let time = hrs + `:` + mins + `:` + secs;

        // new Date().toLocaleTimeString() for 12 hour format
        this.setState({
            date: new Date().toLocaleDateString(),
            time: time
        });
    }

    render() {
        // console.log(this.state.date)
        return (
        <div className="App-clock">
            {this.state.time}
        </div>
        );
    }

} 

export default Clock;
