FROM mysql:8.0.22

ENV MYSQL_ROOT_PASSWORD=my
ENV MYSQL_USER=oshi
ENV MYSQL_PASSWORD=uruka
ENV MYSQL_DATABASE=CubeBuster

COPY SQLFiles/INIT.sql /docker-entrypoint-initdb.d
COPY SQLFiles/* .

