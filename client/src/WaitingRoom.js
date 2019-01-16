import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Clock from './Clock';



class WaitingRoom extends Component {
    constructor(props) {
        console.log(props.match.params)
        console.log(props.match.params.categoryId)
        console.log(props.match.params.levelSelection)
        console.log(props.match.params.resultset_id)
        console.log(props.match.params.hourSelection)
        console.log(props.match.params.minuteSelection)

        super(props);
        this.state = {
            date: '',
            time: '',
            hour: '',
            minute: '',
            categoryId: props.match.params.categoryId,
            levelSelection: props.match.params.levelSelection,
            resultset_id: props.match.params.resultset_id,
            hourSelection: props.match.params.hourSelection,
            minuteSelection: props.match.params.minuteSelection
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
            time: time,
            hour: hrs,
            minute: mins
        });
    }

    render() {
        console.log('comp hour',this.state.hour)
        console.log('me hour',this.state.hourSelection)
        console.log('comp min',this.state.minute)
        console.log('me min',this.state.minuteSelection)

        const isHourMatch = this.state.hour == this.state.hourSelection;
        const isMinMatch = this.state.minute == this.state.minuteSelection;


        return (
        <div className="App-clock" >
            {
                (isHourMatch && isMinMatch) ?
                <Redirect to={`/question/${this.state.categoryId}/${this.state.levelSelection}/${this.state.resultset_id}`}/>
                : (<Clock />)

                
            }
        </div>
        );
    }
}

export default WaitingRoom;