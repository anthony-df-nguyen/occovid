import React, { useState, useContext } from 'react'

const CityZipMetricSelect = props => {
  const [selectedMetric, updateMetric] = useState(props.current)

  function runMetricUpdate (metric) {
    updateMetric(metric)
    props.function(metric)
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <div className='timeFilterTitle'>Select a Metric to View</div>
      <div className='timeParent'>
        <div className='timeButtonContainer'>
          <a
            className={selectedMetric == 'totalCases' ? 'active' : null}
            onClick={() => runMetricUpdate('totalCases')}
          >
            Cases
          </a>
          <a
            className={selectedMetric == 'caseRate' ? 'active' : null}
            onClick={() => runMetricUpdate('caseRate')}
          >
            Case Rate
          </a>
          <a
            className={selectedMetric == 'totalDeaths' ? 'active' : null}
            onClick={() => runMetricUpdate('totalDeaths')}
          >
            Deaths
          </a>
          <a
            className={selectedMetric == 'deathRate' ? 'active' : null}
            onClick={() => runMetricUpdate('deathRate')}
          >
            Death Rate
          </a>
          <a
            className={selectedMetric == 'Cases_0_3' ? 'active' : null}
            onClick={() => runMetricUpdate('Cases_0_3')}
          >
            Cases 0-3
          </a>
          <a
            className={selectedMetric == 'Cases_4_9' ? 'active' : null}
            onClick={() => runMetricUpdate('Cases_4_9')}
          >
            Cases 4-9
          </a>
          <a
            className={selectedMetric == 'Cases_10_12' ? 'active' : null}
            onClick={() => runMetricUpdate('Cases_10_12')}
          >
            Cases 10-12
          </a>
          <a
            className={selectedMetric == 'Cases_13_14' ? 'active' : null}
            onClick={() => runMetricUpdate('Cases_13_14')}
          >
            Cases 13-14
          </a>
          <a
            className={selectedMetric == 'Cases_15_18' ? 'active' : null}
            onClick={() => runMetricUpdate('Cases_15_18')}
          >
            Cases 15-18
          </a>
          <a
            className={selectedMetric == 'Cases_0_18' ? 'active' : null}
            onClick={() => runMetricUpdate('Cases_0_18')}
          >
            Cases 0-18
          </a>
        </div>
      </div>
    </div>
  )
}

export default CityZipMetricSelect
