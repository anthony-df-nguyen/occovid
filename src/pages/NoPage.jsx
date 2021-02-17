import React from 'react';
import { Link } from 'react-router-dom'
import Button from 'components/Button'

const NoPage = (props) => {
    return (
        <div>
            <div className='page'>
                <h1 className='pageTitle'>{ props.title }</h1>
                <div className='title404'>
                    <h1 > Page cannot be found!</h1>
                    <p>The page you are looking for has moved or does not exist</p>
                    <Button url={'/'} text="Return Home" />
                </div>
            </div>
        </div>
    );
}

export default NoPage;
