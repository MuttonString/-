const timeToString = (date: any) => {
  let year = date['$y']
  let month = date['$M'] + 1
  let day = date['$D']
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export default timeToString