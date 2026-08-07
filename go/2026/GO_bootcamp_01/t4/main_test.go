package main

import (
	"reflect"
	"testing"
)

func TestRegistry(t *testing.T) {
	db := NewRegistry()
	db.Save("Майк", "Разведка", "2024-04-13")

	expected1 := []Visit{{Specialization: "Разведка", Date: "2024-04-13"}}
	result1, _ := db.GetHistory("Майк")
	if !reflect.DeepEqual(result1, expected1) {
		t.Errorf("Сценарий А провален: %v", expected1)
	}

	expected2 := []Visit(nil)
	result2, _ := db.GetHistory("Сол")
	if !reflect.DeepEqual(result2, expected2) {
		t.Errorf("Сценарий B провален: %v", expected2)
	}
}
