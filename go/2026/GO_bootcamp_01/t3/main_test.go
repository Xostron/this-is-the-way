// go test -v
package main

import "testing"

func TestFnIntersection(t *testing.T) {

	in1 := []int{5, 3, 4, 2, 1, 6}
	in2 := []int{6, 4, 2, 4}
	expectedA := []int{4, 2, 6}

	resultA := fnIntersection(in1, in2)

	// Шаг 1: Проверяем длину срезов
	if len(resultA) != len(expectedA) {
		t.Fatalf("Сценарий А провален: длина не совпадает. Ждали %d, получили %d", len(expectedA), len(resultA))
	}

	for i := range resultA {
		if resultA[i] != expectedA[i] {
			t.Errorf("Сценарий А провален: на индексе %d ждали %d, получили %d", i, expectedA[i], resultA[i])
		}
	}

}

func TestAnswer(t *testing.T) {
	// Дополнительно протестируем функцию отображения строки для пустого пересечения
	emptySlice := []int{}
	expectedStr := "Empty intersection"

	resultStr := answer(emptySlice)
	if resultStr != expectedStr {
		t.Errorf("Тест отображения провален: ждали %q, получили %q", expectedStr, resultStr)
	}
}
