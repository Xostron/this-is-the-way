console.log('CUSTODES')

let sum1 = 0

// 42 занятий 42часов
new Array(42).fill(1).forEach((el, i) => {
	sum1 += 800
})

console.log('Волская автошкола', sum1)

// 28 занятий по 1,5ч = 42ч
sum1 = 0
new Array(28).fill(1).forEach((el, i) => {
	sum1 += 1060
})
console.log('Sprint автошкола', sum1)
