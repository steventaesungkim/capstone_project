import React from 'react';
import LevelsDropdown from './LevelsDropdown';

const CategoryDropdown = (props) => {
    console.log('CATEGORY DROPDOWN PROPS')
    console.log(props)

    const firstOption = (props.name === 'Category')
    ? <option >Select a Category</option>
    : <option value= {props.categorySelection}>Something messed up is you see this</option>; 
   
    let getLevelDropdown = () => {
        if (props.showLevel === true) {
            return(
                <div>   
                    <LevelsDropdown 
                        name = 'Levels'
                        levelList = {props.levelList}
                        handleLevel= {props.handleLevelSelect}
                        levelSelection = {props.levelSelection}
                        
                        categoryId = {props.categoryId}
                        categorySelection = {props.categorySelection}

                        showButton = {props.showButton}

                        _handleTimeSubmit = {props.handleTimeSubmit}
                        
                        // handleButton  = {props.handleButtonClick}

                        resultSet_id = {props.resultSet_id}
                        _handleResultSet_id = {props.handleResultSet_id}
                    />
                </div>
            )
        }
    }

    const theCategoryList = props.categoryList.map((eachCategory,index) => {
        return <option key={index} value={(eachCategory.category_type)}>{eachCategory.category_type}</option>
    }) 

    return (
        <div>
            <label>{props.name}: 
                <select
                    name={props.name}
                    value={props.categorySelection}
                    onChange={(event) => props.handleCategoryChange(event)}
                >

                    {firstOption}
                    {theCategoryList}
                
                </select>
            </label>
            {getLevelDropdown()}
        </div>
    )

    
}


export default CategoryDropdown;