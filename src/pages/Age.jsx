import React, {useState, useContext} from 'react';

import color from 'globalVars/Colors'
import { FetchCaseDemo } from 'components/Datafetch/FetchCaseDemo';
import { FetchDeathDemo } from 'components/Datafetch/FetchDeathDemo';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import {ageLabels, ageColors } from "globalVars/chartJSconfig";
import { ocpop } from 'globalVars/populations';

const Age = (props) => {   
    //const {time,setTime} =  useContext(TimeContext);
    const [ageCase,updateAgeCaseArray] = useState([]);
    const [ageDeath,updateAgeDeathArray] = useState([])
    console.log(ageDeath)
    const ageCaseArray = [ageCase.case_0_17,ageCase.case_18_24,ageCase.case_25_34,ageCase.case_35_44,ageCase.case_45_54,  ageCase.case_55_64,  ageCase.case_65_74, ageCase.case_75_84,ageCase.Case_85,ageCase.case_unk_age]

    const ageDeathArray = [ageDeath.dth_0_17, ageDeath.dth_18_24, ageDeath.dth_25_34,ageDeath.dth_35_44,ageDeath.dth_45_54,ageDeath.dth_55_64,ageDeath.dth_65_74,ageDeath.dth_75_84,ageDeath.dth_85,ageDeath.dth_unk_age];
   
    const fatalityArray = ageDeathArray.map((a,i) => {
        return parseFloat((a / ageCaseArray[i])*100).toFixed(1)
    })

    return (
      <div>
           <FetchCaseDemo function={updateAgeCaseArray} />
           <FetchDeathDemo function={updateAgeDeathArray} />
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            {/* <Widget title={"OC Population"} stat={ocpop.toLocaleString()}  
            color={color.blue}/> */}
   

           </div>
           
            <div id="chartGrid">
                <Chart 
                        key="1" 
                        id="age1"
                        date={[...ageLabels]} 
                        data={[ageCaseArray]} 
                        fill={[...[ageColors]]} 
                        title={"Total Cases by Age Group"}
                        label={["Cases"]}
                        switches={['horizontalBar','bar','doughnut']}
                />   
                 <Chart 
                        key="2" 
                        id="age2"
                        date={[...ageLabels]} 
                        data={[ageDeathArray]} 
                        fill={[...[ageColors]]} 
                        title={"Total Deaths by Age Group"}
                        label={["Deaths"]}
                        switches={['horizontalBar','bar','doughnut']}
                />   
                <Chart 
                        key="3" 
                        id="age3"
                        date={[...ageLabels]} 
                        data={[fatalityArray]} 
                        fill={[...[ageColors]]} 
                        title={"Case Fatality per Age Group"}
                        label={["Fatality Rate"]}
                        switches={['horizontalBar','bar']}
                />   

                
            </div>
       </div>
      </div>
    );
}

export default Age;
