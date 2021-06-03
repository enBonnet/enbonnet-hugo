---
title: "Construir API Rest Nodejs Serverless con AWS Lambda y Aurora Serverless"
date: 2020-04-19T15:42:01.283Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531494/sjfaloyszemwslzf4yxn.jpg
summary: Crear una api REST con nodejs sobre AWS Lambda y Aurora Serverless SQL
draft: false
---
Esta es la segunda guía para construir una API Serverless con AWS, la primera la puedes encontrar [acá](https://enbonnet.me/article/2/construir-api-nodejs-serverless-con-aws-lambda-y-dyanmodb) la diferencía son las bases de datos, si quieres saber un poco más sobre que opino al respecto de Serverless pros y contras en ese árticulo explico un poco más, en este vamos a ir directo a donde las papas queman.

## Objetivo

Terminar la guía con una API desplegada de AWS y conectada con Aurora Serverless SQL.

## Resultado

Puedes encontrar el resultado de esta guía [aquí](https://github.com/enBonnet/serverless-mysql)

## Requisitos previos

- Tener nodejs 10 o superior
- Cuenta en AWS
- CLI Tool de Serverless

## Primeros pasos

### La base

Con las herramientas que nos ofrece el [CLI de Serverless](https://serverless.com/framework/docs/getting-started/) podemos iniciar el proyecto muy rápidamente usando el comando:

```bash
sls create -t aws-nodejs -p note-api && cd note-api
```

En un par de minutos ya tendrás la base del proyecto lista para comenzar.

### Las dependencias

Serverless tiene un gran sistema de plugins que podemos utilizar, uno de las más utilizadas es `serverless-offline` que vamos a instalar en conjunto con los módulos que necesitamos para conectarnos con la base de datos, para ello ejecutamos los siguientes comandos en la raíz del proyecto:

```bash
npm init -y 
npm i --save-dev serverless-offline 
npm i --save mysql2 sequelize
```

## Comenzamos a escribir código

En la base de nuestro proyecto `/note-api` tendrás un archivo `serverless.yml` con configuraciones previas por defecto, ese archivo lo vamos a sustituir complementa con el siguiente contenido:

### serverless.yml

```yml
service: note-api

custom:
  secrets: ${file(secrets.json)}

provider:
  name: aws
  runtime: nodejs12.x
  timeout: 30
  stage: ${self:custom.secrets.NODE_ENV}
  environment: 
    NODE_ENV: ${self:custom.secrets.NODE_ENV}
    DB_NAME: ${self:custom.secrets.DB_NAME}
    DB_USER: ${self:custom.secrets.DB_USER}
    DB_PASSWORD: ${self:custom.secrets.DB_PASSWORD}
    DB_HOST: ${self:custom.secrets.DB_HOST}
    DB_PORT: ${self:custom.secrets.DB_PORT}
  vpc:
    securityGroupIds:
      - ${self:custom.secrets.SECURITY_GROUP_ID}
    subnetIds:
      - ${self:custom.secrets.SUBNET1_ID}
      - ${self:custom.secrets.SUBNET2_ID}
      - ${self:custom.secrets.SUBNET3_ID}
      - ${self:custom.secrets.SUBNET4_ID}
      - ${self:custom.secrets.SUBNET5_ID}
      - ${self:custom.secrets.SUBNET6_ID} 

functions:
  healthCheck:
    handler: handler.healthCheck
    events:
      - http:
          path: /
          method: get
          cors: true
  create:
    handler: handler.create
    events:
      - http:
          path: notes
          method: post
          cors: true
  getOne:
    handler: handler.getOne
    events:
      - http:
          path: notes/{id}
          method: get
          cors: true
  getAll:
    handler: handler.getAll
    events:
     - http:
         path: notes
         method: get
         cors: true
  update:
    handler: handler.update
    events:
     - http:
         path: notes/{id}
         method: put
         cors: true
  destroy:
    handler: handler.destroy
    events:
     - http:
         path: notes/{id}
         method: delete
         cors: true

plugins:
  - serverless-offline
```

En este archivo estan pasando varias cosas, primero declaramos el nombre del servicio o de la app que contendrá las funciones lambda, luego cargamos un archivo de configuración `secrets: ${file(secrets.json)}` personalizado que nos ayudará más adelante para definir variables de entorno, en el `provider.environment` definimos las variables de entorno para el proyecto, en `functions` todas las funciones y los endpoints de las mismas, al final pero no menos importante `plugins` donde cargamos los plugins que vamos a utilizar en este proyecto.

### secrets.json

En la raíz del proyecto al lado de nuestro archivo `serverless.yml` crearemos un nuevo archivo llamado `secrests.json` que deberá verse así:

```json
{
  "DB_NAME": "test",
  "DB_USER": "root",
  "DB_PASSWORD": "root",
  "DB_HOST": "127.0.0.1",
  "DB_PORT": 3306,
  "NODE_ENV": "dev",
  "SECURITY_GROUP_ID": "sg-xx",
  "SUBNET1_ID": "subnet-xx",
  "SUBNET2_ID": "subnet-xx",
  "SUBNET3_ID": "subnet-xx",
  "SUBNET4_ID": "subnet-xx",
  "SUBNET5_ID": "subnet-xx",
  "SUBNET6_ID": "subnet-xx"
}
```

En este archivo vamos a sustituir las variables cuando creemos la base de datos en la consola de AWS, recuerda agregarlo a tu archivo `.gitignore

### Las funciones

En nuestro archivo `serverless.yml` ya definimos las funciones, nombres y el endpoint correspondiente e indicamos que esas funciones estarían en el archivo `handlers.js` pero en este momento aún no están, para agregarlas debemos sustituir el código por defecto que tiene este archivo por este:

```js
module.exports.healthCheck = async () => {
  await connectToDatabase()
  console.log('Connection successful.')
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Connection successful.' })
  }
}

module.exports.create = async (event) => {
  try {
    const { Note } = await connectToDatabase()
    const note = await Note.create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: JSON.stringify(note)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the note.'
    }
  }
}

module.exports.getOne = async (event) => {
  try {
    const { Note } = await connectToDatabase()
    const note = await Note.findByPk(event.pathParameters.id)
    if (!note) throw new HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`)
    return {
      statusCode: 200,
      body: JSON.stringify(note)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not fetch the Note.'
    }
  }
}

module.exports.getAll = async () => {
  try {
    const { Note } = await connectToDatabase()
    const notes = await Note.findAll()
    return {
      statusCode: 200,
      body: JSON.stringify(notes)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the notes.'
    }
  }
}

module.exports.update = async (event) => {
  try {
    const input = JSON.parse(event.body)
    const { Note } = await connectToDatabase()
    const note = await Note.findByPk(event.pathParameters.id)
    if (!note) throw new HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`)
    if (input.title) note.title = input.title
    if (input.description) note.description = input.description
    await note.save()
    return {
      statusCode: 200,
      body: JSON.stringify(note)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could not update the Note.'
    }
  }
}

