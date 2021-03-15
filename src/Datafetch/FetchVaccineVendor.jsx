import React, { useEffect } from "react";
import { vaccineVendor } from "globalVars/Sources";

const FetchVaccineVendor = (props) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getData = async () => {
        try {
          await fetch(vaccineVendor)
            .then((a) => a.json())
            .then((b) => {
              let temp = b.features;
              let thisDataArray = [];
              temp.forEach((row) => {
                thisDataArray.push({
                  vendor: row.attributes.category,
                  doses: row.attributes.num_totalvalid,
                });
              });
              thisDataArray.sort((a,b) => a.doses < b.doses ? 1 : -1)
              let final = thisDataArray.slice(0,25);
              if (mounted) {
                props.function(final);
              }
            });
        } catch (err) {
          console.log(err);
        }
      };
      getData();
    }
    return () => {
      mounted = false;
    };
  },[]);

  return <div></div>;
};

export default FetchVaccineVendor;
