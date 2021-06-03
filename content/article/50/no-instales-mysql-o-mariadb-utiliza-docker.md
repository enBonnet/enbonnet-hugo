---
title: "No instales Mysql o Mariadb, utiliza docker"
date: 2020-04-19T16:39:08.834Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531211/sqfpcslab7khpq5ipsxu.jpg
summary: Poder utilizar una base de datos mysql o mariadb sin necesidad de instalar en tu sistema.
draft: false
---
En cada uno de los comandos que verás en esta guía puedes sustituir `mysql` por `mariadb` y funcionará de la misma manera.

Necesitaremos `docker-compose` puedes ver como instalarlo [aquí](https://docs.docker.com/compose/install/).

Para utilizar la imagen de mysql en Docker, lo primero es bajarla a nuestro computador:
 
```bash
docker pull mysql
```
 
Este comando bajara la última versión de la imagen que esté disponible en el repositorio de imágenes de docker, si necesitas una versión específica puedes usar:
 
```bash
docker pull mysql:[tag_version]
```

Luego agregando un archivo `docker-compose.yml`, en un directorio de fácil acceso o en la raíz de tu proyecto:

```yml
version: "3.3"

services:
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_DATABASE: test
      MYSQL_USER: root
      MYSQL_PASSWORD: root
      MYSQL_ROOT_PASSWORD: root
    ports:
      - "3306:3306"
    expose:
      - "3306"
    volumes:
      - mydb-db:/var/lib/mysql

volumes:
  mydb-db:

```

En este archivo estamos configurando las variables para mysql `MYSQL_DATABASE` es el nombre de la base de datos, `MYSQL_USER` el usuario, `MYSQL_PASSWORD` la clave de dicho usuario y `MYSQL_ROOT_PASSWORD` la clave del usuario root, que se agrega por buenas prácticas, además del volumen donde vamos a persistir los datos de nuestro base de datos.

Luego de que tienes este archivo solo hace falta ejecutar el comando

```bash
docker-compose up -d
```

¡Y listo! Tendrás `mysql` o `mariadb` corriendo en un contenedor de docker.

