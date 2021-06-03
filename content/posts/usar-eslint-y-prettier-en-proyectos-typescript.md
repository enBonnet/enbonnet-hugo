---
title: "Usar ESLint y Prettier en proyectos TypeScript"
date: 2019-11-21T18:30:51.042Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531553/oimlzcmt0t742h3vbr81.jpg
description: Configurar ESLint en tu proyecto de Nodejs o React con Typescript.
public: true
---
Siempre le estaré agradecido a [@xabadu](https://twitter.com/xabadu) quien me enseño a utilizar y configurar estas herramientas en mis proyectos, desde ese momento los necesito casi en cualquier proyecto, como lo dije en un tweet, "Me ayudan a proteger el código de mí mismo", en esos días de flojera cuando piensas "total si así funciona...", quieres subirlo pero el linter te advierte que eso será un problema para tú yo del futuro y si estás trabajando en equipo ya no son opcionales, son obligatorios. Todos escribimos código de forma diferente y si no tienes un estándar mínimo de lo que se espera de tu código llegara el momento en que será imposible de leer sin dedicarle más tiempo del que queremos.
 
Para el caso de Typescript tienes dos opciones [TSLint](https://palantir.github.io/tslint/) y [ESLint](https://eslint.org/), el primero funciona solo con Typescript, el segundo es compatible con Typescript y Javascript, lo que te da la flexibilidad de usarlo en proyectos de migración en caso de que estes pasando de JS a TS, funciona perfecto. Adicional a esto el equipo de Typescript reconoce que [ESLint tiene mejor rendimiento](https://github.com/Microsoft/TypeScript/issues/29288#developer-productivity-tools-and-integration) que TSLint.
 
### Configurando ESLint
 
Instalar las dependencias
 
```bash
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
 
- `eslint` el core de la librería.
- `@typescript-eslint/parser` el parser que permite a ESLint interpretar código Typescript.
- `@typescript-eslint/eslint-plugin` un plugins de reglas recomendadas para Typescript.
 
Ahora creamos el archivo `.eslintrc` en la raíz del proyecto y le agregas el siguiente contenido:
 
```js
{
 "parser": "@typescript-eslint/parser",
 "extends": [
   "plugin:@typescript-eslint/recommended"
 ],
 "parserOptions": {
   "ecmaVersion": 2018,
   "sourceType": "module"
 },
 "rules": {
   // Aca puedes modificar alguna regla específica, por ejemplo:
   // "@typescript-eslint/explicit-function-return-type": "off",
 }
}
```
 
> Es opcional agregar un archivo `.eslintignore` con la carpeta donde se guardará tu código transpilado de TS a JS.
 
### Configurando Prettier
 
Necesitas instalar las dependencias que ayudan a la comunicación entre las reglas de ESLint con el formato del código que vas a definir en Prettier.
 
```bash
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```
 
- `prettier` la librería.
- `eslint-config-prettier` desactiva las reglas de ESLint que generan conflicto.
- `eslint-plugin-prettier` ejecuta prettier como una regla de ESLint.
 
Crear el archivo de configuración para prettier `.prettierrc` en la raíz del proyecto, con el siguiente contenido:
 
```js
{
 "semi": false, // punto y coma al final de cada declaración
 "tabWidth": 2, // tamaño de los tabs
 "printWidth": 100, // largo máximo de una línea de código
 "singleQuote": true,  // comillas simples
 "trailingComma": "none" // comas en objetos o arrays multi líneas
}
 
```
 
Puedes ver más opciones en la [documentación](https://prettier.io/docs/en/options.html)
 
### Integrando ESLint con Prettier
 
Actualizando la configuración de eslint en el archivo `.eslintrc`
 
```js
{
 "parser": "@typescript-eslint/parser",
 "extends": [
   "plugin:@typescript-eslint/recommended",
   "prettier/@typescript-eslint",  // agrega las reglas de prettier a eslint
   "plugin:prettier/recommended" // agregar el plugin que integra eslint con prettier
 ],
 "parserOptions": {
   "ecmaVersion": 2018,
   "sourceType": "module"
 },
 "rules": {
   // Aca puedes modificar alguna regla específica, por ejemplo:
   // "@typescript-eslint/explicit-function-return-type": "off",
 }
}
```
 
### Ejecutar ESLint con el CLI
 
Para ejecutar el Linter sobre todo el código debes agregar el `script` que ejecuta tu código:
 
```js
{
 "scripts": {
  ...
   "lint": "tsc --noEmit && eslint '*/**/*.{js,ts}' --quiet --fix"
  ...
 }
}
```
 
Este comando transpila el código de TS a JS en caso de que no de errores entonces ejecuta el linter sobre todos los archivos .js o .ts. De esa forma tienes dos validaciones.
 
### Para un proyecto de Reactjs
 
Para poder usar esta configuración con un proyecto de Reactjs necesitas agregar un par de dependencias y configuraciones, primero instalar el plugin de ESLint para interpretar código JSX, TSX:
 
```bash
yarn add -D eslint-plugin-react
```
 
Luego actualizar el archivo de `.eslintrc`:
 
```js
{
 "parser": "@typescript-eslint/parser",
 "extends": [
   "plugin:react/recommended", // agregar el plugin de reactjs para eslint
   "plugin:@typescript-eslint/recommended",
   "prettier/@typescript-eslint",
   "plugin:prettier/recommended"
 ],
 "parserOptions": {
   "ecmaVersion": 2018,
   "sourceType": "module",
   "ecmaFeatures": {
     "jsx": true // permite a eslint analizar los archivos jsx o tsx
   }
 },
 "rules": {
   // Aca puedes modificar alguna regla específica, por ejemplo:
   // "@typescript-eslint/explicit-function-return-type": "off",
 },
 "settings": {
   "react": {
     "version": "detect" // para detectar la versión de reactjs
   }
 }
};
```
 
¡Listo! De esa forma podras utilizar ESLint y prettier integrados en Reactjs.
 
Puedes ver un ejemplo de esta configuración en el proyecto base de una [API apollo con Postgres](https://github.com/enBonnet/apollo-postgres) que es un template que puedes usar para alguno de tus proyectos.
