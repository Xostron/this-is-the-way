package main

// Структура визита
type Visit struct {
	Spec string
	Date string
}

// картотека (база данных)
type Registry struct {
	data map[string][]Visit
}

// Конструктор картотеки
func NewRegistry() *Registry {
	return &Registry{
		data: make(map[string][]Visit),
	}
}

// Метод сохранения
func (r *Registry) Save(name, spec, date string) {
	// добавить визит в мапу data для ключа name
	r.data[name] = append(r.data[name], Visit{Spec: spec, Date: date})
}

// Метод получения истории
func (r *Registry) GetHistory(name string) ([]Visit, error) {
	// ВАШЕ ЗАДАНИЕ: вернуть срез визитов.
	// Если пациента нет в мапе — вернуть nil и ошибку PatientNotFoundError{Message: "patient not found"}
	h, ok := r.data[name]
	if !ok {
		return nil, PatientNotFoundError{Message: "patient not found"}
	}
	return h, nil
}

// Метод получения последнего визита
func (r *Registry) GetLastVisit(name, spec string) (string, error) {
	// ВАШЕ ЗАДАНИЕ: найти среди визитов пациента самый поздний визит к врачу spec.
	// Если пациента нет — вернуть ошибку PatientNotFoundError.
	// Если пациент есть, но к этому врачу не ходил — подумай, что вернуть (в ТЗ этот крайний случай не описан, можно пустую строку).
}
