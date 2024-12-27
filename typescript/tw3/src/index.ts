/**
 * Массивы
 */
let arr: number[] = [1, 2, 3]
let arr1: (number|object)[] = [{}, 2, 3]
arr1.forEach((el) => console.log(el))

/**
 * Кортежи - массивы фиксированной длины, где каждый элемент имеет разный тип 
 * (ограничение длины и типов элементов массива накладывает ts)
 */

let arr2:[object,string,number] = [{},'qwe',12]