import React, { useState, useContext } from 'react'

const CompareCountyMode = props => {
    const [selectedMetric, updateMetric] = useState(props.current)

    function runMetricUpdate(metric) {
        localStorage.setItem('countyCompareLastMode', metric)
        updateMetric(metric)
        props.function(metric)
    }

    return (
        <div id="cityZipMetricUI">
            <div className='timeFilterTitle'>Select a Metric to View</div>
            <div className='timeParent'>
                <div className='timeButtonContainer'>
                    <a
                        className={ selectedMetric == 'Cases per 100K' ? 'active' : null }
                        onClick={ () => runMetricUpdate('Cases per 100K') }
                    >
                        Cases/100k
                    </a>
                    <a
                        className={ selectedMetric == 'Deaths per 100k' ? 'active' : null }
                        onClick={ () => runMetricUpdate('Deaths per 100k') }
                    >
                        Deaths/100k
                    </a>
                    <a
                        className={ selectedMetric == 'Cases' ? 'active' : null }
                        onClick={ () => runMetricUpdate('Cases') }
                    >
                        Cases
                    </a>
                    <a
                        className={ selectedMetric == 'Deaths' ? 'active' : null }
                        onClick={ () => runMetricUpdate('Deaths') }
                    >
                        Deaths
                    </a>
                
                    {/* <a
                        className={ selectedMetric == 'Hospitalized' ? 'active' : null }
                        onClick={ () => runMetricUpdate('Hospitalized') }
                    >
                        Hospitalized
                    </a>
                
                  
                    <a
                        className={ selectedMetric == 'Hospitalized per 100k' ? 'active' : null }
                        onClick={ () => runMetricUpdate('Hospitalized per 100k') }
                    >
                        Hospitalized per 100k
                    </a> */}
 
                   

                </div>
            </div>
        </div>
    )
}

export default CompareCountyMode
