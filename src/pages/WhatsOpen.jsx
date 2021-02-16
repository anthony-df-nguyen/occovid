import React, { useState, useContext } from 'react';
import TimeContext from "components/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import FetchSchool from 'components/Datafetch/FetchSchool';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import { Bar, Line } from 'react-chartjs-2';
import { stackedMultiBar, lineDefaults } from "globalVars/chartJSconfig.js";

const WhatsOpen = (props) => {
    return (
        <div>
            <div className='page'>
                <h1 className='pageTitle'>{ props.title }</h1>
            </div>
        </div>
    )
}

export default WhatsOpen;
