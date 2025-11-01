# 1. Установка, настройка для Windows

-   Скачать go
-   Настройка GOPATH в переменных и среды или через командную строку
    go env -w GOPATH=C:\users\USER\go
-   Настройка GOBIN
    go env -w GOBIN=путь_GOPATH\bin

# 2. Запуск

-   Перейти в папку проекта
-   Инициализация go-модуля: создание файла go.mod метаданные проекты
    go mod init ИМЯ_ПРОЕКТА
-   Создать файл main.go
-   Запуск
    go run main.go
