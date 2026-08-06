package main

// Кастомный тип ошибки
type PatientNotFoundError struct {
	Message string
}

func (e PatientNotFoundError) Error() string {
	return e.Message
}
