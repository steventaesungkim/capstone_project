import React, { Component } from 'react';
// import SelectLevel from './SelectLevel';
import EachCategory from 'react';
import {
    BrowserRouter as Router, 
    Route, 
}   from 'react-router-dom';
import { compileFunction } from 'vm';


class SelectCategory extends Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = { 
            categories: [props.categoryList]
            // dropdownclass: "hidden"
        }
    }


    render() {
        // console.log(this.state.categories)
        // console.log(props.categoryList)
        // const dropdownClassName = "dropdown-content " + this.state.dropdownclass 
        return (
            <div>

            </div>





            // <Router>
            //     <div className = "dropdown">
            //         <button onClick = {this._toggledropdown}>Categories</button> 
            //         <div className = {dropdownClassName}>
            //         <link path = '/timer/category' render = {(props) =>{ 
            //             return <EachCategory singleCategory= {this.state.categories} {...props}/>                        
            //         }} />
            //             <div onClick = {this._eachCat}>{this._dropDown()}</div>
            //         </div>  
            //         <SelectLevel />
            //     </div>
            // </Router>
        );
    }











    
    // _dropDown = () =>{
        // console.log(this.state.categories)
        
        // let listOfCategory = this.state.categories.map((types) =>{  
            // return(
                // <div>{types.category_type}</div>
            // ) 
        // })

        // return ( 
        //     <div>
        //         <ul>{listOfCategory}</ul>
        //     </div>
        // )
        // const categories = this.state.categories;
        // categories.map((arrObject) =>{
        //     this.setState({
        //         categories: arrObject.category_type
        //     })
        // })
    // }

//     _toggledropdown = () =>{
//         // console.log(this.state.dropdownclass)
//         if(this.state.dropdownclass === "hidden"){
//             this.setState({
//                 dropdownclass: ""
//             })
//         }else{
//             this.setState({
//                 dropdownclass: "hidden"
//             })
//         }
//     }

//     _eachCat = () =>{
//         console.log('clicked')
//         console.log(this._dropDown())
//     }
}   

export default SelectCategory;