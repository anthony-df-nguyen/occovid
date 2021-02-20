import { useEffect } from 'react'


let thisDataArray = [];
let vaccineDataTable;

const FetchVaccines = (props) => {
    let vaccineData
    return (<>
        {
            useEffect(() => {
                let mounted = true;
                const getData = async () => {
                    await fetch('/manualdatasources/vaccine.csv').then(response => response.text())
                        .then(grab => vaccineData = grab)
                        .then(() => {
                            vaccineDataTable = vaccineData.split("\n").slice(1);
                        })
                        .then(() => {
                            vaccineDataTable.forEach((a) => {
                                let col = a.split(",");
                                thisDataArray = [...col];
                            });
                        })
                        .then(() => {
                            if (mounted) {
                                props.function(thisDataArray);
                            }

                        })
                }
                if (mounted) {
                    thisDataArray = [];
                
                    try {
                        getData()                       
                    } catch (err) {
                        console.log("Could not getch Vaccine data")
                        console.log(err)
                    }
                }
                return () => {
                    mounted = false;
                }
            }, [props.time])
        }
    </>);
}


export { FetchVaccines }
