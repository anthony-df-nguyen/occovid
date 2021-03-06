import moment from 'moment'

function filtertime (array, timeSetting) {
  //console.log("🚀 ~ file: Timefilter.js ~ line 4 ~ filtertime ~ array", array)
  let fullArray = array
  if (timeSetting === 'All Time') {
    return fullArray
  } else if (!isNaN(timeSetting)) {
    let comparisonStart = new Date(
      moment()
        .subtract(timeSetting, 'days')
        .format('L')
    )
    let fullArray = array
    let shortArray = fullArray.filter(row => {
      let comparisonDate = new Date(row.date)
      if (comparisonDate > comparisonStart) {
        return row
      }
    })
    return shortArray
  } else {
    let selectedMonth = new Date(moment(new Date(timeSetting)).format('L'))
    let lastDayOfMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      0
    )
    let monthStart = selectedMonth
    let monthEnd = new Date(moment(lastDayOfMonth).format('L'))

    let shortArray = fullArray.filter(row => {
      let comparisonDate = new Date(row.date)
      if (comparisonDate >= monthStart && comparisonDate <= monthEnd) {
        return row
      }
    })

    return shortArray
  }
}

export default filtertime
