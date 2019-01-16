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

    const QandA = (subject) => {
        let filtered = props.questionList.filter(x => x.level === subject);
        return (
            filtered.map(i => {
            return (
                    <p>
                        <b>Q:</b>{i.question}<br />
                        <b>A:</b>{i.answer}<br />
                        
                    </p>)
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
                    <p>edit this deck</p>
                </details>);            
        })}
    </div>
    );
};




export default List;