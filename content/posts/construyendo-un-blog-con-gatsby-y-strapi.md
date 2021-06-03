---
title: "Construyendo un blog con Gatsby y Strapi"
date: 2019-10-24T12:00:58.406Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531991/jysxqbqpsaceys0mak0v.jpg
description: Inicio del tutorial para construir un blog con Gatsby y Strapi, parte 0. Las definiciones de lo que puedes esperar de esta guía y los requisitos técnicos que necesitas par acompletarla
public: true
---
Si estas aquí es porque seguramente en algún momento te has visto con ganas de crear un blog, un sitio web estático, pero quizás la opción más común ~~wordpress~~ no te parece la mejor, muchas veces puede ser como intentar matar una hormiga con un misil nuclear, aunque tiene millones de tutoriales, plugins e integraciones y para a fecha soporta alrededor del 30% del internet también tenemos otra opciones y una de esas opciones pueden ser [Gatsby](https://www.gatsbyjs.org) como parte del [JAMstack](https://jamstack.wtf/#what-is-jamstack) ~~no, no el amplificador de guitarras~~ y [Strapi](https://strapi.io/) como el gestor de contenidos ~~CMS~~ ambos son herramientas de código abierto que puedes utilizar según lo necesites.
 
En este tutorial que espero dividir en un grupo de artículos quiero explicarte cómo construir un blog de 0 a 100 totalmente gratuito con el stack de Gatsby y Strapi, desplegado finalmente en [Netlify](https://www.netlify.com/) y [Heroku](http://heroku.com). Para comenzar vale la pena definir algunos conceptos.
 
## ¿Que es Gatsby?
 
En este conjunto de herramientas será el encargado de mostrar el contenido al usuario, o mejor conocido como el Frontend, aquí vivirán las acciones de javascript, estilos y llamados a la API que sean necesario. Gatsby está apoyando por una gran comunidad y su principal novedad es la cantidad de plugins que tiene para integrar fuentes de datos, por ejemplo: redes sociales, wordpress, otros sitios y claro alguna api o más... Se auto define como `Un generador de sitios estáticos ligeros` adicional a esto también vienen incluidos los plugins que necesitas para construir una PWA, todo esto muy sencillo y muy bien documentado en su [sitió web oficial](https://www.gatsbyjs.org/docs/).
 
## ¿Que es Strapi?
 
Si has buscado alternativas a wordpress seguramente viste muchas opciones: [Netlify Cms](https://www.netlifycms.org/), [Ghost](https://ghost.org/), [Jekyll](https://jekyllrb.com/), [Drupal](https://www.drupal.org/), [Textpattern](https://textpattern.com/), [Contentful](https://www.contentful.com/), [Sanity](https://www.sanity.io/), [DatoCMS](https://www.datocms.com/) y [muchos más](https://www.gatsbyjs.org/docs/headless-cms/)... Como te puedes imaginar hay muchas alternativas y cada una varía en cantidad de editores, precio, algunos gratuitos pero con otras limitaciones, hace poco también se anunció que puedes usar [dev.to](https://dev.to) como un gestor de contenido para tu blog, con Gatsby es simplemente usar [este plugin](https://github.com/geocine/gatsby-source-dev).

Strapi es uno de estas alternativas pero tiene las bondades de ser de código abierto y totalmente gratuito, funciona como un CMS sin cabeza, lo que nos permite administrar el contenido de nuestro blog o sitio web de manera independiente a la aplicación en donde lo mostramos, exponiendo esos datos por medio de una API. Otra de las bondades que me gustó mucho de Strapi fue poder crear los "Tipos de contenido" puede crear las tablas donde almacenará el contenido que desee, en el caso de este blog que estas leyendo cada artículo tiene un campo: título, contenido, público ?, descripción e imagen. Pero tú puedes agregar más o menos campos según lo requieras.
 
## ¿Que es Netlify?
 
Servicio que te permite desplegar sitios estáticos con unos pocos clicks, con integración continua, https y más... es el servicio que usaremos para desplegar el frontend de nuestro blog, uno de mis servicios favoritos al momento de desplegar sitios estáticos, tiene integraciones listas que en otras plataformas te pueden tomar un tiempo considerable configurarlas.
 
## ¿Que es Heroku?
 
Es un proveedor de PaaS ~~listo podemos continuar, dad joke, disculpa~~ por sus siglas en español será Plataforma como servicio, similar a lo que hacer Netlify, aunque Heroku es mucho más dinámico, te provee de un servidor con un entorno preconfigurado con el lenguaje de programación que necesite tu proyecto simplificando toda la tarea de tener que instalar un servidor, con capa de seguridad, firewall, configurar puertos, configurar dominios, instalar certificados... ~~si continuo con esta lista nunca terminaré~~ mejor ve todo lo que tiene en su [sitió web](http://heroku.com).
 
Con esto claro ahora necesitamos verificar que tenemos todas las dependencias técnicas:


- Node 10 o superior, sino descargalo [aquí](https://nodejs.org/es/download/).
- Npm 6 o superior, viene incluido con nodejs.
- Yarn 1.10 o superior, sino descargalo [aquí](https://yarnpkg.com/lang/en/docs/install/).
- Cuenta en Github, sino registraté [aquí](https://github.com/join?source=header-home).
- Cuenta en Heroku, sino registraré [aquí](https://signup.heroku.com/).
- Cuenta en Netlify ¡Puedes usar la cuenta de Github!.
- Cuenta en Cloudinary, sino la tienes registrate [aquí](https://cloudinary.com/users/register/free).

Con todo esto listo podemos comenzar, para poder avanzar de un forma más amigable decidi dividir el contenido de esta guía en varios articulos ~~estas en la parte 0~~ que puedes seguir en este orden:

- [Construyendo un blog con Gastby y Strapi, parte 1 - Configurando Strapi](https://enbonnet.me/article/39/construyendo-un-blog-con-gastby-y-strapi-parte-1-configurando-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby](https://enbonnet.me/article/40/construyendo-un-blog-con-gastby-y-strapi-parte-2-configurando-gatsby)
- [Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku](https://enbonnet.me/article/41/construyendo-un-blog-con-gastby-y-strapi-parte-3-desplegando-strapi-en-heroku)
- [Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify](https://enbonnet.me/article/42/construyendo-un-blog-con-gastby-y-strapi-parte-4-desplegando-gatsby-en-netlify)
- [Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción](https://enbonnet.me/article/43/construyendo-un-blog-con-gastby-y-strapi-parte-5-integrando-gatsby-strapi-y-cloudinary-en-produccion)
 
Al terminar esta guía espero que conozcan el potencial que tienen estas dos herramientas trabajando en conjunto, lo fácil que puede ser el proceso de levantar un proyecto y de muy bajo costo al momento de mantener, espero se animen a mostrar los resultados de lo que hagan por twitter a [@enBonnet](https://twitter.com/enbonnet) eso me motivaría mucho a seguir haciendo este tipo de guías y seguir compartiendo conocimientos.
