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
                <div className='deck-content' key={index}>
                    <p 
                        className='qa'
                    >
                        <b>Q:&nbsp; {i.question}</b><br />
                        <b>A:&nbsp; {i.answer}</b><br />
                    </p>
                    <button className='btn btn-ghost' onClick={(e) => props.btnClickEdit(i.id, e)}>Edit</button>
                    <button className='btn btn-ghost' onClick={(e) => props.btnClickDelete(i.id, e)}>Delete</button>
                </div>
                    )
            })
        )
    };

    return (
    <div className='decks'>
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