import React, {useState, useContext} from 'react';
import TimeContext from "components/TimeContext";
import color from 'components/Colors'
import Timeselect from 'components/Timeselect';
import { FetchCases } from 'components/Datafetch/FetchCases'
import Chart from 'components/Chart'
import Widget from "components/Widget"

const Cases = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [array,updateArray] = useState([]);
 
    return (
      <div>
           <FetchCases function={updateArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            <Widget title={"Total Cases"} stat={Math.max(...(array.map(a => a.totalCasesReported))).toLocaleString()}  
            change={'Yolo'} color={color.red}/>
            <Widget title={"Daily Reported"} stat={Math.max(...(array.map(a => a.dailyCasesReported))).toLocaleString()}  
            change={'Yolo'} color={color.red}/>
            <Widget title={"Recovered"} stat={Math.max(...(array.map(a => a.recovered))).toLocaleString()}  
            change={'Yolo'} color={color.blue}/>
             <Widget title={"Homeless Cases"} stat={Math.max(...(array.map(a => a.homelessCases))).toLocaleString()}  
            change={'Yolo'} color={color.purple}/>
            <Widget title={"Jail Cases"} stat={Math.max(...(array.map(a => a.jailCases))).toLocaleString()}  
            change={'Yolo'} color={color.yellow}/>
            <Widget title={"SNF Cases"} stat={Math.max(...(array.map(a => a.snfCases))).toLocaleString()}  
            change={'Yolo'} color={color.orange}/>
           </div>
           <Timeselect  />
            <div id="chartGrid">
            <Chart
                key="2" 
                id="case2"
                //type="bar" 
                date={array.map(a => a.date)} 
                data={[array.map(b => b.totalCasesbySpecimen),array.map(b => b.recovered)]} 
                fill={[color.red,color.blue]}
                title={"Total Cases by Specimen Collection"}
                label={["Cases","Estimated Recovered"]}
              />
              <Chart
                key="3" 
                id="case3"
                //type="bar" 
                date={array.map(a => a.date)} 
                data={[array.map(b => b.dailyCasesbySpecimen),array.map(b => b.daily7DayAvg)]} 
                fill={[color.red,color.blue]}
                title={"Daily Cases by Specimen Collection Date"}
                label={["Cases","7 Day Avg"]}
              />
             <Chart 
                key="1" 
                id="case1"
                //type={()=> findLastSetting("case1")} 
                date={array.map(a => a.date)} 
                data={[array.map(b => b.dailyCasesReported)]} 
                fill={[color.red]} 
                title={"Daily Cases Reported"}
                label={["Daily Cases Reported"]}
                />         
              <Chart 
                key="4" 
                id="case4"
                date={array.map(a => a.date)} 
                data={[array.map(b => b.homelessCases)]} 
                fill={[color.purple]} 
                title={"Homeless Cases"}
                label={["Cases"]}
                />    
              <Chart 
                key="5" 
                id="case5" 
                date={array.map(a => a.date)} 
                data={[array.map(b => b.snfCases)]} 
                fill={[color.orange]} 
                title={"SNF Cases"}
                label={["Cases"]}
                /> 
              <Chart 
                key="6" 
                id="case5" 
                date={array.map(a => a.date)} 
                data={[array.map(b => b.jailCases)]} 
                fill={[color.yellow]} 
                title={"Jail Cases"}
                label={["Cases"]}
                /> 

            </div>
       </div>
      </div>
    );
}

export default Cases;
