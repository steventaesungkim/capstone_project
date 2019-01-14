import React from 'react';
import { Link } from 'react-router-dom';

const LevelsDropdown = (props) => {
    const firstOption = (props.name !== 'Level')
    ? <option value= {props.levelList}>Select a Level</option>
    : <option value= {props.levelSelection}>WRONG</option>;
    // console.log(props.levelList)

    let getButtonQuestions = () => {
        if (props.showButton) { 
            return (
                <div>
                    <button>Click to continue!</button>
                </div>
            )
        }
    }

    const theListOfLevel = [];
    props.levelList.forEach((eachLevel) =>{
        if((props.categoryId === eachLevel.id_category) && (!theListOfLevel.includes(eachLevel.level))){
            theListOfLevel.push(eachLevel.level)
        }
    })

    const theEachLevel = theListOfLevel.map((eachLevel, index) =>{
        return <option key={index} value={eachLevel}>{eachLevel}</option>
    })

    return (
        <div>
            <label>{props.name}:
                <select
                    value={props.levelSelection}
                    onChange={(event) => props.handleLevel(event)}
                >
                    {firstOption}  
                    {theEachLevel}
                </select>
            </label>
            <Link to = {`/question/${props.categoryId}/${props.levelSelection}`}>{getButtonQuestions()}</Link>

        </div>
    )
}
export default LevelsDropdown;