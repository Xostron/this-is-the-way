#include <stdio.h>

// Остаток от деления
int DivRem(int a, int b) {
  while (a >= b) {
    a = a - b;
  }
  return a;
}
// Деление: результат целое число
int DivInt(int a, int b) {
  int i = 0;
  while (a >= b) {
    i++;
    a = a - b;
  }
  return i;
}

int main() {
  int a;
  // Результат: наибольший простой делитель
  int max = 2;
  // Делитель
  int b = 2;
  printf("Введите целое число: ");
  // Проверка ввода
  if (scanf("%d", &a) != 1) {
    printf("n/a");
    return 0;
  }

  // Поиск делителя
  while (a > 1) {
    // Цикл деления на 2
    while (DivRem(a, b) == 0) {
      // Пока делится на 2 остаемся
      max = b;
      a = DivInt(a, b);
    }
    // Перестало делиться, увеличиваем и начинаем снова делить на 2
    b++;
  }

  printf("%d", max);

  return 0;
}