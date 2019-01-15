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
        <div>
            <label>
                {'Set Date:'}
            </label>
            <br></br>
            <label>
                <input 
                    type='date'
                    min={date}
                    onChange={(event) =>{
                        props.handleDateChange(event.target.value)
                    }}
                    select={props.dateSelection}
                    defaultValue={theDate}
                    // value={props.dateSelection}   
                />
            </label>
            <br></br>
            <label>
                {props.name}: 
            </label>
            <br></br>
            <label>
                <input 
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
            </label>
                :
            <label>
                <input 
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
        </div>
    )
}

export default SetTimer;