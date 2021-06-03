---
title: "Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción"
date: 2019-10-25T22:53:48.413Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593532131/xm2jsv1nwpb7lfax016q.jpg
summary: Parte 5 de la guía para construir un blog con Gatsby y Strapi, en integrar los proyectos desplegados en producción y cloudinary
draft: false
---
Este artículo es la parte 5 de la guía "Construyendo un blog con Gatsby y Strapi" en esta parte nos enfocaremos en integrar los proyectos desplegados en producción y Cloudinary, si quieres mirar los artículos anteriores:

- [Construyendo un blog con Gastby y Strapi, parte 0](https://enbonnet.me/article/5/construyendo-un-blog-con-gatsby-y-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 1 - Configurando Strapi](https://enbonnet.me/article/39/construyendo-un-blog-con-gastby-y-strapi-parte-1-configurando-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby](https://enbonnet.me/article/40/construyendo-un-blog-con-gastby-y-strapi-parte-2-configurando-gatsby)
- [Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku](https://enbonnet.me/article/41/construyendo-un-blog-con-gastby-y-strapi-parte-3-desplegando-strapi-en-heroku)
- [Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify](https://enbonnet.me/article/42/construyendo-un-blog-con-gastby-y-strapi-parte-4-desplegando-gatsby-en-netlify)

## Conectar Strapi con Netlify

Así como conectamos el proyecto desplegado en Netlify con Strapi, para que pudiera leer los datos tambíen necesitamos conectar el proyecto de Strapi con Netlify, para que cuando subamos, actualicemos o borremos un contenido se actualice el proyecto en Netlify y de esta forma puedan estar sincronizados de manera automática, para ello generamos un Hook en Netlify que viene siento una URL que nos expone una función.
 
Para esto vamos al proyecto de Strapi en el archivo `/config/environments/production/custom.json` y temos que agregar la URL que nos entrego Netlify cuando creamos el hook `https://api.netlify.com/build_hooks/5db3b003443as17ce0db516z` nuestro archivo `custom.js` debería verse similar a este:

```javascript
{
  "myCustomConfiguration": "This configuration is accessible through strapi.config.environments.production.myCustomConfiguration",
  "staticWebsiteBuildURL": "https://api.netlify.com/build_hooks/5db3b003443as17ce0db516z"
}
```

Luego para indicar en qué momento debes gatillar la acción debemos modificar el archivo `/api/articulo/models/Articulo.js` y agregar los siguientes métodos:

```javascript
'use strict';

// Para manejar los request
const axios = require('axios');

/**
 * Lifecycle callbacks for the `Articulo` model.
 */

module.exports = {
...

// Para que se ejecute cada vez que creamos un articulo nuevo
afterCreate: async entry => {
    axios
      .post(strapi.config.currentEnvironment.staticWebsiteBuildURL, {})
      .catch(() => {
        // Ignore
      });
  },

// Para que se ejecute cada vez que actualizamos un articulo
afterUpdate: async entry => {
    axios
      .post(strapi.config.currentEnvironment.staticWebsiteBuildURL, {})
      .catch(() => {
        // Ignore
      });
  },

// Para que se ejecute cada vez que borramos un articulo
afterDestroy: async entry => {
    axios
      .post(strapi.config.currentEnvironment.staticWebsiteBuildURL, {})
      .catch(() => {
        // Ignore
      });
  },

...
};
```

## Agregamos axios
 
```shell
yarn add axios
```
 
## Actualizamos el despliegue en heroku
 
```shell
git add .
git commit -m "agregando webhook para netlify"
git push heroku master
# Y en github si tienes un repositorio adicional
git push origin master
```
 
## Utilizar Cloudinary en Strapi

Este es uno de los cambios que necesitamos hacer en local, ya que por seguridad strapi no permite instalar plugins en producción, debido a que la máquina de heroku se apaga necesitamos un lugar externo donde persistir las imágenes.
 
Por suerte Strapi nos da la facilidad de utilizar un plugin para configurar Cloudinary como host de imagenes, en el proyecto de Strapi:
 
```shell
yarn add strapi-provider-upload-cloudinary
```
 
Con esto agregamos el plugin y debemos subir los cambios para que se desplieguen en Heroku
 
```shell
git add .
git commit -m "Instalado Cloudinary Plugin"
git push heroku master
```
En cuanto termine de realizarse el despliegue en Heroku, debemos configurar en la interface que las imágenes se guarden en Cloudinary, necesitarás las credenciales que te entrega la Consola de Claudinary para conectarte.
 
Ahora vamos a el panel de administración de Strapi, en mi caso [https://morning-sands-09427.herokuapp.com/admin/](https://morning-sands-09427.herokuapp.com/admin/) ingresamos y:
 
- En la sección de "General"
- Click en "Plugin"
- Luego en la tuerca de configuración de File Upload
- En la pestaña "Production"
- Cambiamos el Proveedor de Local service a Cloudinary
- Rellenamos los datos Cloud name, API Key y Secret Key que nos entrega Cloudinary
- Guardar y listo
 
Ahora en adelante las imágenes que subamos a Strapi se guardarán en Cloudinary y de esa forma los podemos persistir.
 
## Ejemplos de los proyectos hasta este punto
 
### Gatsby
 
Repositorio: [github.com/enBonnet/ejemplo-gatsby](https://github.com/enBonnet/ejemplo-gatsby)
Demo: [serene-booth-4d0954.netlify.com](https://serene-booth-4d0954.netlify.com)
 
### Heroku
 
Repositorio: [github.com/enBonnet/ejemplo-strapi](https://github.com/enBonnet/ejemplo-strapi)
Demo: [morning-sands-09427.herokuapp.com](https://morning-sands-09427.herokuapp.com)
 
## Extras SEO, Imagenes y Markdown

Si estos artículos les parecen útiles puedo continuar con unos extras de como mejorar el SEO de los artículos en cada página, como poder agregar imagenes a cada post, manejar contenido con estilos Markdown en el contenido de los posts y como convertir su aplicación en una PWA que puedan instalar en sus teléfonos.
 
## Saludos

Espero que haya sido útil esta guía y como siempre estoy a la disposición de responder dudas o sugerencias que tengas, siempre me puedes contactar por twitter a [@enBonnet](https://twitter.com/enbonnet) y comentarme, sería genial si te animás a mostrarme un poco más de lo que lograste hacer siguiendo este guía, espero dejes volar tu creatividad y le saques el máximo provecho.
