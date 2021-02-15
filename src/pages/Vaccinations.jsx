import React, {useState, useContext} from 'react';
import TimeContext from "components/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import { FetchVaccines } from 'components/Datafetch/FetchVaccines';
import VaccineHistory from 'components/Datafetch/VaccineHistory.jsx';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import {ageLabels, ageColors, raceColors, raceLabels} from "globalVars/chartJSconfig";
import { Pie } from 'react-chartjs-2';
import { ocpop } from 'globalVars/populations';

const Vaccinations = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [array,updateArray] = useState([]);
    const [vaccineHisArray, updateVaxArray] = useState([]);
    const [ asof,peopleOneDose,peopleTwoDose,totalPeople,adminOneDose,adminTwoDose,totalAdmin,female,male,otherSex,asianPI,black,hispanic,white,otherRace,age017,age1824,age2534,age3544,age4554,age5564,age6574yrs,age7584,age85,ageUnknown,moderna,pfizer,unknownTrade ] = array;

    const totalPPL = parseInt(totalPeople);
    const totallPPLPerc = parseFloat((totalPPL/ocpop)*100).toFixed(1)

    return (
      <div>
           <VaccineHistory function={updateVaxArray} time={time} />
           <FetchVaccines function={updateArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            <Widget title={"OC Population"} stat={ocpop.toLocaleString()}  
            color={color.blue}/>
            <Widget title={"Total People Vaccinated"} stat={`${totalPPL.toLocaleString()} | ${totallPPLPerc}%`}  
            color={color.green}/>
            <Widget title={"People: 1st Dose Only"} stat={parseInt(peopleOneDose).toLocaleString()}  
            color={color.green}/>
            <Widget title={"People: 1st & 2nd Dose"} stat={parseInt(peopleTwoDose).toLocaleString()}  
            color={color.green}/>
            <Widget title={"Total Administered"} stat={parseInt(totalAdmin).toLocaleString()}  
            color={color.purple}/>
            <Widget title={"1st Dose Administered"} stat={parseInt(adminOneDose).toLocaleString()}  
            color={color.purple}/>
            <Widget title={"2nd Dose Administered"} stat={parseInt(adminTwoDose).toLocaleString()}  
            color={color.purple}/>

           </div>
           <Timeselect  />
            <div id="chartGrid">
                <Chart 
                    key="5" 
                    id="vaccinehis"
                    date={vaccineHisArray.map(a=>a.date)} 
                    data={[vaccineHisArray.map(a=>a.vax),vaccineHisArray.map(a=>a.vax7Avg)]} 
                    fill={[color.green,color.blue]} 
                    title={"Daily Doses Administered"}
                    label={["Doses","7 Day Avg"]}
                    switches={['line','bar']}>Hi 
                    
                    </Chart>  
                <Chart 
                    key="1" 
                    id="vaccine1"
                    date={[...ageLabels]} 
                    data={[[age017,age1824,age2534,age3544,age4554,age5564,age6574yrs,age7584,age85,ageUnknown]]} 
                    fill={[[...ageColors]]} 
                    title={"Persons w/ at Least 1 Dose: by Age"}
                    label={["People"]}
                    switches={['horizontalBar','bar','doughnut']}
                    />         
                <Chart 
                    key="2" 
                    id="vaccine2"
                    date={["Asian/PI","Black","Hispanic","White","Other"]} 
                    data={[[asianPI,black,hispanic,white,otherRace]]} 
                    fill={[[...raceColors]]} 
                    title={"Persons w/ at Least 1 Dose: by Race"}
                    label={["People"]}
                    switches={['horizontalBar','bar','doughnut']}
                />  
                <Chart 
                    key="3" 
                    id="vaccine3"
                    date={["Moderna","Pfizer", "Unknown"]} 
                    data={[[moderna,pfizer,unknownTrade]]} 
                    fill={[[color.green,color.blue,color.lightgray]]} 
                    title={"Persons w/ at Least 1 Dose: by Trade"}
                    label={["People"]}
                    switches={['horizontalBar','bar','doughnut']}
                />          
                <Chart 
                    key="4" 
                    id="vaccine4"
                    date={["Female","Male", "Other"]} 
                    data={[[female,male,otherSex]]} 
                    fill={[[color.pink,color.blue,color.orange]]} 
                    title={"Persons w/ at Least 1 Dose: by Sex"}
                    label={["People"]}
                    switches={['horizontalBar','bar','doughnut']}
                />         
            </div>
       </div>
      </div>
    );
}

export default Vaccinations;