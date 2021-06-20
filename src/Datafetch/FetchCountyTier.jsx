import React,{useEffect} from 'react'

export default function FetchCountyTier(props) {
    useEffect(()=>{
        let mounted = true;

        const getData = async ()=> {
            await fetch("https://occovidtaskmongo.vercel.app/api/countytier").then(a => a.json()).then(b=> b[0])
            .then(()=> {
            
            })
        }
        //getData();
        let tier = "Fully Open";
        console.log("tier: ", tier);
        if (mounted) {
            props.function(tier);
        }
        return (()=> {
            mounted = false;
        })
    },[])
    return (
        <div>
            
        </div>
    )
}
