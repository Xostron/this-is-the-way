package main

import "testing"

func TestSearch(t *testing.T) {
	// Сценарий A: Обычное поведение (K меньше уникальных слов)
	inputA := "aa bb cc aa cc cc cc aa ab ac bb"
	kA := 3
	expectedA := "cc aa bb"

	resultA := search(inputA, kA)
	if resultA != expectedA {
		t.Errorf("Сценарий А провален: ждали %q, получили %q", expectedA, resultA)
	}

	// ====== ТВОЁ ЗАДАНИЕ ======
	// Сценарий B: Передача пустого списка слов (пустая строка)
	// 1. Создай переменную inputB со значением ""
	inputB := ""
	// 2. Создай kB (например, 3)
	kB := 3
	// 3. Создай expectedB со значением ""
	expectedB := ""
	// 4. Вызови функцию search, запиши в resultB и сравни через if с expectedB.
	resultB := search(inputB, kB)
	if resultB != expectedB {
		t.Errorf("Сценарий B провален: ждали %q, получили %q", expectedB, resultB)
	}
	// Если не совпало — вызови t.Errorf(...)

	// Сценарий C: K больше, чем число уникальных слов
	// 1. Создай inputC (например, "яблоко банан яблоко")
	inputC := "яблоко банан яблоко"
	// 2. Создай kC равным 5 (уникальных слов всего 2, а K = 5)
	kC := 5
	// 3. Подумай, какой expectedC должен быть на выходе с учетом сортировки по частоте
	expectedС := "яблоко банан"
	// 4. Вызови search и проверь результат через if.
	resultC := search(inputC, kC)
	if resultC != expectedС {
		t.Errorf("Сценарий C провален: ждали %q, получили %q", expectedС, resultC)
	}
}
