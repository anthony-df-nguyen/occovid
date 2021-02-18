import { getByTitle } from '@testing-library/dom'

let chartpadding = [{ top: 0, right: 0, left: 0 }]
if (window.screen.width > 1366) {
  chartpadding = { top: 16, right: 16, left: 16 }
}

function responsivePieLegend() {
  if (window.screen.width > 768) {
    return 'right'
  } else {
    return 'bottom'
  }
}



const dataLabels = {
  anchor: 'end',
  align: 'end',
  offset: 0,
  color: '#999999',
  display: function display(context) {
    if (context.chart.width > 600) {
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
        },
      }
    ],
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#999999'
        },

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
  constructor(labels, data1label, data1, data1color) {
    this.labels = labels
    this.datasets = [
      {
        label: data1label,
        data: data1,
        borderWidth: 0,
        order: 2,
        backgroundColor: data1color
      }
    ]
  }
}

class Twoobject7DayAverage {
  constructor(
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
        borderWidth: 0,
        radius: 1,
        order: 2,
        backgroundColor: data1color,
      },
      {
        type: 'line',
        label: data2label,
        data: data2,
        borderWidth: 2,
        radius: 1,
        order: 1,
        borderColor: data2color,
        backgroundColor: 'transparent',
        datalabels: {
          display: false,
        },
      }
    ]
  }
}

class Threeobject7DayAverage {
  constructor(
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
        backgroundColor: data2color,
        datalabels: {
          display: false,
        },
      },
      {
        type: 'line',
        label: data3label,
        data: data3,
        borderWidth: 2,
        radius: 1,
        order: 1,
        borderColor: data3color,
        backgroundColor: 'transparent',
        datalabels: {
          display: false,
        },
      }
    ]
  }
}

const stackedMultiBar = {
  legend: {
    display: true,
    position: 'bottom',
    align: 'center',
    labels: { boxWidth: 20, fontColor: '#999' }
  },
  plugins: {
    datalabels: false,
  },
  layout: {
    padding: chartpadding
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: '#999999',
          min: 0,
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

const ageColors = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#FFCC00',
  '#ff7c43',
  '#ffa600',
  '#333333'
]

const ageLabels = [
  '0 to 17',
  '18 to 24',
  '25 to 34',
  '35 to 44',
  '45 to 54',
  '55 to 64',
  '65 to 74',
  '75-84',
  '85+',
  'Unknown'
]

const raceLabels = [
  'Ntv. American',
  'Asian',
  'Black',
  'Hispanic',
  'Multiple',
  'Pac Islander',
  'Other',
  'Unknown',
  'White'
]
const raceColors = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#FFCC00',
  '#333',
  '#ff7c43',
  '#ffa600'
]

const piedefaults = {
  legend: {
    display: true,
    position: responsivePieLegend(),
    labels: {
      fontColor: '#999',
      fontSize: 12,
      boxWidth: 10
    }
  },
  layout: {
    padding: 16
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var meta = dataset._meta[Object.keys(dataset._meta)[0]];
        var total = meta.total;
        var currentValue = dataset.data[tooltipItem.index];
        var percentage = parseFloat((currentValue / total * 100).toFixed(1));
        return currentValue + ' (' + percentage + '%)';
      },
      title: function (tooltipItem, data) {
        return data.labels[tooltipItem[0].index];
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false
}

export {
  barDefaults,
  lineDefaults,
  datasetKeyProvider,
  Oneobject,
  Twoobject7DayAverage,
  Threeobject7DayAverage,
  ageColors,
  ageLabels,
  piedefaults,
  raceColors,
  raceLabels,
  stackedMultiBar,
  chartpadding
}
