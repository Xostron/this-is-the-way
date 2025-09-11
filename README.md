# PORT

# Back

Back_n1 5100
Запуск:  docker run -p 5100:5100 --name back-n1 image-back-n1

# Front

tw4-react 5000
Запуск: docker run -d -p 5000:80 --name front-tw4 image-front-tw4

# compose back-n1 + tw4-react^
docker-compose up --build