import React from 'react';
import { useEffect } from 'react'
const FetchWhatsOpenJson = (props) => {
    let thisDataArray = [];
    useEffect(async () => {
        thisDataArray = [];
        await fetch('/manualdatasources/whatsopen.json').then(response => response.json())
            .then(a => a.Table1.forEach(a => {
                thisDataArray.push({
                    name: a[0],
                    desc: a[props.tier],
                })
            }))
            .then(a => props.function(thisDataArray))


    }, [])

    return (
        <div>

        </div>
    );
}

export default FetchWhatsOpenJson;
