/**
 * https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore?tab=readme-ov-file#_flatten
 * https://github.com/you-dont-need-x/you-dont-need-lodash
 */

// ----------------------------------------------------------------------

export function flattenArray(list, key = 'children') {
  let children = []

  const flatten = list?.map(item => {
    if (item[key] && item[key].length > 0) {
      children = [...children, ...item[key]]
    }
    return item
  })

  return flatten?.concat(
    children.length > 0 ? flattenArray(children, key) : children,
  )
}

// ----------------------------------------------------------------------

export function flattenDeep(array) {
  const isArray = array && Array.isArray(array)

  if (isArray) {
    return array.flat(Infinity)
  }
  return []
}

// ----------------------------------------------------------------------

export function orderBy(array, properties, orders) {
  return [...array].sort((a, b) => {
    for (const [index, property] of properties.entries()) {
      const order = orders && orders[index] === 'desc' ? -1 : 1

      const aValue = a[property]
      const bValue = b[property]

      if (aValue < bValue) return -1 * order
      if (aValue > bValue) return 1 * order
    }
    return 0
  })
}

// ----------------------------------------------------------------------

export function keyBy(array, key) {
  return (array || []).reduce((result, item) => {
    const keyValue = key ? item[key] : item

    return { ...result, [String(keyValue)]: item }
  }, {})
}

// ----------------------------------------------------------------------

export function sumBy(array, iteratee) {
  return array.reduce((sum, item) => sum + iteratee(item), 0)
}

// ----------------------------------------------------------------------

export function isEqual(a, b) {
  if (a === null || a === undefined || b === null || b === undefined) {
    return a === b
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (
    typeof a === 'string' ||
    typeof a === 'number' ||
    typeof a === 'boolean'
  ) {
    return a === b
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }

    return a.every((item, index) => isEqual(item, b[index]))
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
      return false
    }

    return keysA.every(key => isEqual(a[key], b[key]))
  }

  return false
}

// ----------------------------------------------------------------------

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const merge = (target, ...sources) => {
  if (sources.length === 0) return target

  const source = sources.shift()

  // eslint-disable-next-line no-restricted-syntax
  for (const key in source) {
    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} })
      merge(target[key], source[key])
    } else {
      Object.assign(target, { [key]: source[key] })
    }
  }

  return merge(target, ...sources)
}
