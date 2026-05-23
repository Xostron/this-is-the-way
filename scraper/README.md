# Описание: Scrapper - скачивание сайта
Сайт указывается в Dockerfile в строке 53

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


node ./index.js --url "https://market.yandex.ru/card/avtomobilnyy-kompressor-swat-swt-106-60-lmin/103327445390?do-waremd5=xL1DWr_SXk2NRgPWDM35-Q&businessId=1229804&cpc=6RrwyR8Y2muMeJRkrWGH6xyQeL4rHmdBqjF6d81u_PIrOACXwe4gffp7zsZcEzt3yvlp7sz0SdrEzJOqsSJB3dWMScjnvnYV1WRYdCgveY7DH0w6Rx4pTCtefevNWPrsZFtl4NjaOrEs7gisNSxAq2AQEKoy0gEO-GFREw7_QbBW-PfuM78rjMWXB7dtBptt_wyAldm1ZYO9KNUL9jgGybR11JhTugIlm407nm2Ty5qhOycK7Wo6ka_s8o2ys24EYVBcOCEJM0IBGrYQx0bvGPlBAjHeL8EYFhALw0yVU0GEpcOAhM6VOacA38WaUZZJtU3StypGbDWVW1kxXYGiCI7blNayKHjK4BsumpM0llGDcmDKRuY-aeENnbIi0Vo1jT84Wsedn-tlnSMYe6-JkCA2vlEIRgJ-7Hs-OuVwjvbgGI1TI-O3hLnDr1HUyYwQ&nid=18055128&ogV=-12"