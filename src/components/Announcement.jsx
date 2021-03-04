import React, { useState, useEffect } from 'react';

const Announcement = () => {
    const announcementURL = "https://occovidtaskmongo.vercel.app/api/announcement"
    const [message, updateMessage] = useState()
    const [padding, updatePadding] = useState()  

    //Fetch the announcement and display it
    useEffect(() => {
        let mounted = true;
        let responseArray = [];
        const getMsg = async () => {
            try {
                await fetch(announcementURL)
                    .then(a => a.json())
                    .then(final => {
                       
                        responseArray.push(final[0].display, final[0].text)
                    })
                    .then(() => {
                        const [display, jsonMessage] = responseArray;
                        if (display && mounted) {
                            updateMessage(jsonMessage);
                        }
                    })
            } catch (err) {
                console.log("Could not fetch announcement")
                console.log(err)
            }
        }
        if (mounted) {
            getMsg();
        }
        return () => {
            mounted = false;
        }
    },[])
    
    //Update Padding if there is a message
    useEffect(() => {
        if (message) {
            updatePadding('5px')
        }
    }, [message])


    return (
        <div id="announcement" style={ { padding: padding,}} dangerouslySetInnerHTML={{__html: message}}>
          
        </div>
    );
}

export default Announcement;
