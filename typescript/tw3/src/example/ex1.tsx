import { calcu } from '../tool/calc'
import sum from '../tool/sum'

function printMsg(msg: string): void {
	console.log('Сообщение: ', msg)
}
let r = sum(21, 2)
printMsg('5 глава по TS - выполнена')
printMsg('6 глава по TS - выполнена')

/* as - утверждение типа (сужение типа)
эквивалент: 
const r1:string = calcu(12, true) as string
*/
const r1 = calcu(12, true) as string
const r2 = calcu(12, false) as number
console.log('r1 r2', r1, typeof r1, r2, typeof r2)
const r3 = calcu(12, false) as any as boolean
console.log('r3', r3, typeof r3)

/*
Защита типов - проверка примитивных типов typeof и switch-case
*/

/*
Тип never - после обработки всех типов, компилятор разрешит присвоить значение только типу never
*/

const r4 = calcu(12, false)

switch (typeof r4) {
	case 'number':
		console.log('r4 as number', r4)
		break
	case 'string':
		console.log('r4 as string', r4)
		break
	default:
		const v4: never = r4
		console.log('Неожидаемый тип', v4)
		break
}

/*
Тип unknown - альтернатива к any
*/

const r5: unknown = calcu(200, false)
const r6 = r5 as number
console.log('r5 r6', r5, typeof r5, r6, typeof r6)

/**
 * Тип null
 * "strictNullChecks":true - включить ограничение на null, undefined
 * ! - утверждение, говорит о том что значение не может быть null
 */
function fn1(a: number): number | string {
	if (a === 0) return 'str'
	return a
}

const r7: number | string = fn1(-1)
const r8: number | string = fn1(0)!
const r9: number | string = fn1(1)!
console.log('r7', r7, typeof r7)
console.log('r8', r8, typeof r8)
console.log('r9', r9, typeof r9)
