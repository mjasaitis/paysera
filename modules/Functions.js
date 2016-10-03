/**
* Round up number to 2 decimal places
* @param {Number} amount
*/
function roundUp(number){
  return Math.ceil(number * 100) / 100;
}

/**
* Get number of year's week
* @param {String} d
*/
function getWeekNumber(d){
  d = new Date(d);
  d = new Date(+d);
  d.setHours(0,0,0);
  d.setDate(d.getDate() + 4 - (d.getDay()||7));
  var yearStart = new Date(d.getFullYear(),0,1);
  return Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
}

export { roundUp, getWeekNumber };