module.exports.destroy = async (event) => {
  try {
    const { Note } = await connectToDatabase()
    const note = await Note.findByPk(event.pathParameters.id)
    if (!note) throw new HTTPError(404, `Note with id: ${event.pathParameters.id} was not found`)
    await note.destroy()
    return {
      statusCode: 200,
      body: JSON.stringify(note)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: err.message || 'Could destroy fetch the Note.'
    }
  }
}
```

Con esto tendremos definidas las funciones, puede parecer confuso todo lo que está pasando en este gran trozo de código pero básicamente es un controlador que trabajar en conjunto con nuestro Modelo de Note (o notas), para crear un CRUD.

### Conexión a la base de datos

Ahora que ya tenemos los endpoint en el `serverless.yml` y el controlador en el `handler.js` nos hace falta la conexión con la base de datos y el modelo, para esto vamos a crear un archivo `db.js` en la raíz del proyecto que tenga el siguiente contenido:

```js
const Sequelize = require('sequelize')
const NoteModel = require('./models/Note')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)

const Note = NoteModel(sequelize, Sequelize)
const Models = { Note }
const connection = {}

module.exports = async () => {
  if (connection.isConnected) {
    console.log('=> Using existing connection.')
    return Models
  }

  await sequelize.sync()
  await sequelize.authenticate()
  connection.isConnected = true
  console.log('=> Created a new connection.')
  return Models
}
```

Lo más importante de este archivo es cómo se administran las conexiones a la base de datos, si no existe alguna conexión se crear y en caso de que aún esté viva una conexión de reutiliza.
 
### Modelo de datos
 
Para nuestro modelo creamos una carpeta llamada `models` y dentro un archivo `Note.js` este archivo lo llenamos con el siguiente código:

```js
module.exports = (sequelize, type) => {
  return sequelize.define('note', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    description: type.STRING
  })
}
``` 

En este modelo estamos definiendo la table note y los campos que tendrá esta tabla en la base de datos, gracias a `sequelize` es bastante sencillo.

### Volvemos al `handler.js`

Ahora agregamos al comienzo del `handler.js` la función para iniciar la conexión con la base de datos y una función para manejar los errores de HTTP de forma sencilla

```js
const connectToDatabase = require('./db')

