import React, { useEffect } from "react";

const FetchVaccineTier = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getData = async () => {
        try {
          await fetch("https://occovidtaskmongo.vercel.app/api/vaxphase")
            .then((a) => a.json())
            .then((b) => {
              b.phase += ' w/Med. Conditions, Ages 16+ in Zips 92701,92703,92805,92844';
              if (mounted) {
                props.function(b);
                
              }
            });
        } catch (err) {
            console.log(err)
            let error = {
                phase: 'Error',
                url: 'https://coronavirus.egovoc.com/covid-19-vaccination-distribution',
                date: new Date()
            }
            if (mounted) {
                props.function(error);
            }
          
        }
      };
      getData();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return <div></div>;
};

export default FetchVaccineTier;
