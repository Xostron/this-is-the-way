#include <stdio.h>
#include <locale.h>


int main(void) {
    // Установка локали русский, для вывода в консоль кириллицы
    // Файл сохранен в кодировке utf8, чтобы компилятор понимал 
    // русские символы, например здесь printf("CRT работает\n");
    setlocale(LC_ALL, "Rus");
    printf("CRT работает\n");
    return 0;
}