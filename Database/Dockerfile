FROM mysql:8.0.22

ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_USER=server
ENV MYSQL_PASSWORD='password123456789'
ENV MYSQL_DATABASE='CubeBuster'

COPY SQLFiles/INIT.sql /docker-entrypoint-initdb.d
COPY SQLFiles/* .

