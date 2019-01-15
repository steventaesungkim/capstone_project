import React from 'react';

const SetTimer = (props) => {
    
    let timezoneOffSet = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - timezoneOffSet)).toISOString().slice(0, -1);
    let date = localISOTime.substr(0,10);

    let hrs = new Date().getHours();
    let mins = new Date().getMinutes();
    hrs = (hrs < 10) ? ("0" + hrs) : hrs;
    mins = (mins < 10) ? ("0" + mins) : mins;

    const theDate = (props.dateSelection !== date)
    ? date
    : props.dateSelection

    const theHrs = (props.hourSelection !== hrs)
    ? hrs
    : props.hourSelection

    const theMin = (props.minuteSelection !== mins)
    ? mins
    : props.minuteSelection


    return(
        <form 
            className='set-timer'
            name='set-timer'
        >
        <label>{'Set Date:'}
        <input 
            className='input'
            type='date'
            min={date}
            onChange={(event) =>{
                props.handleDateChange(event.target.value)
            }}
            select={props.dateSelection}
            defaultValue={theDate}
            // value={props.dateSelection}   
        /></label>

        
        <label>{props.name}
        <input
            className='input field' 
            type='number'
            name='hour'
            min='0'
            max='23'
            onChange={(event) => {
                props.handleHourChange(event.target.value)
            }}
            select={props.hourSelection}
            defaultValue={theHrs}
            // value={props.hourSelection}
        />
        
        </label>:
        <label>
        <input 
            className='input field'
            type='number'
            name='minute'
            min='0'
            max='59'
            onChange={(event) => {
                props.handleMinuteChange(event.target.value)
            }}
            select={props.minuteSelection}
            defaultValue={theMin}
            // value={props.minuteSelection}
        />
        </label>
        </form>
    )
}

export default SetTimer;