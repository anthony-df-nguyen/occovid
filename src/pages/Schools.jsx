import React, { useState, useContext } from 'react';
import TimeContext from "components/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import FetchSchool from 'components/Datafetch/FetchSchool';
import Chart from 'components/Chart'
import Widget from "components/Widget"
import { Bar, Line } from 'react-chartjs-2';
import { stackedMultiBar, lineDefaults } from "globalVars/chartJSconfig.js";

const Schools = (props) => {
  const { time, setTime } = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  console.log(array)

  const stackedSchoolIndividuals = {
    labels: array.map(a => a.week),
    datasets: [
      {
        type: 'bar',
        label: 'Students',
        data: array.map(a => a.student),
        borderWidth: 1,
        radius: 1,
        order: 1,
        backgroundColor: color.green,
      },
      {
        type: 'bar',
        label: 'Teachers',
        data: array.map(a => a.teacher),
        borderWidth: 2,
        radius: 1,
        order: 2,
        backgroundColor: color.blue,
      },
      {
        type: 'bar',
        label: 'Other Staff',
        data: array.map(a => a.otherstaff),
        borderWidth: 2,
        radius: 1,
        order: 3,
        backgroundColor: color.purple
      }
    ]
  }
  const stackedSchoolSchoolType = {
    labels: array.map(a => a.week),
    datasets: [
      {
        type: 'bar',
        label: 'Elementary',
        data: array.map(a => a.elementary),
        borderWidth: 1,
        radius: 1,
        order: 1,
        backgroundColor: color.blue,
      },
      {
        type: 'bar',
        label: 'High School',
        data: array.map(a => a.highschool),
        borderWidth: 2,
        radius: 1,
        order: 2,
        backgroundColor: color.purple,
      },
      {
        type: 'bar',
        label: 'College/Univ',
        data: array.map(a => a.college),
        borderWidth: 2,
        radius: 1,
        order: 3,
        backgroundColor: color.pink
      },
      {
        type: 'bar',
        label: 'Combined K-12',
        data: array.map(a => a.kto12),
        borderWidth: 2,
        radius: 1,
        order: 4,
        backgroundColor: color.gold
      }
    ]
  }

  let indTotal = 0;
  let totalStudent = 0;
  let totalTeacher = 0;
  let totalOtherStaff = 0;
  let eleTotal = 0;
  let highSchoolTotal = 0;
  let comboTotal = 0;
  let collegeTotal = 0;

  array.forEach((a) => {
    indTotal += parseInt(a.indtotal);
    totalStudent += parseInt(a.student);
    totalTeacher += parseInt(a.teacher);
    totalOtherStaff += parseInt(a.otherstaff);
    eleTotal += parseInt(a.elementary);
    highSchoolTotal += parseInt(a.highschool);
    comboTotal += parseInt(a.kto12);
    collegeTotal += parseInt(a.college);
  });

  let indArray = [totalStudent, totalTeacher, totalOtherStaff];
  let schoolTotalArray = [eleTotal, highSchoolTotal, comboTotal, collegeTotal]

  return (
    <div>
      <FetchSchool function={ updateArray } time={ time } />
      <div className='page'>
        <h1 className='pageTitle'>{ props.title }</h1>
        <div id="chartGrid">
          <Chart
            key="1"
            id="school1"
            date={ ['Student', 'Teacher', 'Other Staff'] }
            data={ [indArray] }
            fill={ [[color.green, color.blue, color.purple]] }
            title={ "Total Cases by Individual" }
            label={ ["Cases"] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          <Chart
            key="2"
            id="school2"
            date={ ['Elementary', 'High School', 'College/Uni', 'Combined K-12'] }
            data={ [schoolTotalArray] }
            fill={ [[color.blue, color.purple, color.pink, color.gold]] }
            title={ "Total Cases by School Type" }
            label={ ["Cases"] }
            switches={ ['horizontalBar', 'bar', 'doughnut'] }
          />
          {/* Manual Creation of Special Chart Types */ }
          <div className="chartContainer">
            <div className="chartTitle">Cases by Individual Type</div>
            <Bar key="3" data={ stackedSchoolIndividuals } options={ stackedMultiBar } />
          </div>
          <div className="chartContainer">
            <div className="chartTitle">Cases by School Type</div>
            <Bar key="4" data={ stackedSchoolSchoolType } options={ stackedMultiBar } />
          </div>



        </div>
      </div>
    </div>
  );
}

export default Schools;
