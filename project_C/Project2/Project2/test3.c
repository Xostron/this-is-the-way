#include <stdio.h>
#include <locale.h>

int main(void) {
	setlocale(LC_ALL, "Rus");
	int _int1 = 12, _int2 = -42;
	double _double = 12;
	char _char = 'Ю';
	_int1 = _int2;
	_int2 = _int1;
	printf("%s %d %d\n", "Переменные int", _int1, _int2);
	printf("%s %f\n", "Переменные double", _double);
	printf("%s %c\n", "Переменные char", _char);
	return 0;
}
//pwduser:Ks9ex72F666HqweDgd