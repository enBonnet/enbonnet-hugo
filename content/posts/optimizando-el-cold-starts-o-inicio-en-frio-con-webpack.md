---
title: "Optimizando el cold starts o inicio en frío con webpack"
date: 2020-04-19T20:44:29.660Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531230/mnh5gvuwrgkfzlamynor.jpg
summary: Mejorar el tiempo de enfriamiento o cold starts de nuestras lambda gracias a webpack
draft: false
---
A pesar de que AWS hace un excelente trabajo para que se note lo menos posible el cold starts de una función lambda, aún hay cosas que podemos hacer para ayudar a reducir ese tiempo. En lo personal me parece increíble que en 4 segundos se levante un servidor, quien sabe donde, conecte a la base de datos, haga las operaciones y responda.
 
# ¿Como se puede mejorar?
 
Cada vez que se llama una función lambda, se empaqueta el código de la función y se manda a un servidor, es uno de los primeros pasos en el proceso de una lambda, si nosotros subimos nuestro código ya empaquetado con `serverless-webpack` vamos a reducir notablemente la carga que corresponde a ese ciclo del proceso.
 
## serverless-webpack
 
Nos ofrece todos los beneficios de webpack al empaquetar nuestro código, entre ellos:
- Limpiar el código, para que en nuestras funciones quede solo el código que realmente se requiere.
- Optimiza las dependencias o módulos.
- Comprime nuestro código en un archivo.
- Hot reload en ambiente de desarrollo.
 
## Instalación
 
Lo primero que debemos hacer es instalar `webpack` y `serverless-webpack` como dependencias de desarrollo en nuestro repositorio:
 
```bash
npm i --save-dev serverless-webpack webpack
```
 
## Configuración
 
Agregamos el plugin en nuestro archivo `serverless.yml`, nos aseguramos de colocarlo de primero entre los plugins, si tienes otros instalados:
 
```yml
plugins:
  - serverless-webpack
  ...
  // otros plugins...
```
 
En la raíz de nuestro proyecto al lado del archivo `serverless.yml` agregamos el archivo `webpack.config.js` y lo llenamos con el siguiente código:
 
```js
const slsw = require('serverless-webpack');
 
module.exports = {
 target: 'node',
 entry: slsw.lib.entries,
 mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
 node: false,
 optimization: {
   minimize: false,
 },
 // en caso de que uses sequelize debemos omitir los controladores que no estemos usando
 // en el ejemplo anterior estoy usando mysql
 // es un bug que esta en espera de solución [issue #7509](https://github.com/sequelize/sequelize/issues/7509)
 externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
 devtool: 'inline-cheap-module-source-map',
};
```
 
Aquí hay dos cosas importantes:
 
- `node: false` poco usual, pero cuando se configura `true` puede causar problemas con las variables de ambiente que se utilizan en la aplicación.
- `minimize: false` para poder tener un mejor stack traces al momento de tener errores. Es opcional activarlo en caso de que quieras mejorar aún más el empaquetado de tus funciones.
 
En este punto ya hemos optimizado el empaquetado de nuestras funciones, puedes probarlo con el comando:
 
```bash
serverless package
```
 
Este generará un archivo con todas tus funciones, se puede optimizar un poco más agregando a nuestro archivo `serverless.yml` el parametro:
 
```yml
...
package:
 individually: true
...
```
 
Este parámetro hará que demoré unos minutos más el empaquetado pero generará un paquete de código por cada función de forma individual.
 
También puedes seguir usando el comando:
 
```bash
sls offline start --skipCacheInvalidation
```
 
Y ahora verás un mensaje de que el servidor está esperando cambios, así hemos ganado mejor performance y hot reload en nuestro ambiente de desarrollo.
