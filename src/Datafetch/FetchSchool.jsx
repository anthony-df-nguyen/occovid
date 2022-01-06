import { useEffect } from 'react'
import filtertime from 'components/Timefilter.js'
import moment from 'moment'
let thisDataArray = [];
let schoolDataTable;
const FetchSchool = (props) => {

    return (
        <>
            {    useEffect(() => {
                let mounted = true;
                const getData = async () => {
                    thisDataArray = [];
                    await fetch('/manualdatasources/schools.csv').then(response => response.text())
                        .then((a) => {
                            schoolDataTable = a.split("\n").slice(1);
                        })
                        .then(() => {
                            schoolDataTable.forEach((a) => {
                                let splita = a.split(",");
                                let parseDate =new Date(splita[0]);
                                if (splita[0]) {
                                    thisDataArray.push({
                                        date: parseDate,
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
                        .then(()=> filtertime(thisDataArray,props.time))
                        .then((final) => {
                            if (mounted) {
                                final.sort((a,b)=> new Date(a.date) > new Date(b.date) ? 1 : -1)
                                props.function[0](final);
                            }
                        })
                }
                if (mounted) {
                    try { getData() }
                    catch (err) {
                        console.log("Could not fetch school data")
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



export default FetchSchool
