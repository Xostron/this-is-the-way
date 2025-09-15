# Описание: Scrapper - скачивание сайта
Сайт указывается в Dockerfile в строке 53
RUN node ./scraper.js --url https://www.npmjs.com/package/zigbee-clusters --keyword pinUp
🛠 Стек: Node, puppeteer

# Порядок запуска через docker
## 1. Сборка образа
```bash```
- docker build -t image-scraper .
## 2. Запуск контейнера
```bash```
- docker run -d -p 8008:80 --name container-scraper image-scraper

