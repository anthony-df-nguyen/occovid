import { useEffect } from 'react'


let thisDataArray = [];
let vaccineDataTable;

const FetchVaccines = (props) => {
    let vaccineData 
  
    useEffect( async () => {
        thisDataArray = [];
        await fetch('/manualdatasources/vaccine.csv').then(response => response.text())
        .then(grab => vaccineData = grab)
        .then(()=> {
        vaccineDataTable = vaccineData.split("\n").slice(1);
        })
        .then(()=> {
        vaccineDataTable.forEach((a) => {
            let col = a.split(",");
            thisDataArray = [...col];
        });
        })
        .then(() => {
            props.function(thisDataArray);
        })
    },[props.time])

  return (<>

  </>);
}


export { FetchVaccines }
