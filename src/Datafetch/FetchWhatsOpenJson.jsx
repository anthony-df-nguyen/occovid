import React from 'react';
import { useEffect } from 'react'
const FetchWhatsOpenJson = (props) => {
    let thisDataArray = [];
    return <>
        {
            useEffect(() => {
                let mounted = true;
                const getData = async () => {
                    thisDataArray = [];
                    await fetch('/manualdatasources/whatsopen.json').then(response => response.json())
                        .then(a => a.Table1.forEach(a => {
                            thisDataArray.push({
                                name: a[0],
                                desc: a[`${props.tier}`],
                            })
                        }))
                        .then(a => {
                            if (mounted) {
                                props.function(thisDataArray)
                            }
                        })
                }
                if (mounted) {
                    try { getData() }
                    catch (err) {
                        console.log("Could not fetch whats open JSON")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }
            }, [])
        }</>
}

export default FetchWhatsOpenJson;
