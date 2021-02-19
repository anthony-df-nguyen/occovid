import React, { useState, useContext } from 'react';
import TimeContext from "components/context/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import { FetchVaccines } from 'Datafetch/FetchVaccines';
import VaccineHistory from 'Datafetch/VaccineHistory.jsx';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import { ageLabels, ageColors, raceColors } from "globalVars/chartJSconfig";
import {
    ocpop, age0_17_pop, age18_24_pop, age25_34_pop, age35_44_pop, age45_54_pop, age55_64_pop, age65_74_pop, age75_84_pop, age85_pop, asian_pop, black_pop, hispanic_pop, white_pop} from 'globalVars/populations';
import BuildTable from 'components/BuildTable'
import Page from 'components/Page'

const Vaccinations = (props) => {
    const { time, setTime } = useContext(TimeContext);
    const [array, updateArray] = useState([]);
    const [vaccineHisArray, updateVaxArray] = useState([]);
    const [asof, peopleOneDose, peopleTwoDose, totalPeople, adminOneDose, adminTwoDose, totalAdmin, female, male, otherSex, asianPI, black, hispanic, white, otherRace, age017, age1824, age2534, age3544, age4554, age5564, age6574yrs, age7584, age85, ageUnknown, moderna, pfizer, unknownTrade] = array;

 
    //Total People Reports
    const totalPPL = parseInt(totalPeople);
    const totallPPLPerc = parseFloat((totalPPL / ocpop) * 100).toFixed(1)

    //Age Vaccine Reports
    const agePopArray = [age0_17_pop, age18_24_pop, age25_34_pop, age35_44_pop, age45_54_pop, age55_64_pop, age65_74_pop, age75_84_pop, age85_pop]
    const ageVaxArray = [age017, age1824, age2534, age3544, age4554, age5564, age6574yrs, age7584, age85]
    const ageVaxArrayAll = [age017, age1824, age2534, age3544, age4554, age5564, age6574yrs, age7584, age85, ageUnknown]
    const agePercent1Dose = ageVaxArray.map((a, i) => {
        return (parseFloat((a / agePopArray[i]) * 100).toFixed(1) + '%')
    })
    const ageOCPop = agePopArray.map(a => a.toLocaleString())

    //Race Vaccine Reports
    const racePopArray = [asian_pop, black_pop, hispanic_pop, white_pop]
    const raceOCPop = racePopArray.map( a=> a.toLocaleString())
    const raceVaxArray = [asianPI, black, hispanic, white, otherRace];
    const raceVaxArrayAll = [asianPI, black, hispanic, white, otherRace];
    const racePercent1Dose = raceVaxArray.map((a, i) => {
        return (parseFloat((a / racePopArray[i]) * 100).toFixed(1) + '%')
    })

    return (
        <div>
            <VaccineHistory function={ updateVaxArray } time={ time } />
            <FetchVaccines function={ updateArray } time={ time } />
            <Page title='Vaccinations'>
                <div id="lastUpdateDate">
                    <p>Last Updated { asof }</p>
                </div>
                <div className="widgetGrid">
                    <Widget title={ "OC Population" } stat={ ocpop.toLocaleString() }
                        color={ color.green } />
                    <Widget title={ "Total People Vaccinated" } stat={ `${totalPPL.toLocaleString()} | ${totallPPLPerc}%` }
                        color={ color.blue } />
                    <Widget title={ "People: 1st Dose Only" } stat={ parseInt(peopleOneDose).toLocaleString() }
                        color={ color.blue } />
                    <Widget title={ "People: 1st & 2nd Dose" } stat={ parseInt(peopleTwoDose).toLocaleString() }
                        color={ color.blue } />
                    <Widget title={ "Total Administered" } stat={ parseInt(totalAdmin).toLocaleString() }
                        color={ color.pink } />
                    <Widget title={ "1st Dose Administered" } stat={ parseInt(adminOneDose).toLocaleString() }
                        color={ color.pink } />
                    <Widget title={ "2nd Dose Administered" } stat={ parseInt(adminTwoDose).toLocaleString() }
                        color={ color.pink } />

                </div>
                <Timeselect />
                <div id="chartVaccineGrid">
                    <Chart
                        key="5"
                        id="vaccinehis"
                        date={ vaccineHisArray.map(a => a.date) }
                        data={ [vaccineHisArray.map(a => a.vax), vaccineHisArray.map(a => a.vax7Avg)] }
                        fill={ [color.blue, color.gold] }
                        title={ "Daily Doses Administered" }
                        label={ ["Doses", "7 Day Avg"] }
                        switches={ ['line', 'bar'] }>

                    </Chart>
                    <Chart
                        key="1"
                        id="vaccine1"
                        date={ [...ageLabels] }
                        data={ [ageVaxArrayAll] }
                        fill={ [[...ageColors]] }
                        title={ "Persons w/ at Least 1 Dose: by Age" }
                        label={ ['People'] }
                        switches={ ['horizontalBar', 'bar', 'doughnut'] }>
                        <BuildTable colName={ ['Age', 'OC Population', '% w/ at Least 1 Dose',] } rows={ [...(ageLabels.slice(0, -1))] } columns={ [ageOCPop, agePercent1Dose, ] }  />

                    </Chart>


                    <Chart
                        key="2"
                        id="vaccine2"
                        date={ ["Asian/PI", "Black", "Hispanic", "White", "Other"] }
                        data={ [raceVaxArrayAll] }
                        fill={ [[...raceColors]] }
                        title={ "Persons w/ at Least 1 Dose: by Race" }
                        label={ ["People"] }
                        switches={ ['horizontalBar', 'bar', 'doughnut'] }>
                        <BuildTable colName={ ['Age', 'OC Population', '% w/ at Least 1 Dose'] } rows={ ["Asian/PI", "Black", "Hispanic", "White"] } columns={ [raceOCPop, racePercent1Dose, ] } />
                    </Chart>

                    <Chart
                        key="3"
                        id="vaccine3"
                        date={ ["Moderna", "Pfizer", "Unknown"] }
                        data={ [[moderna, pfizer, unknownTrade]] }
                        fill={ [[color.green, color.blue, color.lightergray]] }
                        title={ "All Doses Administered by Trade" }
                        label={ ["People"] }
                        switches={ ['horizontalBar', 'bar', 'doughnut'] }
                    />
                    <Chart
                        key="4"
                        id="vaccine4"
                        date={ ["Female", "Male", "Other"] }
                        data={ [[female, male, otherSex]] }
                        fill={ [[color.pink, color.blue, color.orange]] }
                        title={ "Persons w/ at Least 1 Dose: by Sex" }
                        label={ ["People"] }
                        switches={ ['horizontalBar', 'bar', 'doughnut'] }
                    />
                </div>

            </Page>

        </div>
    );
}

export default Vaccinations;
