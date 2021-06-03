---
title: "Construyendo un blog con Gastby y Strapi, parte 1 - Configurando Strapi"
date: 2019-10-25T17:18:00.351Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593532011/xtguzkwvxel6z7oumffm.jpg
summary: Parte 1 de la guía para construir un blog con Gatsby y Strapi, enfocado en la configuración de Strapi para poder consumir los artículos como una API.
draft: false
---
Este artículo es la parte 1 de la guía "Construyendo un blog con Gatsby y Strapi" en esta parte nos enfocaremos en configurar Strapi par que podamos consumir la data tal cual como una API, si quieres mirar los artículos anteriores o siguientes:
 
- [Construyendo un blog con Gastby y Strapi, parte 0](https://enbonnet.me/article/5/construyendo-un-blog-con-gatsby-y-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby](https://enbonnet.me/article/40/construyendo-un-blog-con-gastby-y-strapi-parte-2-configurando-gatsby)
- [Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku](https://enbonnet.me/article/41/construyendo-un-blog-con-gastby-y-strapi-parte-3-desplegando-strapi-en-heroku)
- [Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify](https://enbonnet.me/article/42/construyendo-un-blog-con-gastby-y-strapi-parte-4-desplegando-gatsby-en-netlify)
- [Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción](https://enbonnet.me/article/43/construyendo-un-blog-con-gastby-y-strapi-parte-5-integrando-gatsby-strapi-y-cloudinary-en-produccion)
 
## Crear un nuevo proyecto con Strapi
 
```bash
yarn create strapi-app my-project --quickstart
```
 
Con este simple comando podremos crear un proyecto, puedes cambiar el parámetro `my-project` para personalizar el nombre de tu proyecto. Demorará un par de minutos y luego se levantará una ventana en la que podrás acceder al panel de administración.

![Consola al momento de terminar la ejecución del comando](https://res.cloudinary.com/enbonnet/image/upload/v1572048062/m9hxjoyqtr8uzo2pd1w7.png)
 
## Crear un usuario administrador
 
Ve a la url del panel `http://localhost:1337/admin`

![Formulario de Strapi para crear el primer administrador](https://res.cloudinary.com/enbonnet/image/upload/v1572048062/th9nxgq3msn8jgh5s2yp.png)
 
- Completa el formulario
- El nombre será el usuario que usarás para ingresar al panel de administración
- Listo!
 
Al ingresar puedes cambiar el idioma del panel en la esquina superior derecha, click -> ES. Aunque la interfaz es bastante intuitiva como lo descubrirás.
 
## Crear el primer tipo de contenido, en nuestro caso son artículos
 
En la sección de PLUGINS navegamos hasta el "Constructor de Tipos de Contenido"

![Panel para agregar nuevo contenido](https://res.cloudinary.com/enbonnet/image/upload/v1572048401/u3zw06c98oe5gkcsznnx.png)
 
- Click en "Agregar tipo de contenido"
- Escribir "artículo", si en singular, y luego "listo"
- Se abrirá otra modal con opciones de campos
- Elegimos un campo de tipo String o Cadena de texto
- Le damos el nombre de "título"
- En esa misma modal en la pestaña de Opciones Avanzadas
- Marcar las casilla de Campo requerido y Campo único, listo
- Luego click en la opción de "Agregar un nuevo campo"
- Tipo Rich text o Texto enriquecido
- En el nombre "descripción"
- De nuevo en la pestaña de Opciones Avanzadas, marcalo como requerido
- Y listo, guardar tipo de contenido
 
![Resultado de la creación de un nuevo tipo de contenido](https://res.cloudinary.com/enbonnet/image/upload/v1572048401/xtfnjnjt4gyhpmz4l1ab.png)

Si analizas los que acabamos de hacer es crear una tabla en la base de datos que almacene los artículos, y cada articulo tiene un título y una descripción.
 
## Configurar roles y permisos
 
En la sección de PLUGINS navegamos hasta "Roles y Permisos"
 
- Click en el rol Público
- Buscar los permisos para el tipo de contenido "artículos"
- Marcar find y findone

![Ejemplo de permisos](https://res.cloudinary.com/enbonnet/image/upload/v1572048687/jcrsvbtyvndeyx0q3yqo.png)
 
Ahora le damos permisos públicos para que los usuarios puedan buscar todos los artículos o uno en específico
 
## Listo ahora tienes una API
 
Si visitamos la URL `http://localhost:1337/articulos` podrás ver un JSON vació porque aún no agregamos ningún artículo
 
## Agregando el primer artículo
 
En la sección TIPOS DE CONTENIDOS o CONTENT TYPE:
 
- Click en Artículos
- Click en "Agregar nuevo artículo"
- Llenamos los campos, título y descripción
- Guardar y listo
 
Si vuelves a consultar la url `http://localhost:1337/articulos` podrás ver el articulo que acabas de escribir.

![Articulos agregados de prueba con Lorem Ipsum](https://res.cloudinary.com/enbonnet/image/upload/v1572048687/h1jzqps9ka9ofhenzp6u.png)
 
Si quieres indagar un poco más en configuraciones y opciones que tienes disponibles para contolar con Strapi no te pierdas su [documentación](https://strapi.io/documentation/3.0.0-beta.x/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project).
 
Ahora ya tenemos listo el gestor de contenidos y la api para nuestro blog, ahora nos falta poder leer esos endpoint y allí es donde entra en juego Gatsby
 
Continua con: [Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby](https://enbonnet.me/article/40/construyendo-un-blog-con-gastby-y-strapi-parte-2-configurando-gatsby)
