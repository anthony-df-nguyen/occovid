import React, { useState, useContext } from 'react'

const MapMetricSelect = props => {
  const [selectedMetric, updateMetric] = useState(props.current)
  
  function runMetricUpdate(metric, nameofmetric) {
    updateMetric(metric)
    localStorage.setItem('cityZipLastMode', metric)
    localStorage.setItem('cityZipLastModeText', nameofmetric)
    props.function[0](metric)
    props.function[1](nameofmetric)
  }

  return (
    <div id="cityZipMetricUI">
      <div className='uiButtonInstruction'>Select a Metric to View</div>
      <div className='uiParent'>
        <div className='uiButtonContainer'>
         <a
            className={ selectedMetric == 'CaseRate' ? 'active' : null }
            onClick={ () => runMetricUpdate('CaseRate', 'Case Rate') }
          >
            Case Rate
          </a>
           <a
            className={ selectedMetric == 'DeathRate' ? 'active' : null }
            onClick={ () => runMetricUpdate('DeathRate', 'Death Rate') }
          >
            Death Rate
          </a>
          <a
            className={ selectedMetric == 'Tot_Cases' ? 'active' : null }
            onClick={ () => runMetricUpdate('Tot_Cases', 'Total Cases') }
          >
            Cases
          </a>
         
          <a
            className={ selectedMetric == 'Tot_Deaths' ? 'active' : null }
            onClick={ () => runMetricUpdate('Tot_Deaths', 'Deaths') }
          >
            Deaths
          </a>
         
          <a
            className={ selectedMetric == 'Cases_0_3' ? 'active' : null }
            onClick={ () => runMetricUpdate('Cases_0_3', 'Cases Age 0 to 3') }
          >
            Cases 0-3
          </a>
          <a
            className={ selectedMetric == 'Cases_4_9' ? 'active' : null }
            onClick={ () => runMetricUpdate('Cases_4_9', 'Cases Age 4 to 9') }
          >
            Cases 4-9
          </a>
          <a
            className={ selectedMetric == 'Cases_10_12' ? 'active' : null }
            onClick={ () => runMetricUpdate('Cases_10_12', 'Cases Age 10 to 12') }
          >
            Cases 10-12
          </a>
          <a
            className={ selectedMetric == 'Cases_13_14' ? 'active' : null }
            onClick={ () => runMetricUpdate('Cases_13_14', 'Cases Age 13 to 14') }
          >
            Cases 13-14
          </a>
          <a
            className={ selectedMetric == 'Cases_15_18' ? 'active' : null }
            onClick={ () => runMetricUpdate('Cases_15_18', 'Cases 15 to 18') }
          >
            Cases 15-18
          </a>
          <a
            className={ selectedMetric == 'Cases_0_18' ? 'active' : null }
            onClick={ () => runMetricUpdate('Cases_0_18', 'Cases Age 0 to 18') }
          >
            Cases 0-18
          </a>
        </div>
      </div>
    </div>
  )
}

export default MapMetricSelect
