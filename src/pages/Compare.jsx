import React, { useState, useEffect, useContext } from 'react'
import TimeContext from 'components/context/TimeContext'
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect'
import { FetchCases } from 'Datafetch/FetchCases';
import { FetchDeaths } from 'Datafetch/FetchDeaths';
import { FetchHospitals } from 'Datafetch/FetchHospitals';
import CityCompareChart from 'components/CityCompare/CityCompareChart';
import GetCountyCasesAndDeaths from 'Datafetch/GetCountyCasesAndDeaths'
import Page from 'components/Page'
import CompareCountyMode from 'components/CompareCountyMode'
import { countyPopulation, ocpop } from 'globalVars/populations.js'
import ExpandCollapse from 'components/ExpandCollapse';

const Compare = props => {
    const { time, setTime } = useContext(TimeContext)
    const [ocArray, updateOCArray] = useState([])
    const [compareArray, updateCompareArray] = useState([])
    const [comparisonCounty, updateComparisonCounty] = useState(() => {
        if (!localStorage.getItem('countyCompareLastCounty')) {
            return 'Los Angeles'
        } else {
            return localStorage.getItem('countyCompareLastCounty')
        }
    })
    const [ocFinalArray, updateOCFinalArray] = useState([])
    const [compareFinalArray, updateCompareFinalArray] = useState([])

    // Cases, Case per 100k, Deaths, Deaths per 100k, Hositalized, Hospitalize per 100k
    const [currentMode, updateMode] = useState(() => {
        if (!localStorage.getItem('countyCompareLastMode')) {
            return 'Cases'
        } else {
            return localStorage.getItem('countyCompareLastMode')
        }
    });

    //Determine Which Arrays to Map
    function calculateAlltheArrays() {
        switch (currentMode) {
            case 'Cases per 100K':
                updateOCFinalArray(() => {
                    return getper100ks(ocArray, 'totalCasesbySpecimen', 'oc')
                })
                updateCompareFinalArray(() => {
                    return getper100ks(compareArray, 'totalCases')
                })
                break;
            case 'Deaths per 100k':
                updateOCFinalArray(() => {
                    return getper100ks(ocArray, 'total_dth_repo', 'oc')
                })
                updateCompareFinalArray(() => {
                    return getper100ks(compareArray, 'totalDeaths')
                })
                break;
            case 'Cases':
                updateOCFinalArray(() => {
                    return ocArray.map(a => a.totalCasesbySpecimen);
                })
                updateCompareFinalArray(() => {
                    return compareArray.map(a => a.totalCases);
                })
                break;
            case 'Deaths':
                updateOCFinalArray(() => {
                    return ocArray.map(a => a.total_dth_repo);
                })
                updateCompareFinalArray(() => {
                    return compareArray.map(a => a.totalDeaths);
                })
                break;
            default:
                console.log('Default is running')
                updateOCFinalArray(() => {
                    return getper100ks(ocArray, 'totalCasesbySpecimen', 'oc')
                })
                updateCompareFinalArray(() => {
                    return getper100ks(compareArray, 'totalCases')
                })
                break;
        }
        
    }

    //Find the Population of the County Comparison
    function findMatchingCountyPopulation() {
        let findPop = countyPopulation.filter(row => row.a === comparisonCounty ? row.b : null)
        let comparisonCountyPopulation = findPop[0].b;
        return comparisonCountyPopulation
    }

    //Get the per 100k of the Arrays
    function getper100ks(array,whichValue, oc) {
        //for non-OC counties
        if (!oc) {
            let pop = findMatchingCountyPopulation();
            let tempArray = []
            array.forEach((a) => {
                Object.keys(a).forEach((b, i) => {
                    if (b === whichValue) {
                        //console.log(`There is a match for ${key} at position ${index} for array position ${i}`)
                        tempArray.push((Object.values(a)[i]))
                    }
               })
            })
            return tempArray.map(row => parseFloat((row / pop) * 100000).toFixed(1))
        } else if (oc) {
        
            let tempArray = []
            array.forEach((a) => {
                Object.keys(a).forEach((b, i) => {
                    //console.log(b)
                    if (b === whichValue) {               
                        tempArray.push((Object.values(a)[i]))
                    }
                })
            })
            return tempArray.map(row => parseFloat((row / ocpop) * 100000).toFixed(1))
        }
    }

    const returnFetchComponents = () => {
        switch (currentMode) {
            case 'Cases':
                //console.log('Fetching cases')
                return (<>
                    <FetchCases function={ updateOCArray } time={ time } />
                    <GetCountyCasesAndDeaths function={ updateCompareArray } county={ comparisonCounty } time={ time } /></>)
                break;
            case 'Deaths':
                //console.log('Fetching deaths')
                return <>
                    <FetchDeaths function={ updateOCArray } time={ time } />
                    <GetCountyCasesAndDeaths function={ updateCompareArray } county={ comparisonCounty } time={ time } /></>
                break;
            case 'Cases per 100K':
                //console.log('Fetching cases per 100k')
                return <>
                    <FetchCases function={ updateOCArray } time={ time } />
                    <GetCountyCasesAndDeaths function={ updateCompareArray } county={ comparisonCounty } time={ time } /></>
                break;
            case 'Deaths per 100k':
                //console.log('Fetching deaths per 100k')
                return <>
                    <FetchDeaths function={ updateOCArray } time={ time } />
                    <GetCountyCasesAndDeaths function={ updateCompareArray } county={ comparisonCounty } time={ time } /></>
                break;
            default:
                //console.log('defualt')
                return <>
                    <FetchCases function={ updateOCArray } time={ time } />
                    <GetCountyCasesAndDeaths function={ updateCompareArray } county={ comparisonCounty } time={ time } /></>
                break;
        };
    }

    //Updates ocArray when Data is Done Fetching
    useEffect(() => {
        //console.log('ocArray has changed with a length of ', ocArray.length)
        calculateAlltheArrays();
    }, [ocArray]);
    //Updates compareArray when Data is Done Fetching
    useEffect(() => {
        //console.log('compareArray has changed with a length of ', compareArray.length)
        calculateAlltheArrays();
    }, [compareArray]);

    //Recalculate when the county Changes
    useEffect(() => {
        <GetCountyCasesAndDeaths function={ updateCompareArray } county={ comparisonCounty } time={ time } rerun={'Rerun'} />
    }, [comparisonCounty]);

    //Recalculate when the Mode Changes
    useEffect(() => {
        returnFetchComponents();
        calculateAlltheArrays();
    }, [currentMode]);

    return (
        <div>
            { returnFetchComponents() }
            <Page title="Compare ">
                <Timeselect />
                <ExpandCollapse title="Select County and Metric"  buttontext={'Close'} >
                    <div id="countySelect">
                        <p className="expandContentInstruction"> County: </p>
                        <select onChange={ (e) => {
                            localStorage.setItem('countyCompareLastCounty', e.target.value)
                            updateComparisonCounty(e.target.value)
                        } }>
                            <option value={ comparisonCounty }></option>
                            <option value="Alameda">Alameda</option>
                            <option value="Alpine">Alpine</option>
                            <option value="Amador">Amador</option>
                            <option value="Butte">Butte</option>
                            <option value="Calaveras">Calaveras</option>
                            <option value="Colusa">Colusa</option>
                            <option value="Contra Costa">Contra Costa</option>
                            <option value="Del Norte">Del Norte</option>
                            <option value="El Dorado">El Dorado</option>
                            <option value="Fresno">Fresno</option>
                            <option value="Glenn">Glenn</option>
                            <option value="Humboldt">Humboldt</option>
                            <option value="Imperial">Imperial</option>
                            <option value="Inyo">Inyo</option>
                            <option value="Kern">Kern</option>
                            <option value="Kings">Kings</option>
                            <option value="Lake">Lake</option>
                            <option value="Lassen">Lassen</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="Madera">Madera</option>
                            <option value="Marin">Marin</option>
                            <option value="Mariposa">Mariposa</option>
                            <option value="Mendocino">Mendocino</option>
                            <option value="Merced">Merced</option>
                            <option value="Modoc">Modoc</option>
                            <option value="Mono">Mono</option>
                            <option value="Monterey">Monterey</option>
                            <option value="Napa">Napa</option>
                            <option value="Nevada">Nevada</option>
                            <option value="Placer">Placer</option>
                            <option value="Plumas">Plumas</option>
                            <option value="Riverside">Riverside</option>
                            <option value="Sacramento">Sacramento</option>
                            <option value="San Benito">San Benito</option>
                            <option value="San Bernardino">San Bernardino</option>
                            <option value="San Diego">San Diego</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="San Joaquin">San Joaquin</option>
                            <option value="San Luis Obispo">San Luis Obispo</option>
                            <option value="San Mateo">San Mateo</option>
                            <option value="Santa Barbara">Santa Barbara</option>
                            <option value="Santa Clara">Santa Clara</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Shasta">Shasta</option>
                            <option value="Sierra">Sierra</option>
                            <option value="Siskiyou">Siskiyou</option>
                            <option value="Solano">Solano</option>
                            <option value="Sonoma">Sonoma</option>
                            <option value="Stanislaus">Stanislaus</option>
                            <option value="Sutter">Sutter</option>
                            <option value="Tehama">Tehama</option>
                            <option value="Trinity">Trinity</option>
                            <option value="Tulare">Tulare</option>
                            <option value="Tuolumne">Tuolumne</option>
                            <option value="Ventura">Ventura</option>
                            <option value="Yolo">Yolo</option>
                            <option value="Yuba">Yuba</option>
                        </select>
                    </div>
                    <CompareCountyMode current={ currentMode } function={ updateMode} />
 
                </ExpandCollapse>
                <div id='fullPageChart'>
                    <CityCompareChart
                        key='1'
                        id='comparecounties'
                        date={ compareArray.map(a => a.date) }
                        data={ [compareFinalArray, ocFinalArray] }
                        fill={ [color.blue, color.red] }
                        title={ `Comparing ${currentMode} for OC and ${comparisonCounty}` }
                        label={ [comparisonCounty, 'Orange County'] }
                        switches={ ['line'] }
                    />
                </div>
            </Page>
        </div>
    )
}

export default Compare
