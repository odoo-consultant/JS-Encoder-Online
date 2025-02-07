/**
 * 判断数据的具体类型
 * @param {Any} data
 * @returns {String}
 */
function getType (data) {
  if (data === null) return 'null'
  const type = typeof data
  if (type === 'object') return getObjType(data)
  return type
}

/**
 * 判断对象的详细类型
 * @param {Object} data
 * @returns {String}
 */
function getObjType (data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

/**
 * 判断对象中是否存在循环引用
 * @param {Object} obj
 * @returns {Boolean}
 */
function judgeCyclic (obj) {
  let stackSet = new Set()
  let detected = false
  const detect = (obj) => {
    if (obj && typeof obj !== 'object') {
      return void 0
    }
    if (stackSet.has(obj)) {
      return (detected = true)
    }
    stackSet.add(obj)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        detect(obj[key])
      }
    }
    stackSet.delete(obj)
  }
  detect(obj)
  return detected
}

/**
 * 判断数组的所有元素是不是都是基本类型
 * @param {Array} arr
 * @returns {Boolean}
 */
function judgeBaseArray (arr) {
  return arr.every((item) => judgeBaseType(item))
}

/**
 * 判断数据是否为基本类型
 * @param {Any} data
 * @returns {Boolean}
 */
function judgeBaseType (data) {
  let isBase = true
  const type = getType(data)
  switch (type) {
    case 'number':
    case 'symbol':
    case null:
    case 'boolean':
    case 'undefined':
    case 'string':
    case 'bigint':
      break
    default:
      isBase = false
  }
  return isBase
}

/**
 * 判断对象是否为window
 * @param {Object} obj
 * @returns {Boolean}
 */
function judgeWindow (obj) {
  const type = getType(obj)
  return type === 'global' || type === 'Window' || type === 'DOMWindow'
}

/**
 * Convert dom to string
 * 将dom转化为字符串
 * @param {Element} dom
 * @returns {String}
 */
function stringifyDOM (dom) {
  let objE = document.createElement('div')
  objE.appendChild(dom.cloneNode(true))
  const domStr = objE.innerHTML
  objE = dom = null
  return domStr
}

/**
 * Convert the object into a string (topmost key-value pair)
 * 将对象转化成字符串（最顶层的键值对）
 * @param {Object} target
 * @returns {String}
 */
function JSONStringify (target) {
  let prefix = '', suffix = ''
  const type = getType(target)
  switch (type) {
    case 'Object': {
      prefix = '{'
      suffix = '}'
      break
    }
    case 'Array': {
      prefix = '['
      suffix = ']'
      break
    }
    case 'Map': {
      prefix = `Map(${target.size}){`
      suffix = '}'
      break
    }
    case 'Set': {
      prefix = `Set(${target.size}){`
      suffix = '}'
      target = [...target]
      break
    }
    case 'Error': {
      return `Error: ${JSONStringify(target.message)}`
    }
    case 'RegExp': {
      return target.toString()
    }
    default: {
      return JSON.stringify(target)
    }
  }

  let str = prefix
  const keys = getObjAllKeys(target)
  for (let i = 0;i < keys.length;i++) {
    const key = keys[i]
    let value = target[key]
    if (type === 'Map') {
      value = target.get(key)
    }

    // key
    if (type !== 'Array') {
      const keyType = getType(key)
      switch (keyType) {
        case 'Object':
        case 'Array':
        case 'Set':
        case 'symbol':
          str += Object.prototype.toString.call(key)
          break
        default:
          str += key
      }
      str += ': '
    }
    // value
    let valueType = getType(value)
    if (/^HTML/.test(valueType)) valueType = 'dom'
    switch (valueType) {
      case 'Array':
      case 'Object':
        str += JSONStringify(value)
        break
      case 'RegExp':
        str += value.toString()
        break
      case 'function':
        str += String(value)
        break
      case 'symbol':
        str += String(value)
        break
      case 'dom':
        str += stringifyDOM(value)
        break
      case 'Error':
        str += `Error: ${JSONStringify(value.message)}`
        break
      case 'bigint':
        str += `${value.toString()}n`
        break
      default:
        str += JSON.stringify(value)
    }
    if (i < keys.length - 1) str += ', '
  }
  str += suffix
  return str
}

/**
 * Get all the keys of the object, including non-enumerable keys
 * 获取对象的所有键，包括不可枚举的键
 * @param {Object} obj
 * @returns {Array}
 */
function getObjAllKeys (obj) {
  const type = getType(obj)
  switch (type) {
    case 'Map': {
      const arr = []
      for (let key of obj) {
        arr.push(key[0])
      }
      return arr
    }
    case 'Array': {
      const arr = []
      obj.forEach((_, index) => {
        arr.push(index)
      })
      return arr
    }
    default: {
      if (type !== 'Object' && type !== 'Array') {
        return []
      } else {
        return Object.getOwnPropertyNames(obj).sort()
      }
    }
  }
}

export {
  getType,
  getObjType,
  judgeCyclic,
  judgeBaseArray,
  judgeWindow,
  stringifyDOM,
  JSONStringify,
  getObjAllKeys,
}