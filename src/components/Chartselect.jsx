import React from 'react'

const Chartselect = props => {
  //only display button if there is more than one type possible
  if (props.type.length > 1) {
    return (
      <div className='chartButtonContainer'>
        {props.type.map((type, i) => {
          return (
            <div
              key={i}
              className='chartTypeButton'
              onClick={() => {
                localStorage.setItem(props.id, type)
                props.passdown(type)
              }}
            >
              {type}
            </div>
          )
        })}
      </div>
    )
  } else if (props.type.length <= 1) {
    return <></>
  }
}

export default Chartselect
