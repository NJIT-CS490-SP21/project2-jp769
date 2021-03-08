import React from 'react';
import './Leaderboard.css';

export function Leaderboard(props){
    const table = props.arr;
    const usernames = {};
    let data="";
    
    for (let i in table){
        usernames[table[i][0]] = table[i][1];
    }

    const keys = Object.keys(usernames);
    
    data = keys.map((x, index) => x === props.name ? <tr class='current_user' key={index}><td>{x} (you)</td><td>{usernames[x]}</td></tr> : <tr key={index}><td>{x}</td><td>{usernames[x]}</td></tr>);
    
    return (<div><table>
        <thead>
        <tr><th colSpan="2">Ranking Leaderboard</th></tr>
        <tr><th>Username</th><th>Ranking</th></tr>
        </thead>
        <tbody>
        {data}
        </tbody>
    </table></div>
    );
}