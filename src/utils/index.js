export const getClassNames = (...args) => args
    .map((arg) => ((arg && typeof arg === 'object') ? Object.keys(arg).filter((item) => arg[item]) : arg))
    .reduce((acc, val) => acc.concat(val), [])
    .filter((item) => item).join(' ');