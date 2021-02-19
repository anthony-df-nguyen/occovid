import React, { useState, useContext } from 'react'
import TimeContext from 'components/context/TimeContext'
import moment from 'moment'

function setStorage(value) {
  localStorage.setItem('timeSetting', value)
}

const Timeselect = props => {
  const { time, setTime } = useContext(TimeContext)
  //console.log("file: Timeselect.jsx ~ line 11 ~ time", time)

  const [valueForNoneOption, updateNoneValue] = useState(time)

  function updateAllTime(x) {
    setStorage(x)
    setTime(x)
    updateNoneValue(x)
  }

  function monthSwitch(e) {
    //console.log(e.target)
    let value = e.target.value
    updateAllTime(value)
  }

  function dynamicSelectRender() {
    let startFrom = new Date('03/01/2020')
    let today = new Date(moment().format('L'))

    //Figure out # of months in between
    var diff = (today.getTime() - startFrom.getTime()) / 1000
    diff /= 60 * 60 * 24 * 7 * 4
    let monthDifference = Math.abs(Math.round(diff))

    //Create Array of Month Strings
    let theMonthArray = [{ display: 'Mar 2020', value: '03/01/2020' }]
    for (let i = 0; i < monthDifference - 2; i++) {
      let theMonth = startFrom.setMonth(startFrom.getMonth() + 1)
      let value = moment(new Date(theMonth)).format('L')
      let monthDisplay = moment(new Date(value))
        .format('MMMM')
        .slice(0, 3)
      let yearDisplay = moment(new Date(value)).format('YYYY')

      let display = monthDisplay + ' ' + yearDisplay
      theMonthArray.push({
        display: display,
        value: value
      })
    }

    //Sort to Recent First
    theMonthArray.sort((a, b) =>
      new Date(a.display) > new Date(b.display) ? -1 : 1
    )

    //Create React partials for Each Month
    let optionJSX = [
      // <option key={ 0 } value={ valueForNoneOption }>
      //   No Month Isolated
      // </option>
      <option key={ 0 } value={'All Time'}>
        No Month Isolated
      </option>
    ]
    //Parse the current save date into a string
    for (let i = 0; i < theMonthArray.length; i++) {
      if (new Date(theMonthArray[i].value) == time) {
        let adasd = new Date(theMonthArray[i].value);
        optionJSX.push(
          <option key={ i + 1 } value={ time } selected >
            { theMonthArray[i].display }
          </option>
        )
      } else {
        optionJSX.push(
          <option key={ i + 1 } value={ new Date(theMonthArray[i].value) }>
            { theMonthArray[i].display }
          </option>
        )
      }

    }

    return (
      <select onChange={ monthSwitch } >
        {optionJSX }
      </select>
    )
  }

  return (
    <div>
      <div className='uiButtonInstruction'>Isolate Time Periods</div>
      <div className='uiParent'>
        <div className='uiButtonContainer'>
          <a
            className={ time == 'All Time' ? 'active' : null }
            onClick={ () => updateAllTime('All Time') }
          >
            All Time
          </a>
          <a
            className={ time == 14 ? 'active' : null }
            onClick={ () => updateAllTime(14) }
          >
            14 Days
          </a>
          <a
            className={ time == 30 ? 'active' : null }
            onClick={ () => updateAllTime(30) }
          >
            30 Days
          </a>
          <a
            className={ time == 60 ? 'active' : null }
            onClick={ () => updateAllTime(60) }
          >
            60 Days
          </a>
          <a
            className={ time == 90 ? 'active' : null }
            onClick={ () => updateAllTime(90) }
          >
            90 Days
          </a>
          <a
            className={ time == 120 ? 'active' : null }
            onClick={ () => updateAllTime(120) }
          >
            120 Days
          </a>
          { dynamicSelectRender() }
        </div>

      </div>
    </div>
  )
}

export default Timeselect
