import React from 'react';

// const List = (props) => {
//     return (
//     <ul>
//         {props.items.map((item, index) => {
//             return <li key={index}>{item}</li>;            
//         })}
//     </ul>
//     );
// };



const List = (props) => {
    // console.log(props);
    const QandA = (subject) => {
        let filtered = props.questionList.filter(x => x.level === subject);
        return (
            filtered.map((i, index) => {
            return (
                <div key={index}>
                    <p>
                        <b>Q: </b>{i.question}<br />
                        <b>A: </b>{i.answer}<br />
                    </p>
                    <button onClick={(e) => props.btnClick(i.id, e)}>Edit</button>
                </div>
                    )
            })
        )
    };

    return (
    <div>
        {props.items.map((item, index) => {
            return (
                <details key={index}>
                    <summary>{item}</summary>
                    {QandA(item)}
                    {/* <p>edit this deck</p> */}
                </details>);            
        })}
    </div>
    );
};




export default List;