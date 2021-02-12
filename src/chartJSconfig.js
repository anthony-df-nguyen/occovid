import { getByTitle } from "@testing-library/dom";

let chartpadding = [{ top: 0, right: 0, left: 0 }];
if (window.screen.width > 500) {
  chartpadding = { top: 16, right: 16, left: 16 };
}

const dataLabels = {
  anchor: "end",
  align: "end",
  offset: 2,
  color: function () {
    if (localStorage.getItem("theme") == "Dark") {
      return "#d9d9d9";
    } else {
      return "#999";
    }
  },
  display: function display(context) {
    if (context.chart.width > 500) {
      return "auto";
    } else {
      return false;
    }
  },
};

const showLegend = {
  display: true,
  position: "bottom",
  align: "center",
  labels: { boxWidth: 20, fontColor: "#999" },
};

const barDefaults = {
  plugins: {
    datalabels: dataLabels,
  },
  legend: showLegend,
  layout: {
    padding: chartpadding,
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "#999999",
          suggestedmin: 0,
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#999999",
        },
      },
    ],
  },
  tooltips: {
    mode: "index",
    axis: "y",
  },
};
const lineDefaults = {
  plugins: {
    datalabels: dataLabels,
  },
  legend: showLegend,
  layout: {
    padding: chartpadding,
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "#999999",
          suggestedmin: 0,
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked: true,
        ticks: {
          fontColor: "#999999",
        },
      },
    ],
  },
  tooltips: {
    mode: "index",
    axis: "y",
  },
};

const datasetKeyProvider = () => {
  return btoa(Math.random()).substring(0, 12);
};

export { barDefaults, lineDefaults, datasetKeyProvider };
