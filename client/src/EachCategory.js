import React, { Component } from 'react';

class EachCategory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            category: ""
        }
    }
    render() {
        const sections = props.singleCategory.map(typeCategory => {
            console.log(singleCategory)
            return (
                <li>
                    <Link to= {`/`}
                </li>
            )

        })
        // console.log(props.categories.category_type)
    }
}

export default EachCategory;