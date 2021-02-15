import React, {useState, useContext} from 'react';
import color from 'globalVars/Colors'
import { FetchCaseDemo } from 'components/Datafetch/FetchCaseDemo';
import { FetchDeathDemo } from 'components/Datafetch/FetchDeathDemo';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import {ageLabels, ageColors } from "globalVars/chartJSconfig";
import { ocpop } from 'globalVars/populations';

const Gender = (props) => {   
    //const {time,setTime} =  useContext(TimeContext);
    const [genderCase,updategenderCaseArray] = useState([]);
    const [genderDeath,updategenderDeathArray] = useState([])
    console.log(genderDeath)
    
    const genderLabels = ['Female','Male','Other','Unknown'];
    const genderColors = [color.pink,color.blue,color.orange,color.gray];
    const genderCaseArray = [genderCase.case_female,genderCase.case_male,genderCase.case_oth_sex,genderCase.case_unk_sex]
    const genderDeathArray = [genderDeath.dth_female, genderDeath.dth_male, genderDeath.dth_oth_sex,genderDeath.dth_unk_sex]
   

    const fatalityArray = genderDeathArray.map((a,i) => {
        return parseFloat((a / genderCaseArray[i])*100).toFixed(1)
    })

    return (
      <div>
           <FetchCaseDemo function={updategenderCaseArray} />
           <FetchDeathDemo function={updategenderDeathArray} />
           <div className='page'>
           <h1 className='pageTitle'>{props.title}</h1>
           <div className="widgetGrid">
            {/* <Widget title={"OC Population"} stat={ocpop.toLocaleString()}  
            color={color.blue}/> */}
   

           </div>
           
            <div id="chartGrid">
                <Chart 
                        key="1" 
                        id="gender1"
                        date={[...genderLabels]} 
                        data={[genderCaseArray]} 
                        fill={[...[genderColors]]} 
                        title={"Total Cases by Sex/Gender"}
                        label={["Cases"]}
                        switches={['horizontalBar','bar','doughnut']}
                />   
                 <Chart 
                        key="2" 
                        id="gender2"
                        date={[...genderLabels]} 
                        data={[genderDeathArray]} 
                        fill={[...[genderColors]]} 
                        title={"Total Deaths by Sex/Gender"}
                        label={["Deaths"]}
                        switches={['horizontalBar','bar','doughnut']}
                />   
                <Chart 
                        key="3" 
                        id="gender3"
                        date={[...genderLabels]} 
                        data={[fatalityArray]} 
                        fill={[...[genderColors]]} 
                        title={"Case Fatality per Sex/Gender"}
                        label={["Fatality Rate"]}
                        switches={['horizontalBar','bar']}
                />   

                
            </div>
       </div>
      </div>
    );
}

export default Gender;