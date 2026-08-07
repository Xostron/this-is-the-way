package main

// Структура визита
type Visit struct {
	Specialization string
	Date           string
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
	r.data[name] = append(r.data[name], Visit{Specialization: spec, Date: date})
}

// Метод получения истории
func (r *Registry) GetHistory(name string) ([]Visit, error) {
	// ВАШЕ ЗАДАНИЕ: вернуть срез визитов.
	// Если пациента нет в мапе — вернуть nil и ошибку PatientNotFoundError{Message: "patient not found"}
	rlt, ok := r.data[name]
	if !ok {
		return nil, PatientNotFoundError{Message: "GetHistory: Пациент не найден"}
	}
	return rlt, nil
}

// Метод получения последнего визита
func (r *Registry) GetLastVisit(name, spec string) (string, error) {
	rlt, ok := r.data[name]
	if !ok {
		return "", PatientNotFoundError{Message: "GetLastVisit: Пациент не найден"}
	}
	var lastDate string

	for _, cur := range rlt {
		// Если не та специальность - пропускаем
		if cur.Specialization == spec && cur.Date > lastDate {
			lastDate = cur.Date
		}
	}
	if lastDate == "" {
		return "", PatientNotFoundError{Message: "GetLastVisit: Визиты пациента не найдены"}
	}
	return lastDate, nil
}
