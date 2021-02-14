import React, { useState, useEffect, useContext } from 'react'

import color from 'components/Colors'
import Chartselect from 'components/Chartselect'
import Timeselect from 'components/Timeselect'
import TimeContext from "components/TimeContext";

const Home = (props) => {
    const {time,setTime} =  useContext(TimeContext);
    

  return (
    <div className='page'>
      <h1 className='pageTitle'>{props.title}</h1>
      <h2>The time is {time}</h2>
        <Timeselect  />
        {/* {workingCaseArray.map((a)=>{
          return <p>{a.date}</p>
          })} */}
    </div>
  )
}

export default Home
