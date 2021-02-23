import React, { useContext } from 'react';

import {LastUpdateDate} from 'components/context/LastupdateContext'


const Lastupdate = () => {
    const [lastDate, updateDate] = useContext(LastUpdateDate)
    return (
        <div id="lastUpdateDate">
            <p>{ lastDate} </p>
        </div>
    );
}

export default Lastupdate;
