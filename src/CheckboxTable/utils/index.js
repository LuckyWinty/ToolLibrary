const arrayToObject = (data, key) => {
  const obj = {}
  if (Array.isArray(data)) {
    data.forEach((item) => {
      obj[item[key]] = item
    })
  }
  return obj
}
export default arrayToObject
