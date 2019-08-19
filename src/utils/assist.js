function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Null]': 'null',
    '[object undefined]': 'undefined',
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Object]': 'object',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
  }
  return map[toString.call(obj)]
}

/**
 * 深拷贝
 */
function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}
/**
 * 由一个组件，向上找到最近的指定组件
 */
function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
/**
 * 由一个组件，向上找到所有的指定组件
 */
function findComponentsUpward(context, componentName) {
  let parents = []
  let parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

/**
 * 由一个组件，向下找到最近的指定组件
 */
function findComponentDownward(context, componentName) {
  let children = context.$children
  let result = null
  if (children) {
    for (let child of children) {
      if (child.$options.name === componentName) {
        result = child
        break
      } else {
        result = findComponentDownward(child, componentName)
        if (result) break
      }
    }
  }
  return result
}
/**
 * 由一个组件，向下找到所有的指定组件
 */
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChildren = findComponentsDownward(child, componentName)
    return components.concat(foundChildren)
  }, [])
}

/**
 * 由一个组件，找到指定组件的兄弟组件
 */
function findBrothersComponents(context, componentName, exceptMe = true) {
  return context.$parent.$children.filter(item => {
    return (
      item.$options.name === componentName &&
      (exceptMe ? !(context._uid === item._uid) : true)
    )
  })
}

function cameCase(name) {
  const reg = /(_|-)([a-z])/g
  return name.replace(reg, g => g[1].toUpperCase())
}

function getStyle(element, styleName) {
  if (!element || !styleName) return null

  styleName = cameCase(styleName)
  if (styleName === 'float') styleName = 'cssFloat'

  try {
    // defaultView用于获取document关联的window，Firefox3.6时，需要这样去获取window对象，才能使用其getComputedStyle方法
    //getComputedStyle返回的style是一个实时的 CSSStyleDeclaration 对象
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

function isNumber(val) {
  return !isNaN(parseFloat(val))
}
export {
  deepCopy,
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents,
  cameCase,
  getStyle,
  isNumber,
}
