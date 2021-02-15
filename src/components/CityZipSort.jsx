import React, { useState, useContext } from 'react'

const CityZipSort = props => {
  const [selectedSort, updateSort] = useState(props.current)

  function runSortUpdate (sort) {
    updateSort(sort)
    props.function(sort)
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <div className='timeFilterTitle'>Sort Data by:</div>
      <div className='timeParent'>
        <div className='timeButtonContainer'>
          <a
            className={selectedSort == 'high' ? 'active' : null}
            onClick={() => runSortUpdate('high')}
          >
            High to Low
          </a>
          <a
            className={selectedSort == 'low' ? 'active' : null}
            onClick={() => runSortUpdate('low')}
          >
            Low to High
          </a>
          <a
            className={selectedSort == 'name' ? 'active' : null}
            onClick={() => runSortUpdate('name')}
          >
            Name
          </a>
        </div>
      </div>
    </div>
  )
}

export default CityZipSort