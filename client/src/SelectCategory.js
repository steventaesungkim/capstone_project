import React, { Component } from 'react';
import SelectLevel from './SelectLevel';
// import EachCategory from 'react';

import {
    BrowserRouter as Router, 
    Route, 
}   from 'react-router-dom';


class SelectCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            dropdownclass: "hidden"
        }
    }

    componentDidMount() {
        fetch('/api/category')
        .then(r => r.json())
        .then(data =>{
            // console.log(data);
            this.setState({
                categories: data
            })
        })
    }

    render() {
        // console.log(this.state.categories)
        const dropdownClassName = "dropdown-content " + this.state.dropdownclass 
        return (
            <Router>
                <div className = "dropdown">
                    <button onClick = {this._toggledropdown}>Categories</button> 
                    <div className = {dropdownClassName}>
                    {/* <link path = '/timer/category' render = {(props) =>{ 
                        return <EachCategory singleCategory= {this.state.categories} {...props}/>                        
                    }} /> */}
                        <div onClick = {this._eachCat}>{this._dropDown()}</div>
                    </div>  
                    {/* <SelectLevel /> */}
                </div>
            </Router>
        );
    }

    _dropDown = () =>{
        // console.log(this.state.categories)
        
        let listOfCategory = this.state.categories.map((types) =>{  
            return(
                <div>{types.category_type}</div>
            ) 
        })

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
    }

    _toggledropdown = () =>{
        // console.log(this.state.dropdownclass)
        if(this.state.dropdownclass === "hidden"){
            this.setState({
                dropdownclass: ""
            })
        }else{
            this.setState({
                dropdownclass: "hidden"
            })
        }
    }

    _eachCat = () =>{
        console.log('clicked')
        console.log(this._dropDown())
    }
}

export default SelectCategory;