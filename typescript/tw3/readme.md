Создание проекта РЫБА

# npm install --global typescript

1. Создать package.json:

# npm init --yes

2. Создать файл конфигурации компилятора ts: копируем файл tsconfig.json

3. файлы проекта будут храниться в папке src, создать index.ts

4. Компиляция и выполнение кода: для компиляции в папку build выполнить команду

# tsc

для выполнения скомпилированного кода {node ./build/index.js} 5. Отображение списка файлов для компиляции
Глобально `tsc --listFiles`
Локально `npx tsc --listFiles`

6. Отслеживание компиляции `tsc --watch`

7. Автоматическое выполнение кода после компиляции - пакет tsc-watch
   npx tsc-watch --onsuccess "node ./build/index.js"

8. Проверка кода линтером `npx eslint .`

9. Ошибка линтера Parsing error: error TS5012: Cannot read file
   Решение: в (eslint.config.mjs) добавить (eslint.config.mjs)
   `ignores: ['**/node_modules', '**/build', 'eslint.config.mjs'],`

10. Тесты jest, установка пакетов и создание файла jest.config.js
    запуск тестов `npx jest --watchAll`
