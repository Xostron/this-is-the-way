/**
 * Встроенные сопоставленые типы
 */

type Warhammer = {
	code: string
	name?: string
    info?: string
}

const r1: Warhammer[] = [{ code: "", name: "" }, { code: "" }]
r1[1].code = 'I'
console.log("r1", r1)

// Делает все свойства необязательными
const r2: Partial<Warhammer>[] = [{}]
r2[0].code = 'II'
console.log("r2", r2)

// Делает все свойства обязательными
const r3: Required<Warhammer> = { code: "", name: "", info:'' }
r3.code='III'
console.log("r3", r3)

// Делает все свойства доступными только для чтения
const r4:Readonly<Warhammer> = {code:''}
// r4.code='IV' Ощибка: свойства только для чтения
console.log("r4", r4)

// Создает новый тип, выбирая только указанные свойства K из исходного типа
const r5:Pick<Warhammer, 'info'|'name'> = {name:'',info:''}
console.log("r5", r5)

// Omit противополжно Pick исключает свойства из исходного типа
const r6:Omit<Warhammer, 'info'> = {code:''}
console.log("r6", r6)

//Создает тип с ключами info, name
const r7:Record<'info'|'name', number> = {info:12, name:42}

// Условный тип
type t1  <T extends boolean> = T extends true ? number : string
const r8:t1<true> = 12
const r9:t1<false> = ''