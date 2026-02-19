#include <locale.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Кодирование word -> HEX
void FnCode(const char* text) {
  for (int i = 0; i < strlen(text) - 1; i++) {
    printf("%02X ", (unsigned char)text[i]);
  }
}

// Декодирование HEX -> word
void FnDecode(const char* hexText) {
  unsigned int byte;
  int offset = 0;
  int read;
  // Проверка строки
  if (sscanf(hexText + offset, "%x%n", &byte, &read) != 1) {
    printf("n/a");
    return;
  }
  // Считывание и декодирование
  while (sscanf(hexText + offset, "%x%n", &byte, &read) == 1) {
    // Проверка если считанное значение больше 2-х символов значит HEX не
    // валидный (написан слитно),например 454845, а должен быть 45 48 45
    if (read > 3) {
      printf("n/a");
      return;
    }
    // Проверка пройдена печать символа
    printf("%c", (unsigned char)byte);
    // Переход на следующий 2-х значный HEX
    offset += read;
  }
}

int main(int argc, char* s[]) {
  setlocale(LC_ALL, "Rus");
  // Количество аргументо при вызове функции ./t2.c <mode>
  int length = 1;
  //   Резервируем строку - массив символов
  char word[100];
  // Проверка кол-ва переданных аргумментов
  if (argc != length + 1) {
    printf("n/a");
    return 0;
  }

  // Преданный аргумент это строка -> преобразуем в целое число
  int mode = atoi(s[1]);
  // Проверка переданного число mode должен быть равен 0 или 1
  if (mode != 0 && mode != 1) {
    printf("n/a");
    return 0;
  }

  printf("Введите СЛОВО (на англ.) или HEX: ");
  //   Проверка слова -
  if (!fgets(word, sizeof(word), stdin)) {
    printf("n/a");
    return 0;
  }

  // Выбор режима: 0 - кодирование, 1 - декодирование
  if (mode == 0) {
    FnCode(word);
    return 0;
  }
  // 1 - Декодирование
  FnDecode(word);

  return 0;
}