import React, {useState, useContext } from 'react';
import TimeContext from "components/TimeContext";

function setStorage(value) {
    localStorage.setItem('timeSetting', value)
}

const Timeselect = (props) => {
    const {time,setTime} =  useContext(TimeContext);

    function updateAllTime(x) {
        setStorage(x) 
        setTime(x)
    }

    return (
        <div>
            <div className="timeFilterTitle">Isolate Time Periods</div>
            <div className="timeParent">
                <div className="timeButtonContainer">
                    <a className={time == 'All Time' ? 'active' : null} onClick={()=> updateAllTime('All Time')}>All Time</a>
                    <a className={time == 14 ? 'active' : null} onClick={()=> updateAllTime(14)}>Last 14 Days</a>
                    <a className={time == 30 ? 'active' : null} onClick={ ()=> updateAllTime(30)}>Last 30 Days</a>
                    <a className={time == 60 ? 'active' : null} onClick={()=> updateAllTime(60)}>Last 60 Days</a>
                    <a className={time == 90 ? 'active' : null} onClick={ ()=> updateAllTime(90)}>Last 90 Days</a>
                    <a className={time == 120 ? 'active' : null} onClick={ ()=> updateAllTime(120)}>Last 120 Days</a>
                </div>
            </div>
        </div>
    );
}

export default Timeselect;
