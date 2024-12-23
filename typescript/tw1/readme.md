Создание проекта
0 установить ts 
# npm install --global typescript

1 Создать package.json:
# npm init --yes
2 Создать файл конфигурации компилятора ts: копируем файл tsconfig.json
3 файлы проекта будут храниться в папке src, создать index.ts
4 Компиляция и выполнение кода: для компиляции в папку build выполнить команду 
# tsc
для выполнения скомпилированного кода {node ./build/index.js}
5 Отображение списка файлов для компиляции
Глобально ` tsc --listFiles ` 
Локально ` npx tsc --listFiles `

6 Отслеживание компиляции `tsc --watch`

7 Автоматическое выполнение кода после компиляции - пакет tsc-watch
npx tsc-watch --onsuccess "node ./build/index.js"
