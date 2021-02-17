import React from 'react';

const ComingSoon = (props) => {
    return (
        <div className='page'>
            <h1 className='pageTitle'>{ props.title }</h1>
            <div style={{margin: '1rem'}}>
                <ul>
                    <li><h2>Compare Cases to Other Counties
                        </h2></li><br></br>
                    <li><h2>Compare Hospitalizations to Other Counties</h2></li><br></br>
                    <li><h2>FAQ/Sources</h2></li><br></br>
                    <li><h2>Maybe Maps</h2></li><br></br>
                </ul>
            </div>
         
        </div>

     
    );
}

export default ComingSoon;
