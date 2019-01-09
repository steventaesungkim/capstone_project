import React from 'react';
import LevelsDropdown from './LevelsDropdown';

const CategoryDropdown = (props) => {
    const firstOption = (props.name === 'Category')
    ? <option >Select a Category</option>
    : <option value= {props.categorySelection}>Something messed up is you see this</option>; 
   
    console.log(props.categoryId)
    
    const theCategoryList = props.categoryList.map((eachCategory,index) => {
        return <option key={index} value={(eachCategory.category_type)}>{eachCategory.category_type}</option>
    }) 

    return (
        <div>
            {props.name}: 
            <select
                name={props.name}
                value={props.categorySelection}
                onChange={(event) => props.handleChange(event)}
            >

                {firstOption}
                {theCategoryList}
            
            </select>
            <LevelsDropdown 
                name = 'Levels'
                levelList = {props.levelList}
                handleLevel= {props.handleLevelSelect}
                levelSelection = {props.levelSelection}
                categoryId = {props.categoryId}
            />
            
        </div>
    )

    
}


export default CategoryDropdown;