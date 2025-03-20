/**
 1. Переписать на async await
function fun1(par1) {
    return fun2(par1)
    .then((res1) => fun3(res1))
    
    .then((res2) => {
        fun4(res2)
    })
    
    .catch((err) => {
        fun_err()
    })
}
*/

async function fun1(par1) {
	try {
		const res1 = await fun2(par1)
		const res2 = await fun3(res1)
		await fun4(res2)
	} catch (err) {
		fun_err(err)
	}
}

// 2 Можно ли назвать JavaScript асинхронным языком? Почему?
/**
 Да, потому что js имеет средства для выполнения асинхронного кода (Промисы, async/await, генераторы, колбэки),
 управляет очередностью выполнения асинхронного кода механизм eventloop (цикл событий) (при помощи очередей микро и макротасков),
 сначала выполняются все синхронные операции, затем все микрозадачи (промисы, async/await, fetch), потом выполнение 
 одной макрозадачи (setTimeout, setInterval, onClick, onChange), Проверка очереди микрозадач - их выполнение,
 и повтор циклов выполнения 1 макрозадача потом все микрозадачи 
 */

// 3 Можно ли назвать JavaScript многопоточным языком? Почему?
/**
 JS является однопоточным, но имеет средства для выполнения отдельных тяжелых задач: Web Worker (браузер) и Worker Threads (Node)
 */

/* 4 Что выведет этот код? Почему? Исправьте его, чтобы вывелось значение 100.

for (let x = 0; x < 100; x++) {
	x++
}

console.log(x)


x is not defined - потому что переменная x имеет блочную область видимости (определена и видна в блоке for(){})
*/

// for (var x = 0; x < 100; x++) {
// 	x++
// }
// console.log(x)

let y
for (let x = 0; x < 101; x++) {
	y = x
}
console.log(y)

/**
 * 
5. Переведите строку в массив элементов разными способами. Какой способ для Вас предпочтительнее? Почему?

let str = 'элемент1, элемент2, элемент3, элемент4, элемент5';

let array = ...

Удалите из полученного массива "элемент3".
*/

let str = 'элемент1, элемент2, элемент3, элемент4, элемент5'

let array = str.split(', ')
console.log(111, array)
array = []
let sub = ''
for (let i = 0; i < str.length; i++) {
	// console.log(str[i])
	if (![',', ' '].includes(str[i])) sub += str[i]
	else {
		if (sub == '') continue
		array.push(sub)
		sub = ''
	}
	if (i == str.length - 1) array.push(sub)
}

array.splice(2, 1)
console.log(222, array)

// 6. В чем разница между состоянием и пропсами в React?
/*
Пропсы - это данные от родителя, которые получает компонент, при их изменении родителем компонент перерендерится. дочерний компонент не может напрямую изменить свои пропсы
Состояние - это внутренние данные компонента, которые он может изменить, при изменении состояния компонент начинает ререндер
*/

/**
 * 
7. Существует следующая структура таблиц:

CREATE TABLE regions(id_region int, name_region varchar(200));

CREATE TABLE companys(id_company int, id_region int, name_company varchar(200));

CREATE TABLE persons(id_person int, id_company int, fio varchar(200), date_of_employment datetime);

Напишите запрос для вывода всех ФИО из persons, которые работают в Москве начиная с 2020-го года

mongo псевдокод:
db.regions.findOne({name_region:"Москва"})
    .then(reg:object=>db.companys.find({id_region:reg.id_region}))
    .then(cmps:[]=>db.person.find({id_company:{$in:cmps}}))


*/
