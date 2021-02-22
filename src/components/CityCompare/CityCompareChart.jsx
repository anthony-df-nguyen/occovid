import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { chartpadding } from 'globalVars/chartJSconfig.js'


const CityCompareChart = props => {
    //Set initial state to saved memory
    function buildDataSetPartial(i) {
        return (
            {
                label: props.label[i] ? props.label[i] : `No City ${i + 1} Picked`,
                data: props.data[i],
                borderWidth: 1,
                radius: 1,
                order: [i + 1],
                backgroundColor: props.fill[i] + '15',
                borderColor: props.fill[i],
            }
        )
    }

    let theDataSet = props.data.map((row, y) => {
        return buildDataSetPartial(y)
    })

    let dataObject = {
        labels: props.date,
        datasets: theDataSet,
    }
    
    let options = {
        legend: {
            display: true,
            position: 'bottom',
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: chartpadding,
        },
        plugins: {
            datalabels: false,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        fontColor: '#999999',
                        suggestedmin: 0,
                        beginAtZero: true
                    },
                }
            ],
        },
        tooltips: {
            mode: 'index',
            axis: 'y'
        },
    }



    return (
        <div className='chartContainer' id={ props.id } >
            <div className='chartTitle'>{ props.title }</div>
       
            <Line data={ dataObject } options={ options } />
            {props.children }
            
        </div>
    )
}

export default CityCompareChart
