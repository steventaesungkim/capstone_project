import React from 'react';

const AvatarDropdown = (props) =>{
    // console.log(props)

    const firstOption = (props.name === 'Avatar')
    ? <option >Select a Avatar</option>
    : <option value= {props.avatarSelection}>Something messed up is you see this</option>; 

    const theAvatarList = props.avatarData.map((eachAvatar, index) => {
        // console.log(eachAvatar.img)
        return <option key={index} value={(eachAvatar.img)}>{eachAvatar.name}</option>
        // return <img>{eachAvatar.img}</img>

        // Have tried img tag inside option - doesn't like
    }) 
    
    // return(
    //     <div>
    //         {props.name}
    //         <select
    //             name={props.name}
    //             value={props.avatarSelection}
    //             onChange={(event) => props.handleAvatar(event)}
    //             >
    //             {firstOption}
    //             {theAvatarList}
    //             {/* img tag - select tag can not accept img tag */}
    //        </select>
    //     </div>
    // )
    
    return(
        <label>
            {props.name}
            <select
                name={props.name}
                value={props.avatarSelection}
                onChange={(event) => props.handleAvatar(event)}
                >
                {firstOption}
                {theAvatarList}
            </select>
        </label>
    )

}

export default AvatarDropdown;


{/* <label>Password:
            <input
                required
                className='input'
                type='text'
                // placeholder='Password'
                onChange = {(e) => {
                    props.newPassword(e.target.value);
                }}
                value = {props.inputPassword}
                id = 'resetRegisterPassword'
            /></label> */}