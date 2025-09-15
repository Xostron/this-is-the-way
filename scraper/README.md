# Описание: Scrapper - скачивание сайта
Сайт указывается в Dockerfile в строке 53
RUN node ./scraper.js --url https://www.npmjs.com/package/zigbee-clusters --keyword pinUp
🛠 Стек: Node.js, puppeteer

# Порядок запуска через docker
## 1. Сборка образа
```bash```
- docker build -t image-scraper .
## 2. Запуск контейнера
```bash```
- docker run -d -p 8008:80 --name container-scraper image-scraper
## 3. Зайти на сайт
http://localhost:8008


# Запуск из консоли
node ./scraper/index.js --url https://www.npmjs.com/package/zigbee-clusters --keyword pinUp
