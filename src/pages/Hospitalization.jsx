import React, {useState, useContext} from 'react';
import TimeContext from "components/TimeContext";
import color from 'components/Colors'
import Timeselect from 'components/Timeselect';
import { FetchHospitals } from 'components/Datafetch/FetchHospitals'
import { FetchHosTriggers } from 'components/Datafetch/FetchHosTriggers'
import Chart from 'components/Chart'
import Widget from "components/Widget"

const Hospitalization = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [array,updateArray] = useState([]);
    const [triggerArray,updateTrigger] = useState([])
    console.log("file: Hospitalization.jsx ~ line 14 ~ Hospitalization ~ triggerArray", triggerArray)

   let hosRateChangeArray = triggerArray.map(a => a.hospitalChange);
   let lastHosRateChange = hosRateChangeArray[hosRateChangeArray.length - 1];

   let ventsArray = triggerArray.map(a => a.ventsAvail);
   let lastVentsAvailable = ventsArray[ventsArray.length - 1];

   let bedsAdjArray = triggerArray.map(a => a.bedsAvailAdj)
   let lastBedsAdj = bedsAdjArray[bedsAdjArray.length - 1];

   let bedUnajdArray = triggerArray.map(a => a.bedAvailUnaAdj) 
   let lastBedsUnadj = bedUnajdArray[bedUnajdArray.length - 1];

    return (
      <div>
           <FetchHosTriggers function={updateTrigger} time={time}/>
           <FetchHospitals function={updateArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            <Widget title={"Hospitalized"} stat={Math.max(...(array.map(a => a.hospital))).toLocaleString()}  
             color={color.yellow}/>
            <Widget title={"ICU"} stat={Math.max(...(array.map(a => a.icu))).toLocaleString()}  
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
