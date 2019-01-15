
import React from 'react';

const ResultHistoryTable = props => {
    const results = props.results.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.time}</td>
                <td>{item.category_type}</td>
                <td>{item.level}</td>
                <td>{item.score}</td>
            </tr>
        );            
    })
    
    return (  
        <table className="">
            <thead><tr>
                <th>TIME</th>
                <th>CATEGORY</th>
                <th>LEVEL</th>
                <th>SCORE</th>
            </tr></thead>
            <tbody>                
                {results}
            </tbody>
        </table>
    );
  }

export default ResultHistoryTable;