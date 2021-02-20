import React, { useEffect, useState} from 'react';
import Page from 'components/Page'


const Reportbug = (props) => {
    return (
        <div className='page'>
            <h1 className='pageTitle'>{ props.title }</h1>
            <div className='formTitle'>View latest updates, known bugs, and ideas on my public <a href="https://trello.com/b/SFoifRJf/occovid-public-kanban">Trello Board</a></div>

            <div className='formTitle'>Have questions? <a href="mailto: anthonydfnguyen@gmail.com"> Email me</a></div>

            <div id="googleForm">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScOtQjpnqcxaXju6gnSghVyLi4BRIj74u-5Un3_H3vki5y_Cw/viewform?embedded=true" width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe>
            </div>
        </div>     
    );
}

export default Reportbug;
