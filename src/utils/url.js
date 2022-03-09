import qs from 'qs'

/**
 * 将url的queryString转换成字典
 * @returns {Object}
 */
function jsonQueryString () {
  let res = {}
  try {
    res = qs.parse(document.location.search.substring(1))
  } catch (error) {
    console.log(error)
  }
  return res
}

export {
  jsonQueryString
}