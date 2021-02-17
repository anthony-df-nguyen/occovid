import React, { useState } from 'react'
import { Bar, Doughnut, Line, HorizontalBar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'globalVars/chartJSconfig.js'
import {
  barDefaults,
  lineDefaults,
  piedefaults,
  Oneobject,
  Twoobject7DayAverage,
  Threeobject7DayAverage
} from 'globalVars/chartJSconfig.js'
import Chartselect from 'components/Chartselect'

const Chart = props => {
  //Set initial state to saved memory
  const [currentType, updateType] = useState(() => {
    if (props.switches.length > 1) {
      if (!localStorage.getItem(props.id)) {
        return 'bar'
      } else {
        return localStorage.getItem(props.id)
      }
    } else {
      return props.switches[0]
    }
  })

  let dataObject

  //Create Data Object
  switch (props.data.length) {
    case 1:
      dataObject = new Oneobject(
        props.date,
        props.label[0],
        props.data[0],
        props.fill[0]
      )
      break
    case 2:
      dataObject = new Twoobject7DayAverage(
        props.date,
        props.label[0],
        props.data[0],
        props.fill[0],
        props.label[1],
        props.data[1],
        props.fill[1]
      )
      break
    case 3:
      dataObject = new Threeobject7DayAverage(
        props.date,
        props.label[0],
        props.data[0],
        props.fill[0],
        props.label[1],
        props.data[1],
        props.fill[1],
        props.label[2],
        props.data[2],
        props.fill[2]
      )
      break
    default:
      dataObject = new Oneobject(
        props.date,
        props.label,
        props.data[0],
        props.fill[0]
      )
      break
  }

  //Render the Type of Chart Based on Type
  function renderChart(currentType) {
    switch (currentType) {
      case 'bar':
        return <Bar data={ dataObject } options={ barDefaults } />
        break
      case 'line':
        return <Line data={ dataObject } options={ lineDefaults } />
        break
      case 'doughnut':
        return <Doughnut data={ dataObject } options={ piedefaults } />
        break
      case 'horizontalBar':
        return <HorizontalBar data={ dataObject } options={ barDefaults } />
        break
      default:
        return <Bar data={ dataObject } options={ barDefaults } />
        break
    }
  }
  return (
    <div className='chartContainer'>
      <div className='chartTitle'>{ props.title }</div>
      <Chartselect type={ props.switches } passdown={ updateType } id={ props.id } />
      {renderChart(currentType) }
    </div>
  )
}

export default Chart
