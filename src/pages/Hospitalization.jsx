import React, {useState, useContext} from 'react';
import TimeContext from "components/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import { FetchHospitals } from 'components/Datafetch/FetchHospitals'
import { FetchHosTriggers } from 'components/Datafetch/FetchHosTriggers'
import Chart from 'components/Chart'
import Widget from "components/Widget"

const Hospitalization = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [array,updateArray] = useState([]);
    const [triggerArray,updateTrigger] = useState([])
    let hosRateChangeArray = [];
    let icuArray = []
    let ventsArray = [];
    let bedsAdjArray = [];
    let bedUnajdArray = [];
    let hospitalized = [];

   array.filter(a => {
       if (a.hospital) {
           hospitalized.push(a.hospital)
       }
       if (a.icu) {
        icuArray.push(a.icu)
    }
   });
   triggerArray.filter(a => {
    if (a.ventsAvail) {
        ventsArray.push(a.ventsAvail)
    }
    if (a.bedsAvailAdj) {
        bedsAdjArray.push(a.bedsAvailAdj)
    }
    if (a.bedAvailUnaAdj) {
        bedUnajdArray.push(a.bedAvailUnaAdj)
    }
    if (a.hospitalChange) {
        hosRateChangeArray.push(a.hospitalChange)
    }
});
   
   
   let lastHosRateChange = hosRateChangeArray.slice(-1);
   let lastVentsAvailable = ventsArray.slice(-1);
   let lastBedsAdj = bedsAdjArray.slice(-1);
   let lastBedsUnadj = bedUnajdArray.slice(-1);
   let lastHospital = hospitalized.slice(-1);
   let lastICU = icuArray.slice(-1);

    return (
      <div>
           <FetchHosTriggers function={updateTrigger} time={time}/>
           <FetchHospitals function={updateArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            <Widget title={"Hospitalized"} stat={parseInt(lastHospital).toLocaleString()}  
             color={color.yellow}/>
            <Widget title={"ICU"} stat={parseInt(lastICU).toLocaleString()}  
             color={color.red}/>
            <Widget title={"Change in 3 Day Avg"} stat={lastHosRateChange}  
             color={color.purple}/>
            <Widget title={"Vents Available"} stat={lastVentsAvailable + "%"}  
             color={color.blue}/>
            <Widget title={"Bed Avail. Adjusted"} stat={lastBedsAdj}  
             color={color.red}/>
            <Widget title={"Beds Avail. Unadjusted"} stat={lastBedsUnadj}  
             color={color.red}/>
           </div>
           <Timeselect  />
            <div id="chartGrid">
             <Chart 
                key="1" 
                id="hospital1"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.hospital), array.map(b => b.icu), array.map(b => b.hos7Avg)]} 
                fill={[color.yellow,color.red,color.blue]} 
                title={"Hospitalized"}
                label={["Hospitalized","ICU","7 Day Avg"]}
                switches={['bar','line']}
                />         
            <Chart 
                key="2" 
                id="hospital2"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.hosChange), array.map(b => b.dailyHosAvg)]} 
                fill={[color.yellow,color.blue]} 
                title={"Change in Hospitalization"}
                label={["Hospitalized","7 Day Avg"]}
                switches={['bar','line']}
                />   
            <Chart 
                key="3" 
                id="hospital3"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.icuChange),  array.map(b => b.dailyICUAvg)]} 
                fill={[color.red,color.blue]} 
                title={"Change in ICU"}
                label={["ICU","7 Day Avg"]}
                switches={['bar','line']}
            />   
            <Chart 
                key="4" 
                id="hospital4"
                date={array.map(a => a.date)} 
                data={[triggerArray.map(b => b.ventsAvail)]} 
                fill={[color.red]} 
                title={"% Ventilators Available"}
                label={["Vents Available"]}
                switches={['bar','line']}
            />   
            <Chart 
                key="5" 
                id="hospital5"
                date={triggerArray.map(a => a.date)} 
                data={[triggerArray.map(b => b.bedsAvailAdj)]} 
                fill={[color.orange]} 
                title={"Beds Available Adjusted"}
                label={["Beds"]}
                switches={['bar','line']}
            />   
            <Chart 
                key="6" 
                id="hospital6"
                date={triggerArray.map(a => a.date)} 
                data={[triggerArray.map(b => b.bedAvailUnaAdj)]} 
                fill={[color.orange]} 
                title={"Beds Available Unadjusted"}
                label={["Beds"]}
                switches={['bar','line']}
            />    
            </div>
       </div>
      </div>
    );
}

export default Hospitalization;