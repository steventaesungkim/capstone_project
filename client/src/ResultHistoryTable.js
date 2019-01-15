
import React from 'react';

const ResultHistoryTable = props => {
    const results = props.results.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.time.substring(0, 10)}</td>
                <td>{item.time.substring(11, 16)}</td>
                <td>{item.category_type}</td>
                <td>{item.level}</td>
                <td>{item.score}</td>
            </tr>
        );            
    })
    
    return (  
        <table className="">
            <thead><tr>
                <th>DATE</th>
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