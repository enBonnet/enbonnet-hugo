---
title: "Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku"
date: 2019-10-25T21:30:25.371Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593532028/zkkvliimjbcbl9imhxsc.jpg
description: Parte 3 de la guía para construir un blog con Gatsby y Strapi, enfocado en el despliegue de Strapi en Heroku, utilizando una base de datos postgres 
public: true
---
Este artículo es la parte 3 de la guía "Construyendo un blog con Gatsby y Strapi" en esta parte nos enfocaremos en desplegar Strapi sobre Heroku, si quieres mirar los artículos anteriores o siguientes:
 
- [Construyendo un blog con Gastby y Strapi, parte 0](https://enbonnet.me/article/5/construyendo-un-blog-con-gatsby-y-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 1 - Configurando Strapi](https://enbonnet.me/article/39/construyendo-un-blog-con-gastby-y-strapi-parte-1-configurando-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby](https://enbonnet.me/article/40/construyendo-un-blog-con-gastby-y-strapi-parte-2-configurando-gatsby)
- [Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify](https://enbonnet.me/article/42/construyendo-un-blog-con-gastby-y-strapi-parte-4-desplegando-gatsby-en-netlify)
- [Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción](https://enbonnet.me/article/43/construyendo-un-blog-con-gastby-y-strapi-parte-5-integrando-gatsby-strapi-y-cloudinary-en-produccion)


## Instalando las herramientas de consola para Heroku
 
### Para Ubuntu/Debian
 
```bash
wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh
```
 
### Para MacOS
 
```bash
brew install heroku/brew/heroku
```
Necesitas tener [homebrew](https://brew.sh/) en instalado
 
### Para Windows
 
Tienen las versiones de [32 bits](https://cli-assets.heroku.com/heroku-win32-x86.tar.gz) y [64 bits](https://cli-assets.heroku.com/heroku-win32-x64.tar.gz) elige e instala la que sea compatible con tú sistema.
 
## Iniciar sesión con Heroku
 
```bash
heroku login
```
 
Te pedirá que toques cualquiera tecla para abrir un navegador donde debes completar los datos de tu cuenta y ya haber iniciar sesión en tu cuenta de Heroku

## Ahora de regreso al proyecto de Strapi

## Iniciar git
 
```bash
git init
git add .
git commit -m "base de configuraciones para strapi"
```
 
Con estos comandos habrás iniciado git, agregado todos los cambios que hayas hecho en la configuración de Strapi.
 
## Crear una aplicación en Heroku
 
```bash
heroku create
```
![Respuesta de heroku create](https://res.cloudinary.com/enbonnet/image/upload/v1572054625/ji4mhqtyeyaxo77ebiog.png)
 
Tambíen puedes definir un nombre para tu aplicación
 
```bash
heroku create nombre-de-mi-app
```
 
## Instalar base de datos
 
No temas, esto parece un proceso complejo pero con Heroku resulta bastante sencillo:
 
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

Puede que nos pida indicarle el nombre exacto de la app a la cual queremos agregarle el complemento, para eso usamos el parametro `--app=nombre-de-tu-app`

```bash
heroku addons:create heroku-postgresql:hobby-dev --app=morning-sands-09427
```
 
Este comando instalará un plugin de Heroku en tu aplicación, luego para configurarlo debemos ejecutar:
 
```bash
heroku config
```
 
Te mostrará una URI de configuración similar a esta: `DATABASE_URL: postgres://ebitxebvixeeqd:dc59b16dedb3a1eef84d4999sb4baf@ec2-50-37-231-192.compute-2.amazonaws.com: 5432/d516fp1u21ph7b`
 
Esta URI incluye los datos de ```*postgres://NOMBRE_DE_USUARIO : CLAVE @ HOST : PUERTO : NOMBRE_DE_LA_BASEDEDATOS``` estos datos los usaremos para configurar el las variables de entorno de tu aplicación, de esta forma se podrá comunicar con tu base de datos
 
```bash
heroku config:set DATABASE_USERNAME=ebitxebvixeeqd
heroku config:set DATABASE_PASSWORD=dc59b16dedb3a1eef84d4999a0be041bd419c474cd4a0973efc7c9339afb4baf
heroku config:set DATABASE_HOST=ec2-50-37-231-192.compute-2.amazonaws.com
heroku config:set DATABASE_PORT=5432
heroku config:set DATABASE_NAME=d516fp1u21ph7b
```
 
Ejecutamos cada uno de estos comandos cambiando la información por la que nos dió el comando `heroku config`
 
Ahora ya tendríamos las variables de entorno de nuestra base de datos configuradas en el entorno de la aplicación, nos falta decirle a Strapi, cuales son estas variables, para ello, en el archivo `/config/environments/production/database.json` colocamos lo siguiente:


```javascript
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "strapi-hook-bookshelf",
      "settings": {
        "client": "postgres",
        "host": "${process.env.DATABASE_HOST}",
        "port": "${process.env.DATABASE_PORT}",
        "database": "${process.env.DATABASE_NAME}",
        "username": "${process.env.DATABASE_USERNAME}",
        "password": "${process.env.DATABASE_PASSWORD}",
        "ssl": true
      },
      "options": {}
    }
  }
}

```

Y por último instalamos el paquete de npm para que el orm se pueda conectar por postgres:
 
```bash
yarn add pg
```
 
En este punto ya tendremos toda la base de datos configurada y lista para conectarse con Strapi
 
## Agregando últimos cambios
 
```bash
git add .
git commit -m "actualizar configuracion de db"
```
 
De esta forma guardamos los cambios que hicimos a la configuración de la base de datos y estamos listos para el despliegue
 
## Despliegue
 
```bash
git push heroku master
```
 
Este comando demorará un par de minutos, pero subirá todo tu proyecto a la aplicación de heroku y te mostrará una url similar a esto `https://mighty-taiga-80884.herokuapp.com` al acceder allí podrás ver toda tu aplicación de Strapi.
 
No tendrás los artículos allí porque la base de datos de desarrollo o local es diferente que la de producción.
 
Ahora con cada cambio que hagas por ejemplo agregar un Tipo de contenido nuevo, deberías de:
 
```bash
git add .
git commit -m "mensaje que represente los cambios"
git push heroku master
```
 
De esta forma se actualizará tu aplicación, algunas configuraciones de Strapi se pueden hacer solo en ambiente de desarrollo esto por seguridad, pero puedess ver más información sobre esto en la [documentación](https://strapi.io/documentation/3.0.0-alpha.x/guides/deployment.html#heroku) al igual que puedes encontrar otras alternativas a Heroku por si quieres subir tu proyecto a [Digital Ocean](https://strapi.io/documentation/3.0.0-alpha.x/guides/deployment.html#digital-ocean) o [AWS](https://strapi.io/documentation/3.0.0-alpha.x/guides/deployment.html#amazon-aws)
 
En este punto también te recomiendo crear un repositorio en github para guardar tu proyecto de Strapi, de esa forma puedes subir tus cambios a Github y luego a Heroku para desplegarlos.
 
## Acceder al sitio desplegado

```shell
heroku open
```

Nos debe abrir una nueva pestaña en nuestro navegador que apunta a URL de nuestra aplicación, como es una nueva base de datos, nos solicitará de nuevo llevar el formulario para crear un administrador, luego de crearlo debemos ir de nuevo a Roles y permisos para darle permisos publicos a los artículos `find` y `findone` guardamos y podemos probar en la URL que funcione, adicional a esto puedes agregar artículos de prueba con texto de relleno para probar mejor.

En mi caso la URL de la API es [https://morning-sands-09427.herokuapp.com/articulos](https://morning-sands-09427.herokuapp.com/articulos) allí pueden ver que agregue los mismos artículos que tenía en la plataforma de desarrollo para mantener los mismos ejemplos, para lograr esto tuve que volver a agregarlos uno por uno.

Te recomiendo tener al menos 1 artículo antes de continuar, en dado caso el deploy en Netlify de Gatsby puede fallar.

Ahora tenemos desplegado Strapi en Heroku, nos falta desplegar Gatsby en Netlify para poder tener toda nuestra aplicación disponible.
 
Continua con: [Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify](https://enbonnet.me/article/42/construyendo-un-blog-con-gastby-y-strapi-parte-4-desplegando-gatsby-en-netlify)
