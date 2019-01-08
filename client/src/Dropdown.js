import React from 'react';

const Dropdown = (props) => {
    const firstOption = (props.name === 'Category')
    ? <option value= {props.categoryList}>Select a Category</option>
    : <option value= {props.selection}></option> ;
    console.log(props.categoryList)
    
    const theCategoryList = props.categoryList.map((eachCategory, index) => {
        return <option key={index} value={eachCategory.category_type}>{eachCategory.category_type}</option>
        // console.log(eachCategory.category_type)
    }) 


    return (
        <div>
            {props.name}: 
            <select
                name={props.name}
                value={props.selection}
                onChange={(event) => props.handleChange(event)}
            >
                {firstOption}
                {theCategoryList}
            </select>
        </div>
    )
}

export default Dropdown;