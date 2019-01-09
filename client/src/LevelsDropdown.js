import React from 'react';

const LevelsDropdown = (props) => {
    // console.log(props)
    const firstOption = (props.name !== 'Level')
    ? <option value= {props.levelList}>Select a Level</option>
    : <option value= {props.levelSelection}>WRONG</option>;
    // console.log(props.levelList)

    

    const diffLevel = props.levelList.map((eachLevel, index) => {
        // console.log(eachLevel.level)
        
        if (props.categoryId === eachLevel.id_category) {
           
            return <option key={index} value={eachLevel.level}>{eachLevel.level}</option>
        }
    })

    return (
        <div>
            {props.name}:
            <select
                value={props.levelSelection}
                onChange={(event) => props.handleLevel(event)}
            >
                {firstOption}  
                {diffLevel}
            </select>
        </div>
    )
}

export default LevelsDropdown;