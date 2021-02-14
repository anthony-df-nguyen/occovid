import React from 'react';

const Widget = (props) => {
    return (
        <div className="widget">
            <div className="statName">{props.title}</div>
            <div className="stat" style={{color:props.color}}>{props.stat}</div>
            {/* <div>{props.change}</div> */}
        </div>
    );
}

export default Widget;
