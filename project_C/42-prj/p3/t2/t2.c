#include <locale.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Функция принимает строку и печатает её HEX-коды
void FnCode(const char* text) {
  for (int i = 0; i < strlen(text) - 1; i++) {
    // Выводим каждый символ как 2-значный HEX
    printf("%02X ", (unsigned char)text[i]);
  }
}

// Функция принимает строку и печатает её HEX-коды
void FnDecode(const char* hexText) {
  unsigned int byte;
  //   unsigned int byte_c;
  int offset = 0;
  int read;
  //   int read_c;
  if (sscanf(hexText + offset, "%x%n", &byte, &read) != 1) {
    printf("n/a");
    return;
  }
  while (sscanf(hexText + offset, "%x%n", &byte, &read) == 1) {
    // Защита от hex без пробелов
    if (read > 3) {
      printf("n/a");
      return;
    }
    printf("%c", (unsigned char)byte);
    offset += read;
  }
}

int main(int argc, char* s[]) {
  setlocale(LC_ALL, "Rus");
  // Кол-во аргументов = 1
  int length = 1;
  char word[100];
  // Проверка что введено 2 аргумента
  if (argc != length + 1) {
    printf("n/a");
    return 0;
  }

  // Превращаем строку в число
  int mode = atoi(s[1]);
  // Проверка режима 0 - кодирование, 1 - декодирование
  if (mode != 0 && mode != 1) {
    printf("n/a");
    return 0;
  }

  printf("Введите слово: ");
  // Считываем ввод слова
  if (!fgets(word, sizeof(word), stdin)) {
    printf("n/a");
    return 0;
  }

  // Кодирование
  if (mode == 0) {
    FnCode(word);
    return 0;
  }
  // printf("222 %s", word);
  // Декодирование
  FnDecode(word);

  return 0;
}