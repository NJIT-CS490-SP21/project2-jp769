import React from 'react';

export function Box(props){
    return (
        <div className="box" onClick={() => props.onClick()}>{props.value}</div>
    );
}

export function BoxSpec(props){
    return (
        <div className="box">{props.value}</div>
    );
}