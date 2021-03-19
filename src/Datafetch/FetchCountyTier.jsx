import React,{useEffect} from 'react'

export default function FetchCountyTier(props) {
    useEffect(()=>{
        let mounted = true;

        const getData = async ()=> {
            await fetch("https://occovidtaskmongo.vercel.app/api/countytier").then(a => a.json()).then(b=> b[0])
            .then(c => {
                let tier = c["Overall Status"]
               
                if (mounted) {
                    props.function(tier);
                }
              
            })
        }
        getData();
        return (()=> {
            mounted = false;
        })
    },[])
    return (
        <div>
            
        </div>
    )
}
