#include <locale.h>
#include <stdio.h>

int main(void) {
  setlocale(LC_ALL, "Rus");
  int a;
  a = 1 + 1;
  printf("a=%d", a);
  return 0;
}
// pwduser:Ks9ex72F666HqweDgd
