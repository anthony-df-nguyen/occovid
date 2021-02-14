import React, {useState, useContext } from 'react';
import TimeContext from "components/TimeContext";

function setStorage(value) {
    localStorage.setItem('timeSetting', value)
}

const Timeselect = (props) => {
    const {time,setTime} =  useContext(TimeContext);
    return (
        <div className="timeButtonContainer">
            <a onClick={ () => {setStorage(14);setTime(14)}}>Last 14 Days</a>
            <a onClick={ () => {setStorage(30);setTime(30)}}>Last 30 Days</a>
            <a onClick={ () => {setStorage(60);setTime(60)}}>Last 60 Days</a>
            <a onClick={ () => {setStorage(90);setTime(90)}}>Last 90 Days</a>
            <a onClick={ () => {setStorage(120);setTime(120)}}>Last 120 Days</a>
        </div>
    );
}

export default Timeselect;
