---
title: "Construyendo un blog con Gastby y Strapi, parte 2 - Configurando Gatsby"
date: 2019-10-25T19:40:46.391Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593532112/jb8ffxlysv14rqtqpqz0.jpg
description: Parte 2 de la guía para construir un blog con Gatsby y Strapi, enfocado en la configuración de Gatsby para poder mostrar los artículos al usuario.
public: true
---
Este artículo es la parte 2 de la guía "Construyendo un blog con Gatsby y Strapi" en esta parte nos enfocaremos en configurar Gatsby para poder mostrar la información que nos expone la API, si quieres mirar los artículos anteriores o siguientes:
 
- [Construyendo un blog con Gastby y Strapi, parte 0](https://enbonnet.me/article/5/construyendo-un-blog-con-gatsby-y-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 1 - Configurando Strapi](https://enbonnet.me/article/39/construyendo-un-blog-con-gastby-y-strapi-parte-1-configurando-strapi)
- [Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku](https://enbonnet.me/article/41/construyendo-un-blog-con-gastby-y-strapi-parte-3-desplegando-strapi-en-heroku)
- [Construyendo un blog con Gastby y Strapi, parte 4 - Desplegando Gatsby en Netlify](https://enbonnet.me/article/42/construyendo-un-blog-con-gastby-y-strapi-parte-4-desplegando-gatsby-en-netlify)
- [Construyendo un blog con Gastby y Strapi, parte 5 - Integrando Gatsby, Strapi y Cloudinary en producción](https://enbonnet.me/article/43/construyendo-un-blog-con-gastby-y-strapi-parte-5-integrando-gatsby-strapi-y-cloudinary-en-produccion)
 
## Instalar Gatsby
 
```bash
npm install -g gatsby-cli
```
 
## Crear un nuevo proyecto con Gatsby
 
```bash
gatsby new blog
```

Con este comando crearás un nuevo directorio con el nombre del proyecto `blog` que puedes cambiar por el de tu preferencia.
 
## Ejecutar el proyecto
 
```bash
cd blog
```
Para acceder al directorio
 
```bash
gatsby develop
```
ó
```bash
yarn develop
```

![Consola al momento de ejecutar el proyecto](https://res.cloudinary.com/enbonnet/image/upload/v1572049299/keaungjd22eqjwt5750c.png)

Para ejecutar el proyecto
 
Luego de hacer todo el proceso deberías de poder acceder a las url `http://localhost:8000/` donde puedes ver la aplicación y `http://localhost:8000/___graphql` el playground de Graphql que tiene incluido Gatsby para realizar las consultas a las fuentes de datos.

![El astronauta de Gatsby](https://res.cloudinary.com/enbonnet/image/upload/v1572049300/ien6lq1bayofpilckjns.png)
 
Ahora necesitamos que Gatsby reconozca a Strapi como una fuente de datos y que pueda leer los datos por medio de Graphql pero no hay problemas, ya hay un plugin listo para esto, así como hay para muchas fuentes de datos, puedes ver más [aquí](https://www.gatsbyjs.org/docs/plugins/).
 
## Agregando Strapi como fuente de datos
 
```bash
yarn add gatsby-source-strapi
```
 
De esta forma cargamos a nuestro proyectos el plugin `gatsby-source-strapi`, para configurarlo debemos editar el archivo `gatsby-config.js` en el arreglo de plugins, agregamos:
 
```javascript
...
plugins: [
...
  {
    resolve: "gatsby-source-strapi",
    options: {
      apiURL: "http://localhost:1337",
      contentTypes: [
        // Lista de tipos de contenido que tenemos en Strapi, en singular
        "articulo"
      ],
      queryLimit: 1000,
    },
   },
...
]
...
```
 
Nota: cada vez que modificamos un archivo de la configuración de Gatsby debemos detener y volver a ejecutar el proyecto para que cargue de nuevo con estas configuraciones.
 
Ahora si accedemos al playground de Graphql `http://localhost:8000/___graphql` nos mostrará las consultas de la data que viene de Strapi `allStrapiArticulo` y `strapiArticulo`
 
## Agregar la consulta en la aplicación
 
Comenzamos a modificar lo que nos muestra la aplicación, ve al archivo `/blog/src/pages/index.js` y reemplazalo por este:
 
```javascript
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
 
const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticulo.edges.map(({ node }) => (
    <li key={node.strapiId}>
      <h2>
        <Link to={`/${node.strapiId}`}>{node.titulo}</Link>
      </h2>
      <p>{node.descripcion}</p>
    </li>
))}
  </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)
 
export default IndexPage
 
export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticulo {
      edges {
        node {
          strapiId
          titulo
          descripcion
        }
      }
    }
  }
`
```
 
Puedes notar aquí que la consulta `allStrapiArticulo` es creada por el plugin de Strapi para Gatsby de forma automática y los campos que estamos requiriendo son el `strapiId` generado por Strapi, `titulo` y `descripcion` de todos los artículos.

![Lista de articulos en el home](https://res.cloudinary.com/enbonnet/image/upload/v1572049966/wvljdpwrxoccv8glqfbs.png)
 
Ahora podrás ver una lista de los artículos en el home de tu aplicación 👏🏻 👏🏻 👏🏻 en este punto ya estás mostrando el contenido que proviene de Strapi.
 
## Vista de un artículo
 
Así como tenemos una lista de artículos puede ser necesario tener una vista independiente por cada artículo, para eso usaremos un `templates`, en tu proyecto crea la ruta `/blog/src/templates/` y dentro el archivo `articulo.js` con el siguiente contenido:
 
```javascript
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
 
const ArticleTemplate = ({ data }) => (
  <Layout>
    <h1>{data.strapiArticulo.titulo}</h1>
    <p>{data.strapiArticulo.descripcion}</p>
  </Layout>
)
 
export default ArticleTemplate
 
export const query = graphql`
  query ArticleTemplate($id: Int!) {
    strapiArticulo(strapiId: { eq: $id }) {
      titulo
      descripcion
    }
  }
`
```
 
Ahora tenemos un `template` que nos sirve como vista para cada uno de los artículo de forma independiente, pero necesistamos decirle a Gatsby que lo utilice. Para esto ve al archivo `gatsby-node.js` y agrega:
 
```javascript
const path = require(`path`)

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
  // Hace la solicitud a la API para leer la información
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
})

// Utiliza el método createPages para crear las páginas con la data que recibe
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  // Hace una solicitud de los strapiId de cada articulo para generar la URL y directorio
  const getArticles = makeRequest(
  graphql,
  `
  {
  allStrapiArticulo {
    edges {
      node {
        strapiId
      }
    }
  }
}
`
).then(result => {
  // Crea la página para cada articulo
  result.data.allStrapiArticulo.edges.forEach(({ node }) => {
    createPage({
    path: `/${node.strapiId}`,
    // Le indica que template utilizar en esta página
    component: path.resolve(`src/templates/articulo.js`),
    context: {
      id: node.strapiId,
    },
  })
  })
})
  // Devuelve todos los artículos
  return getArticles
}
```
Ahora puedes hacer click sobre el título de algún artículo en tu home y te llevara a la vista independiente de dicho artículo
 
Genial! Ya tienes la vista general de todos los artículos y la vista independiente de cada uno.

![Un artculo independiente](https://res.cloudinary.com/enbonnet/image/upload/v1572050479/mae55zmepjql0dxiiqyf.png)
 
Si quieres más información acerca de lo que puedes hacer con Gatsby no te pierdas la [documentación](https://www.gatsbyjs.org/docs/quick-start)
 
¿Estamos listos para subir a producción?
Casi pero primero necesitamos subir Strapi a Heroku
 
Continua con: [Construyendo un blog con Gastby y Strapi, parte 3 - Desplegando Strapi en Heroku](https://enbonnet.me/article/41/construyendo-un-blog-con-gastby-y-strapi-parte-3-desplegando-strapi-en-heroku)
 
