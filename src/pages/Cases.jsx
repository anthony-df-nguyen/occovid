import React, {useState, useContext} from 'react';
import TimeContext from "components/TimeContext";
import color from 'components/Colors'
//import Chartselect from 'components/Chartselect'
import Timeselect from 'components/Timeselect';
import { FetchCases } from 'components/Datafetch/FetchCases'
import Chart from 'components/Chart'

const Cases = (props) => {   
    const {time,setTime} =  useContext(TimeContext);
    const [caseArray,updateCaseArray] = useState([]);

    return (
      <div>
           <FetchCases function={updateCaseArray} time={time}/>
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <Timeselect  />
           <h2>The time is {time}</h2>
            <div id="chartGrid">
             <Chart 
                key="1" 
                type="bar" 
                date={caseArray.map(a => a.date)} 
                data={[caseArray.map(b => b.dailyCasesReported)]} 
                fill={[color.red]} 
                title={"Daily Cases Reported"}
                label="Daily Cases Reported"
                />
                
             <Chart
                key="2" 
                type="bar" 
                date={caseArray.map(a => a.date)} 
                data={[caseArray.map(b => b.recovered)]} 
                fill={[color.blue]}
                title={"Recovered"}
                label="Estimated Recovered"
              />
              <Chart
                key="3" 
                type="bar" 
                date={caseArray.map(a => a.date)} 
                data={[caseArray.map(b => b.totalCasesbySpecimen)]} 
                fill={[color.orange]}
                title={"Total Cases by Specimen Collection"}
                label="Cases"
              />
            </div>
       </div>
      </div>
    );
}

export default Cases;
