import React, { useEffect } from "react";

const FetchVaccineTier = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getData = async () => {
        try {
          if (mounted) {
            props.function('Ages 12+');
          }
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
