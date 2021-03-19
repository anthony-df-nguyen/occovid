import moment from "moment";

function TimeFilterForCounties(array, timeSetting, mode) {
  
  array.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
  let ocStart;
  switch (mode) {
    case "Cases":
      ocStart = new Date("2020-03-03T00:00:00");
      break;
    case "Cases per 100K":
      ocStart = new Date("2020-03-03T00:00:00");
      break;
    case "Deaths":
      ocStart = new Date("2020-03-19T00:00:00");
      break;
    case "Deaths per 100k":
      ocStart = new Date("2020-03-19T00:00:00");
      break;
    case "Hospitalized per 100k":
      ocStart = new Date("2020-04-01T00:00:00");
      break;
    case "Hospitalized":
      ocStart = new Date("2020-04-01T00:00:00");
      break;
    case "Vaccine Doses Administered":
      ocStart = new Date("2020-12-15T00:00:00");
      break;
    case "Vaccine Doses Administered per 100k":
      ocStart = new Date("2020-12-15T00:00:00");
      break;
    default:
      ocStart = new Date("2020-03-03T00:00:00");
      break;
  }
  //console.log(array);
  let countyStart = new Date(array[0].date);

  //Normalize the county array
  let fullArray = [];
  if (countyStart.getTime() - ocStart.getTime() > 1) {
    // console.log("The county start later");
    let differenceTime = countyStart.getTime() - ocStart.getTime();
    let dayDelta = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
    // console.log("file: TimeFilterForCounties.js ~ line 44 ~ TimeFilterForCounties ~ dayDelta", dayDelta)
    let fakeStart = moment(ocStart).format("L");
    for (let z = 0; z < dayDelta; z++) {
      let fakeDate;
      if (z == 0) {
        fakeDate = fakeStart;
      } else {
        fakeDate = moment(new Date(fakeStart)).add(1, "days").calendar();
      }

      fullArray.push({
        date: fakeDate,
        newCases: null,
        newDeaths: null,
        totalCases: null,
        totalDeaths: null,
        doses: null,
      });
      fakeStart = fakeDate;
    }
 
    for (let i = 0; i < array.length; i++) {
      fullArray.push({
        date: array[i].date,
        newCases: array[i].newCases,
        newDeaths: array[i].newDeaths,
        totalCases: array[i].totalCases,
        totalDeaths: array[i].totalDeaths,
        doses: array[i].doses,
      });
    }
         
  } else {
    let differenceTime = ocStart.getTime() - countyStart.getTime();
    let dayDelta = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
    // console.log("The county starts earlier by ", dayDelta);
    let fakeStart = moment(ocStart).format("L");
    for (let z = 0; z < dayDelta; z++) {
      array.shift();
    }
    fullArray = [...array];
  }

  if (timeSetting === "All Time") {
    return fullArray;
  } else if (!isNaN(timeSetting)) {
    let comparisonStart = new Date(
      moment().subtract(timeSetting, "days").format("L")
    );

    let shortArray = fullArray.filter((row) => {
      let comparisonDate = new Date(row.date);
      if (comparisonDate > comparisonStart) {
        return row;
      }
    });
    return shortArray;
  } else {
    let selectedMonth = new Date(moment(new Date(timeSetting)).format("L"));
    let lastDayOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    );
    let monthStart = selectedMonth;
    let monthEnd = new Date(moment(lastDayOfMonth).format("L"));

    let shortArray = fullArray.filter((row) => {
      let comparisonDate = new Date(row.date);
      if (comparisonDate >= monthStart && comparisonDate <= monthEnd) {
        return row;
      }
    });

    return shortArray;
  }
}

export default TimeFilterForCounties;
