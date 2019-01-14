import React from 'react';

const AvatarDropdown = (props) =>{
    // console.log(props)

    // const firstOption = (props.name === 'Avatar')
    // ? <option >Select a Avatar</option>
    // : <option value= {props.avatarSelection}>Something messed up is you see this</option>; 

    const theAvatarList = props.avatarData.map((eachAvatar, index) => {
        return <img 
            key={index} 
            className='avatarImg' 
            src={`/image/${eachAvatar.img}`}
            
             />

        // console.log(eachAvatar.img)
        // return <option key={index} value={(eachAvatar.img)}>{eachAvatar.name}</option>
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
        <div>

            {props.name}:
            <label
                name={props.name}
                value={props.avatarSelection}
                onClick={(event) => 
                    console.log(event)
                    // props.handleAvatar(event)
                }
                />
                {/* {firstOption} */}
                {theAvatarList}
        </div>
    )

}

export default AvatarDropdown;