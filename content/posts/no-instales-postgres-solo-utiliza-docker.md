---
title: "No instales postgres, solo utiliza docker"
date: 2019-10-12T22:03:23.036Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593530680/cmw4tvn6sal5dmm1cdsr.jpg
description: Comandos que necesitas para desplegar un contenedor docker que tenga de base la imagen oficial de postgres y algunas configuraciones
public: true
---
Para utilizar la imagen de Postgres en Docker, lo primero es bajarla a tu computador:
 
```bash
docker pull postgres
```
 
Este comando bajara la última versión de la imagen que esté disponible en el repositorio de imágenes de docker, si necesitas una versión específica puedes usar:
 
```bash
docker pull postgres:[tag_version]
```
 
Ahora necesitaremos un directorio para poder persistir los datos en la base de datos. Con el siguiente comando crearás en tu directorio Home las rutas docker, volumes y postgres recursivamente
 
```bash
mkdir -p $HOME/docker/volumes/postgres
```
 
Ahora que tienes la imagen de postgres que quieres utilizar y el directorio donde persistir los datos, solo queda iniciar el contenedor
 
```bash
docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres
```
 
¿Qué está pasando aquí? Un comando con mucho parámetros para ejecutar un contenedor, ¿Que le estás diciendo?
 
- rm: Automáticamente remueve el contenedor en caso de que esté duplicado, es una práctica recomendada para evitar conflictos de memoria.
- name: El nombre que tendrá el contenedor
- e: Te permite modificar las variables de entorno que expone el contenedor, en este caso POSTGRES_PASSWORD
- d: Indica que nuestro container se ejecutará en segundo plano
- p: Establece al enrutamiento por puertos, al cual nos conectaremos desde el localhost hacía la base de datos dentro del sistema
- v: Recibe la ruta en donde se debe persistir la data que se encuentre en la ruta de destino `/var/lib/postgresql/data`
 
Ahora el contenedor estará corriendo con la imagen de postgres como base y las configuraciones que le pasaste en el comando anterior, para acceder a la base de datos puedes usar:
 
```bash
psql -h localhost -U postgres -d postgres
```

También puedes utilizar un archivo `docker-compose.yml`, por ejemplo:

```js
version: '3'
services:
  postgresql:
    image: postgres:9.6
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - 5432:5432
    environment:
      - POSTGRES_DB=postgres_db
      - POSTGRES_USER=admin_db
      - POSTGRES_PASSWORD=admin_12345678
volumes:
  postgres-data:
    external: false
```

De esta forma guardas los parmetros que le pasas al comando `docker run...` y para levantarlo solo ejecutas `docker-compose up` y listo!

Gracias a [@lcjury](https://twitter.com/lcjury) por el dato de `docker-compose`.
 
Espero que este post te sea útil para evitar instalar sistemas que son muy pesados directamente en tu `localhost` por otro lado actualmente también tienes la opción de usar [kitematic](https://kitematic.com/) para hacer exactamente lo mismo pero desde una interfaz gráfica.