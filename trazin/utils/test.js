const arr = [1, 1, 1, 2, 3, 4, 4, 5, 5, 5]
const r = JSON.stringify({ ...[...new Set(arr.flat())] }, null, ' ')
const r2 = JSON.stringify({ ...arr }, null, ' ')
console.log(arr, r, r2)
