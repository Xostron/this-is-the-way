# 1 этап - скачиваем сайт
FROM node:18 as scraper
# Создаем директорию
WORKDIR /scraper
# Копируем сюда package
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем в контейнер файл scraper.js
COPY scraper.js ./
# Запускаем скрипт
RUN node scrapper4.js

#2 этап подготавливаем сайт
FROM node:18 as build
# Создаем директорию
WORKDIR /front

# Этап 3: запуск через Nginx
FROM nginx:alpine
COPY --from=scraper /scraper/front_temp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]