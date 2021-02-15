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


const Vaccinations = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [array,updateArray] = useState([]);
    const [vaccineHisArray, updateVaxArray] = useState([]);
    const [ asof,peopleOneDose,peopleTwoDose,totalPeople,adminOneDose,dminTwoDose,totalAdmin,female,male,otherSex,asianPI,black,hispanic,white,otherRace,age017,age1824,age2534,age3544,age4554,age5564,age6574yrs,age7584,age85,ageUnknown,moderna,pfizer,unknownTrade ] = array;

    return (
      <div>
            <VaccineHistory function={updateVaxArray} time={time} />
           <FetchVaccines function={updateArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            {/* <Widget title={"Total Cases"} stat={Math.max(...(array.map(a => a.totalCasesReported))).toLocaleString()}  
            change={'Yolo'} color={color.red}/> */}

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
                switches={['line','bar']}
                />    
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
