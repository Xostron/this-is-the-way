# 1 этап - скачиваем сайт
FROM node:22 as scraper
# Создаем директорию
WORKDIR /scraper
# Копируем package
COPY package*.json ./
# Копируем скрипт scraper
COPY scraper/index.js ./
# Установка системных зависимостей для Chrome + установка npm-пакетов
RUN apt-get update && \
	apt-get install -yq \
	wget \
	gnupg \
	ca-certificates \
	fonts-liberation \
	libasound2 \
	libatk-bridge2.0-0 \
	libatk1.0-0 \
	libc6 \
	libcairo2 \
	libcups2 \
	libdbus-1-3 \
	libexpat1 \
	libfontconfig1 \
	libgbm1 \
	libgcc1 \
	libglib2.0-0 \
	libgtk-3-0 \
	libnspr4 \
	libnss3 \
	libpango-1.0-0 \
	libpangocairo-1.0-0 \
	libstdc++6 \
	libx11-6 \
	libx11-xcb1 \
	libxcb1 \
	libxcomposite1 \
	libxcursor1 \
	libxdamage1 \
	libxext6 \
	libxfixes3 \
	libxi6 \
	libxrandr2 \
	libxrender1 \
	libxss1 \
	libxtst6 \
	lsb-release \
	xdg-utils \
	&& rm -rf /var/lib/apt/lists/*
# Устанавливаем зависимости
RUN npm install
# Запускаем скрипт
RUN node ./index.js --url https://www.npmjs.com/package/zigbee-clusters --keyword pinUp 

# Этап 2: запуск через Nginx
FROM nginx:alpine
COPY --from=scraper /scraper/front_temp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]