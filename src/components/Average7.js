function average7(array) {
     let avgArray = [null, null, null, null, null, null]
     let changeIndex = 6
     for (changeIndex = 6; changeIndex < array.length; changeIndex++) {
          let pos1 = array[changeIndex - 6]
          let pos2 = array[changeIndex - 5]
          let pos3 = array[changeIndex - 4]
          let pos4 = array[changeIndex - 3]
          let pos5 = array[changeIndex - 2]
          let pos6 = array[changeIndex - 1]
          let pos7 = array[changeIndex]
          let avg7day = parseFloat(
               ((pos1 + pos2 + pos3 + pos4 + pos5 + pos6 + pos7) / 7).toFixed(1)
          )
          avgArray.push(avg7day)
     }
     return avgArray
}

export default average7
