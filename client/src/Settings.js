import React from 'react';


const Settings = (props) => {
    console.log(props)

    // const settings = props.match.params
    // const thisUser = this.props.location.state

    // console.log(thisUser)

        
    return (
        <div>
            <h2>Settings</h2>
            <p>Please update your information</p>

            <form>
                <label>Username:</label>
                <input 
                    name='username'
                    className='input'
                    type='text'

                    // onChange = {(event) => {
                    //     props.newUsername(event.target.value);
                    // }}
                    value = {props.inputValue}
                />
                <br/>
                <label>Password:</label>
                <input 
                    name='password'
                    className='input'
                    type='text'

                />
                <br/>
                <input 
                    className='input-submit'
                    type='submit'
                    value='Update'
                />

            </form>    
        </div>
    );
}

export default Settings;