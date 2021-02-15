import { useEffect } from 'react'

let thisDataArray = [];
let schoolDataTable;
const FetchSchool = (props) => {
    useEffect( async () => {
        thisDataArray = [];
        await fetch('/manualdatasources/schools.csv').then(response => response.text())
        .then((a)=> {
        schoolDataTable = a.split("\n").slice(1);
        })
        .then(()=> {
            schoolDataTable.forEach((a) => {
                let splita = a.split(",");
                if (splita[0]) {
                    thisDataArray.push({
                    week: splita[0],
                    student: splita[1],
                    teacher: splita[2],
                    otherstaff: splita[3],
                    indtotal: splita[4],
                    elementary: splita[5],
                    highschool: splita[6],
                    kto12: splita[7],
                    college: splita[8],
                    schooltotal: splita[9],
                  });
                }
            });
        })
        .then(() => {
            //console.log(thisDataArray)
            props.function(thisDataArray);
        })
    },[props.time])

  return (
  <>

  </>);
}
       
            
    
export default FetchSchool
