function average4(array) {
  let avgArray = [null, null, null];
  let changeIndex = 3;
  for (changeIndex = 3; changeIndex < array.length; changeIndex++) {
    let pos1 = array[changeIndex - 3];
    let pos2 = array[changeIndex - 2];
    let pos3 = array[changeIndex - 1];
    let pos4 = array[changeIndex];
    let avg4week = parseFloat(((pos1 + pos2 + pos3 + pos4) / 4).toFixed(1));
    avgArray.push(avg4week);
  }
  return avgArray;
}

export default average4;
