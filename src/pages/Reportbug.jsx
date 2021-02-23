import React, { useEffect, useState} from 'react';
import Page from 'components/Page'


const Reportbug = (props) => {
    return (
        <div className='page'>
            <h1 className='pageTitle'>{ props.title }</h1>
            <div className='formTitle'>View latest updates, known bugs, and ideas on my public <a href="https://trello.com/b/SFoifRJf/occovid-public-kanban">Trello Board</a></div>

            <div className='formTitle'>Have questions? <a href="mailto: anthonydfnguyen@gmail.com"> Email me</a></div>

            <div id="googleForm">
                <h2>Reports Bugs/Make Suggestions</h2>
                <p>Please note, I can only show more data if it's publicly available. If you have a data source, please refer me to it.</p>
                <form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScOtQjpnqcxaXju6gnSghVyLi4BRIj74u-5Un3_H3vki5y_Cw/formResponse" method="POST">
                    <label ></label>
                    <textarea name="entry.655858757" placeholder="Report a bug(s). Please include which browser you are using and platform (iOS/Android/Windows/Mac)"></textarea>
                    <textarea name="entry.520929852" placeholder="Any suggestions or ideas?"></textarea>
                    <button className="globButton" type="submit">Submit</button>
                </form>
            </div>
        </div>     
    );
}

export default Reportbug;
