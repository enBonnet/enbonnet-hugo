---
title: "Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify"
date: 2019-10-25T22:23:15.546Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593532047/xvmu0d7v171kmbdzm0va.jpg
description: Parte 4 de la guía para construir un blog con Gatsby y Strapi, enfocado en el despliegue de Gatsby en Netlify, con un proyecto base en Github e integración continua
public: true
---
Este artículo es la parte 4 de la guía "Construyendo un blog con Gatsby y Strapi" en esta parte nos enfocaremos en desplegar Gatsby sobre Netlify, si quieres mirar los artículos anteriores o siguientes:
- [Construyendo un blog con Gastby y Strapi, parte 0](https://enbonnet.me/article/5/construyendo-un-blog-con-gatsby-y-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 1 - Configurando Strapi](https://enbonnet.me/article/39/construyendo-un-blog-con-gastby-y-strapi-parte-1-configurando-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby](https://enbonnet.me/article/40/construyendo-un-blog-con-gastby-y-strapi-parte-2-configurando-gatsby)
- [Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku](https://enbonnet.me/article/41/construyendo-un-blog-con-gastby-y-strapi-parte-3-desplegando-strapi-en-heroku)
- [Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción](https://enbonnet.me/article/43/construyendo-un-blog-con-gastby-y-strapi-parte-5-integrando-gatsby-strapi-y-cloudinary-en-produccion)

## Versionar cambios

Para desplegar en Netlify podemos hasta arrastrar una carpeta, soltarla sobre el recuadro de Netlify y funcionará pero cuando queremos disfrutar de todas las bondades de integración continua que nos ofrece Netlify también de forma gratuita lo mejor es tener nuestro proyecto versionado con Git, lo puedes subir a Github, Gitlab o Bitbucket. Ya que Netlify es compatible con cualquiera de estos, en este caso utilizaré Github como ejemplo.
Lo primero en nuestro proyecto de Gatsby:

```shell
git init
git add .
git commit -m "primer commit antes del despliegue"
```

## Crear un proyecto en Github

Creamos un proyecto en github y agregamos la rama remota a nuestro proyecto git local
![Crear nuevo proyecto publico](https://res.cloudinary.com/enbonnet/image/upload/v1572055805/mxzneo40n0nsyttij9se.png)
 
```shell
git remote add origin git@github.com:usuario/ejemplo-gatsby.git
git push -u origin master
```
 
![Comandos para agregar rama remota a un repositorio local](https://res.cloudinary.com/enbonnet/image/upload/v1572055805/fwehvmiyb7bzlnxbe18p.png)
 
Ejemplo de los comandos que deberíamos ejecutar si tu proyecto se llamará "ejemplo-gatsby" como es mi caso.
 
## Conectar con el proyecto de Strapi que está en Heroku
Ahora debemos decirle a Gatsby de donde buscar la información, ya no será en nuestro localhost sino en el proyecto que hemos desplegado en Heroku, por ello en el archivo `gatsby-config.js` justo en la configuración del plugin `gatsby-source-strapi`

```javascript
    {
      resolve: "gatsby-source-strapi",
      options: {
        // Debemos cambiar la URL de la API aquí
        // Atento a que no termine en / porque no funcionara, debe de ser tal cual como esta
        apiURL: "https://tu-api-de-strapi.heroku.com",
        contentTypes: [
          "articulo"
        ],
        queryLimit: 1000,
      },
    },
```

Luego de hacer este cambio los debemos versionar para subirlo a github:
 
```shell
git add .
git commit -m "cambio de apiURL"
git push origin master # Para subir los cambios
```
 
## Accedemos a Netlify
 
- Lógin de [Netlify](https://app.netlify.com/)
- Completamos los datos ó utilizas alguna cuenta de acceso como Github
 
## Seleccionar repositorio en Netlify
 
- New site from Git
- Github
- Buscamos el nombre de nuestro repositorio, lo seleccionamos y completamos los datos de deploy. En el caso de Gatsby, Netlify los reconoce automaticamente
![Buscando repositorio por el nombre](https://res.cloudinary.com/enbonnet/image/upload/v1572055805/imdysmocavhkobnws9w3.png)
- Ejemplo de la configuración para integración continua de la rama master
![Configuración para la integración continua de master](https://res.cloudinary.com/enbonnet/image/upload/v1572055805/cnajs9lqm1un9gzuf22j.png)
- Aceptar
 
En este momento se comienza a ejecutar el primer despliegue de tu aplicación de Gatsby en Netlify y de esta forma tendrás configurado la integración continua, cada vez que hagas un `git push` o `git merge` a la rama master se generará un nuevo despliegue del sitio.
 
Una vez esté desplegado nuestra aplicación podremos acceder a ella por la URL que genera Netlify por defecto, en mi caso fue [serene-booth-4d0954.netlify.com](serene-booth-4d0954.netlify.com)
 
## Generar hook para desplegar desde Strapi
 
Ahora necesitamos tener una forma de avisarle a Netlify que el contenido en Strapi se actualizo para eso utilizaremos los Hooks de Netlify, para ello en Netlify:
 
- Settings
- Build & Deploy
- Sección de "Build Hooks"
- Add build hook
- Colocas el nombre de tu preferencia, ejemplo "DespligueDesdeStrapi"
- Aceptar
- Te entregará una URL como esta `https://api.netlify.com/build_hooks/5db3b003443as17ce0db516z`
- Tenla a mano que la usaremos en el próximo paso
 
Continua con: [Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción](https://enbonnet.me/article/43/construyendo-un-blog-con-gastby-y-strapi-parte-5-integrando-gatsby-strapi-y-cloudinary-en-produccion)
