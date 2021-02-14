import { getByTitle } from '@testing-library/dom'

let chartpadding = [{ top: 0, right: 0, left: 0 }]
if (window.screen.width > 500) {
  chartpadding = { top: 16, right: 16, left: 16 }
}

const dataLabels = {
  anchor: 'end',
  align: 'end',
  offset: 2,
  color: function () {
    if (localStorage.getItem('theme') == 'Dark') {
      return '#d9d9d9'
    } else {
      return '#999'
    }
  },
  display: function display (context) {
    if (context.chart.width > 500) {
      return 'auto'
    } else {
      return false
    }
  }
}

const showLegend = {
  display: true,
  position: 'bottom',
  align: 'center',
  labels: { boxWidth: 20, fontColor: '#999' }
}

const barDefaults = {
  plugins: {
    datalabels: dataLabels
  },
  legend: showLegend,
  layout: {
    padding: chartpadding
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: '#999999',
          suggestedmin: 0,
          beginAtZero: true
        }
      }
    ],
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#999999'
        }
      }
    ]
  },
  tooltips: {
    mode: 'index',
    axis: 'y'
  }
}
const lineDefaults = {
  radius: 0,
  plugins: {
    datalabels: dataLabels
  },
  legend: showLegend,
  layout: {
    padding: chartpadding
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: '#999999',
          suggestedmin: 0,
          beginAtZero: true
        }
      }
    ],
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#999999'
        }
      }
    ]
  },
  tooltips: {
    mode: 'index',
    axis: 'y'
  }
}

const datasetKeyProvider = () => {
  return btoa(Math.random()).substring(0, 12)
}

class Oneobject {
  constructor (labels, data1label, data1, data1color) {
    this.labels = labels
    this.datasets = [
      {
        label: data1label,
        data: data1,
        borderWidth: 1,
        order: 2,
        backgroundColor: data1color
      }
    ]
  }
}

class Twoobject7DayAverage {
  constructor (
    labels,
    data1label,
    data1,
    data1color,
    data2label,
    data2,
    data2color
  ) {
    this.labels = labels
    this.datasets = [
      {
        label: data1label,
        data: data1,
        borderWidth: 1,
        radius: 1,
        order: 2,
        backgroundColor: data1color
      },
      {
        type: 'line',
        label: data2label,
        data: data2,
        borderWidth: 2,
        radius: 1,
        order: 1,
        borderColor: data2color,
        backgroundColor: 'transparent'
      }
    ]
  }
}

class Threeobject7DayAverage {
  constructor (
    labels,
    data1label,
    data1,
    data1color,
    data2label,
    data2,
    data2color,
    data3label,
    data3,
    data3color
  ) {
    this.labels = labels
    this.datasets = [
      {
        label: data1label,
        data: data1,
        borderWidth: 1,
        radius: 1,
        order: 2,
        backgroundColor: data1color
      },
      {
        label: data2label,
        data: data2,
        borderWidth: 2,
        radius: 1,
        order: 1,
        borderColor: data2color,
        backgroundColor: data2color
      },
      {
        type: 'line',
        label: data3label,
        data: data3,
        borderWidth: 2,
        radius: 1,
        order: 1,
        borderColor: data3color,
        backgroundColor: 'transparent'
      }
    ]
  }
}

export {
  barDefaults,
  lineDefaults,
  datasetKeyProvider,
  Oneobject,
  Twoobject7DayAverage,
  Threeobject7DayAverage
}
