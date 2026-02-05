#include <locale.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// ˜˜˜˜˜˜˜ ˜˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜ ˜˜˜˜˜˜˜˜ ˜ HEX-˜˜˜˜
void FnCode(const char* text) {
  for (int i = 0; i < strlen(text) - 1; i++) {
    // ˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜˜˜ 2-˜˜˜˜˜˜˜ HEX
    printf("%02X ", (unsigned char)text[i]);
  }
}

// ˜˜˜˜˜˜˜ ˜˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜ ˜˜˜˜˜˜˜˜ ˜ HEX-˜˜˜˜
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
    // ˜˜˜˜˜˜ ˜˜ hex ˜˜˜ ˜˜˜˜˜˜˜˜
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
  // ˜˜˜-˜˜ ˜˜˜˜˜˜˜˜˜˜ = 1
  int length = 1;
  char word[100];
  // ˜˜˜˜˜˜˜˜ ˜˜˜ ˜˜˜˜˜˜˜ 2 ˜˜˜˜˜˜˜˜˜
  if (argc != length + 1) {
    printf("n/a");
    return 0;
  }

  // ˜˜˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜ ˜ ˜˜˜˜˜
  int mode = atoi(s[1]);
  // ˜˜˜˜˜˜˜˜ ˜˜˜˜˜˜ 0 - ˜˜˜˜˜˜˜˜˜˜˜, 1 - ˜˜˜˜˜˜˜˜˜˜˜˜˜
  if (mode != 0 && mode != 1) {
    printf("n/a");
    return 0;
  }

  printf("˜˜˜˜˜˜˜ ˜˜˜˜˜: ");
  // ˜˜˜˜˜˜˜˜˜ ˜˜˜˜ ˜˜˜˜˜
  if (!fgets(word, sizeof(word), stdin)) {
    printf("n/a");
    return 0;
  }

  // ˜˜˜˜˜˜˜˜˜˜˜
  if (mode == 0) {
    FnCode(word);
    return 0;
  }
  // printf("222 %s", word);
  // ˜˜˜˜˜˜˜˜˜˜˜˜˜
  FnDecode(word);

  return 0;
}