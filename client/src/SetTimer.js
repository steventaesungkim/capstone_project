import React from 'react';

const SetTimer = (props) => {
    console.log(props.dateSelection)

    let timezoneOffSet = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - timezoneOffSet)).toISOString().slice(0, -1);
    let date = localISOTime.substr(0,10);

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
                    defaultValue={date}
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
                    value={props.hourSelection}
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
                    value={props.minuteSelection}
                />
            </label>
        </div>
    )
}

export default SetTimer;