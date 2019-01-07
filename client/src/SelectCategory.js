// import React from 'react';

// const SelectCategory = (props) =>{
//     console.log(props.categories)
//     return(
//         <div>
//             <button onSubmit = {props.categories}>Categories</button> 
//         </div>
//     )
// }


import React, { Component } from 'react';
// import SelectLevel from './SelectLevel';

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
            <div className = "dropdown">
                <button onClick = {this._toggledropdown}>Categories</button> 
                <div className = {dropdownClassName}>
                    <div>{this._dropDown()}</div>
                </div>  
                {/* <SelectLevel /> */}

            </div>
        );
    }

    _dropDown = () =>{
        // console.log(this.state.categories)
       let farts = this.state.categories.map((types) =>{
            return types.category_type    
            
        })

        return ( 
            <div>
                <p>{farts}</p>
            </div>
        )
        // const categories = this.state.categories;
        // categories.map((arrObject) =>{
        //     this.setState({
        //         categories: arrObject.category_type
        //     })
        // })
    }

    _toggledropdown = () =>{
        console.log(this.state.dropdownclass)
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
}

export default SelectCategory;