// Переписать на async await
// function fun1(par1) {
// 	return fun2(par1)
// 		.then((res1) => fun3(res1))

// 		.then((res2) => {
// 			fun4(res2)
// 		})

// 		.catch((err) => {
// 			fun_err()
// 		})
// }


// function fun(x) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			console.log(x)
// 			resolve(x)
// 		}, x * 1000)
// 	})
// }



async function fun1(par1) {
	try {
		const res1 = await fun2(par1)
		const res2 = await fun3(res1)
		await fun(res2)
	} catch (err) {
		console.log(err)
	}
}
// Что выведет этот код? Почему? Исправьте его, чтобы вывелось значение 100.

// for (let x = 0; x < 100; x++) {
// 	x++
// }

// console.log(x)

/**
 * 
Переведите строку в массив элементов разными способами. Какой способ для Вас предпочтительнее? Почему?

let str = 'элемент1, элемент2, элемент3, элемент4, элемент5';

let array = ...

Удалите из полученного массива "элемент3".
*/

// В чем разница между состоянием и пропсами в React?
//

/**
 * 
Существует следующая структура таблиц:

CREATE TABLE regions(id_region int, name_region varchar(200));

CREATE TABLE companys(id_company int, id_region int, name_company varchar(200));

CREATE TABLE persons(id_person int, id_company int, fio varchar(200), date_of_employment datetime);

Напишите запрос для вывода всех ФИО из persons, которые работают в Москве начиная с 2020-го года
*/

// Можно ли назвать JavaScript асинхронным языком? Почему?

// Можно ли назвать JavaScript многопоточным языком? Почему?
