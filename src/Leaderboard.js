import React from 'react';

export function Leaderboard(props){
    // const columns = ["Username", "Ranking"];
    // console.log(props.arr);
    const table = props.arr;
    const usernames = {};
    let data="";
    
    for (let i in table){
        usernames[table[i][0]] = table[i][1];
    }

    const keys = Object.keys(usernames);
    console.log(keys);
    
    // data = <tr><td>{ keys[0].toString() }</td><td>{ usernames[keys[0]].toString() }</td></tr>;
    // data = keys.forEach((key, index) => <tr key={index}><td>{ key }</td><td>{ usernames[key] }</td></tr>);
    // data = usernames.map((x, index) => <tr key={index}><td>{ x }</td><td>{ table[x][1] }</td></tr>);
    
    return (<div><table>
        <thead>
        <tr><th colSpan="2">Ranking Leaderboard</th></tr>
        <tr><th>Username</th><th>Ranking</th></tr>
        </thead>
        <tbody>
        </tbody>
    </table></div>
    );
}