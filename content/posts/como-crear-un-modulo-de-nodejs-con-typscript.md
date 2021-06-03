---
title: "Como crear un modulo de Nodejs con Typscript"
date: 2019-11-14T14:46:17.923Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531531/ebwvesyjg4zwjyng4ker.jpg
description: Siempre llegaras al punto en que necesitas compartir lógica de tu aplicación y aquí te quiero mostrar como hacerlo con un paquete de Nodejs con Typescript
public: true
---
Cuando tu aplicación comienza a crecer o tenemos varias aplicaciones funcionando en paralelo te puedes ver en la necesidad de compartir lógica o ciertas funciones entre ellas, en el caso de Nodejs cuando creas un paquete sin Typescript y lo quieres usar en un proyecto con este, deberías instalar los types de forma independiente o agregarle un mítico `// @ts-ignore` y nadie quiere eso **guiño guiño**.
 
La idea de este artículo es poder dejar las bases para poder crear un paquete con Typescript que genere los types que necesita el mismo de forma automática. De esta forma lo puedes usar en tus proyectos con Typescript o Javascript plano.
 
El resultado de esta guía la puedes encontrar en este [repositorio](https://github.com/enbonnet/ts-package).
 
### Armando las bases
 
```sh
mkdir ts-package
cd ts-packages
npm init -y
```
 
Ahora ya tienes el `package.json`, debes agregar las siguientes dependencias:
 
```sh
npm install @types/node --save-dev
npm install typescript ts-node --save-dev
```
 
`@types/nodes` agrega los types a node para poder trabajar con Typescript, agregamos `typescript` y `ts-node` para poder transpilar el código TS a JS, en este ejemplo será con el módulo `commonjs`.
 
Creas el archivo `tsconfig.json` en la raíz del proyecto y le agregas los siguiente:
 
```js
{
   "compilerOptions": {
       "lib": [ "es5", "es6", "es7",
                "es2015", "es2016",
                "es2017", "es2018",
                "esnext" ],
       "target": "es2017",
       "module": "commonjs",
       "moduleResolution": "Node",
       "outDir": "./dist",
       "rootDir": "./lib",
       "declaration": true,
       "declarationMap": true,
       "inlineSourceMap": true,
       "inlineSources": true
   }
}
```
 
Este archivo especifica con qué características esperamos que se transpile el código TS a JS:
 
- `target` para transpilar a ES2017, porque ya soporta async/await.
- `module` describe el tipo de módulo en este caso será `CommonJS`.
- `moduleResolution` para indicarle que busque los paquetes en el `node_modules`.
- `outDir` el directorio donde quedará el código transpilado.
- `rootDir` el directorio donde está el código en Typescript.
- `declaration` y `declarationMap` para generar los types y el map de declaración.
- `inlineSourceMap` y `inlineSources` genera el mapa de los archivos fuente.
 
### Scripts en `package.json`
 
En el `package.json` debes tener las siguientes propiedades:
 
```js
{
   ...
   "main": "dist/index.js",
   "type": "commonjs",
   "types": "./dist/index.d.ts",
   "scripts": {
       "build": "tsc",
       "watch": "tsc --watch",
       "test": "cd test && npm run test"
   },
   ...
}
```
 
Crear los directorio `lib` y `dist` en el directorio raíz:
 
```sh
mkdir lib
mkdir dist
```
 
¡Y listo!
 
Ahora solo te falta escribir dentro del directorio `lib` tu código fuente, un archivo `index.ts` en donde ocurra toda la magia que quieres hacer.
 
Al ejecutar `npm run build` podrás ver tanspilado el código de TS a JS en el directorio `dist`.
 
Si quieres tener más integraciones puedes mirar en el repositorio que usamos de template en [eclass.com](https://eclass.com), te lo dejo [aquí](https://github.com/eclass/ts-template-npm-libs) si quieres echarle un ojo o usarlo como template.