function HTTPError (statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}
```

¿Ya y estamos listos para probar? Aun no, nos falta un gran detalle, para poder probar nuestra aplicación offline tenemos que tener una base de datos local, recuerdas el archivo `secrets.json` si ya tienes instalado mysql en tu computador puedes sustituir allí las variables de tu base de datos por otro lado si no te gusta tener bases de datos instaladas en tu sistema siempre te puedes ayudar con el amigo docker, para eso te dejo este otro articulo: [No instales Mysql o Mariadb, utiliza docker](https://enbonnet.me/article/50/no-instales-mysql-o-mariadb-utiliza-docker).

## Pruebas

Una vez que tengas las variables de tu base de datos local o en docker agregadas en el archivo `secrets.json` ya puedes ejecutar la aplicación, con el comando:

```bash
sls offline start --skipCacheInvalidation
```

La propiedad `--skipCacheInvalidation` nos ayuda a que se recarguen los módulos más rápidamente. Se lo podemos sacar en caso de tengamos algún error.
 
Si todo está correcto como debería ya podemos probar con nuestro Cliente de API favorita, [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/)...

```bash
# Las rutas que tenemos definidas son:
GET - http://localhost:3000/                           # Raíz - healthCheck
POST - http://localhost:3000/notes               # Crear una nota - create
GET - http://localhost:3000/notes/{id}          # Leer una nota - getOne
GET - http://localhost:3000/notes                  # Leer todas la snotas - getAll
PUT - http://localhost:3000/notes/{id}           # Actualizar una nota - update
DELETE - http://localhost:3000/notes/{id}    # Borrar una nota - destroy
```

Si revisamos la terminal podrás ver cuando se crear una nueva conexión a la base de datos `using new database connection` o cuando se utiliza `using existing database connection`. Hasta este punto todo funciona en local pero el objetivo de esta guía es terminar con una API desplegada en AWS y conectada con Aurora Serverless SQL.
 
# Crear la base de datos Aurora Serverless
 
Accedemos a la [consola de AWS](https://console.aws.amazon.com/) buscamos el servicio `RDS` y `Create database`las opciones van casi por defecto, las elegimos en el siguiente orden:

### Choose a database creation method
- Standard Create

### Engine options
- Amazon Aurora 
- Amazon Aurora with MySQL compatibilit
- Versión (la última disponible)
- Regional

### Database features
- Serverless

### Templates
- Dev/Test

### Settings
- DB cluster identifier: El nombre de nuestro cluster o servidor de bases de datos.
- Credentials Settings: username y password de tu preferencia pero recuerda que las necesitarás más adelante.

### DB instance size
-  Memory Optimized classes
- db.r5.large

### Availability & durability
- Create an Aurora Replica/Reader node in a different AZ (recommended for scaled availability).

### Connectivity
- Virtual Private Cloud (VPC): Por defecto creará una nueva.

### Database authentication
- Password authentication

### Additional configuration
- Initial database name: *importantes* necesitamos agregar el nombre a tu base de datos ya que `sequelize` no es capaz de crear la base de datos.

... los campos no mencionados quedan con el valor por defecto.

Luego confirmamos que queremos crear la base de datos en `Create database` y esto comienza el proceso que demora un par de minutos (15 ~ 20) luego de que esté creada nuestra base de datos en AWS, tendremos los valores que necesitamos sustituir en el archivo `secrets.json`.
 
## Deploy
Una vez sustituido las variables en el archivo `secrets.json` podemos hacer el deploy de nuestra api, con el comando:
 
```bash
sls deploy
````
 
Luego de un par de minutos tendremos una url en la que podemos probar como funciona nuestra aplicación desplegada sustituyendo.

Recuerda que puedes ver el resultado de esta guía implementado [aquí](https://github.com/enBonnet/serverless-mysql)
 
### Comandos útiles
 
- `sls config` nos ayuda a validar la configuración del archivo `serverless.yml`.
- `sls print` nos imprime el archivo `serverless.yml` tal y como lo vería el intérprete.
- `sls remove` si quieres eliminar todos los servicios creados por tu aplicación en AWS.

Gracias por llegar hasta acá, recuerda si tienes algún comentario o duda me lo puedes hacer llegar por twitter: [@enBonnet](https://twitter.com/enbonnet) o directamente por telegram [@enBonnet](https://t.me/enbonnet).
