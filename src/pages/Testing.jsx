import React, {useState, useContext} from 'react';
import TimeContext from "components/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import { FetchTesting } from 'components/Datafetch/FetchTesting'
import { FetchHosTriggers } from 'components/Datafetch/FetchHosTriggers'
import Chart from 'components/Chart'
import Widget from "components/Widget"

const Testing = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [array,updateArray] = useState([]);
    const [hosArray,updateHosArray] = useState([])


   //Get Last Numbers Received
   let totalPCRArray = []; 
   let dailyRec = []
   array.filter(a => {
       if (a.daily_test_repo) {
            dailyRec.push( a.daily_test_repo)
       }
       if (a.tot_spec) {
        totalPCRArray.push(a.tot_spec) 
        }
   });
   let testPosArray = [];
   
   hosArray.filter(a => {
       if (a.testPos) {
        testPosArray.push( a.testPos)
       }
   });
 

    return (
      <div>
           <FetchTesting function={updateArray} time={time}/>
           <FetchHosTriggers function={updateHosArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            <Widget title={"Total PCR Tests"} stat={parseInt(totalPCRArray.slice(-1)).toLocaleString()}  
                color={color.blue}/>
            <Widget title={"Daily Tests Received"} stat={parseInt(dailyRec.slice(-1)).toLocaleString()}  
                color={color.green}/>
            <Widget title={"Test Positivity %"} stat={parseInt(testPosArray.slice(-1)).toLocaleString()}  
            color={color.red}/>
        
           </div>
           <Timeselect  />
            <div id="chartGrid">
           
            <Chart 
                key="1" 
                id="test1"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.cumuTestbySpec)]} 
                fill={[color.blue]} 
                title={"Cumulative PCR Tests by Specimen Collection Date"}
                label={["Tests"]}
                switches={['bar','line']}
            />   
             <Chart 
                key="4" 
                id="test4"
                date={hosArray.map(a => a.date)} 
                data={[hosArray.map(b => b.testPos),hosArray.map(b => b.pos7Avg)]} 
                fill={[color.yellow,color.blue]} 
                title={"Testing Positivity Percent"}
                label={["Positive %","7 Day Avg"]}
                switches={['bar','line']}
            />         
            <Chart 
                key="2" 
                id="test2"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.daily_test_repo)]} 
                fill={[color.green]} 
                title={"Daily Tests Reported"}
                label={["Tests"]}
                switches={['bar','line']}
            />   
            <Chart 
                key="3" 
                id="test3"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.daily_pos_spec)]} 
                fill={[color.red]} 
                title={"Daily Positive Tests Reported"}
                label={["Tests"]}
                switches={['bar','line']}
            />
            <Chart 
                key="5" 
                id="test5"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.daily_spec)]} 
                fill={[color.red]} 
                title={"Daily Specimens"}
                label={["Tests"]}
                switches={['bar','line']}
            />      

            </div>
       </div>
      </div>
    );
}

export default Testing;