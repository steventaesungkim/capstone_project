import React from 'react';
import { Redirect } from 'react-router-dom';

const LevelsDropdown = (props) => {

    // console.log(props.resultset_id)
    const firstOption = (props.name !== 'Level')
    ? <option value= {props.levelList}>Select a Level</option>
    : <option value= {props.levelSelection}>WRONG</option>;
    // console.log(props.levelList)

    let getButtonQuestions = () => {
        if (props.showButton) { 
            return (
                <div>
                    <input
                        className='btn btn-ghost'
                        type='submit'
                        value='Set Timer'
                        onClick={(event) => {
                        Promise.all([
                                props._handleTimeSubmit(event.target.value),
                                props._handleResultSet_id(event.target.value)
                        ])   
                    }}
                    />
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

    // console.log('This is the RESULTSETID')
    // console.log(props.resultset_id)
    
    return (
        <div>
            <label>{props.name}:
                <select
                    className='selection'
                    value={props.levelSelection}
                    onChange={(event) => props.handleLevel(event)}
                >
                    {firstOption}  
                    {theEachLevel}
                </select>
            </label>
            {
                (props.resultset_id === '') ?
                getButtonQuestions() : <Redirect to={`/question/${props.categoryId}/${props.levelSelection}/${props.resultset_id}`}/>
            }
        </div>
    )
}
export default LevelsDropdown;
