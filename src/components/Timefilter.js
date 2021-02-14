import moment from 'moment'

function filtertime (array, timeSetting) {
  if (timeSetting === 'All Time') {
    return array
  } else {
    let today = new Date()
    let comparisonEnd
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
  }
}

export default filtertime
