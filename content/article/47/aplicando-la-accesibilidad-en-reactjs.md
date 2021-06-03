---
title: "Aplicando la accesibilidad en Reactjs"
date: 2019-11-22T20:01:41.599Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593532155/yg8mlzib4ijppxtuayup.jpg
summary: Como aplicar y auditar la accesibilidad de una aplicación en Reactjs, extensiones, modulos y plugins que puedes usar.
draft: false
---
Luego de leer el maravilloso árticulo de [@CristinaGrim](https://twitter.com/CristinaGrim), [Quiero hacer mi web accesible, pero no sé por dónde empezar](https://octuweb.com/quiero-hacer-mi-web-accesible/) quede con la duda de ¿Como puedo aplicar esto a Reactjs?, ¿Que forma puedo validar que los cambios que estoy haciendo en mi aplicación realmente mejoran la accesibilidad? y de este artículo se basa precisamente en esas preguntas.
 
Comenzando la investigación me encontré con la [documentación oficial](https://es.reactjs.org/docs/accessibility.html#___gatsby) de reactjs acerca de la accesibilidad y otro árticulo de [@hdjirdeh](https://twitter.com/hdjirdeh), [Accessibility auditing with react-axe and eslint-plugin-jsx-a11y](https://web.dev/accessibility-auditing-react/) que fue el punto de partida.
 
## Instalar `eslint-plugin-jsx-a11y`
 
Es un plugin de ESlint que nos permite inspeccionar el código que estamos escribiendo, validando las prácticas que se recomiendan en cada elemento de html que usemos en JSX.
 
```bash
yarn add -D eslint eslint-plugin-jsx-a11y
```
 
Agregamos el archivo de configuración para ESlint en la raíz del proyecto `.eslintrc` con la configuración básica:
 
```js
{
 "extends": "react-app"
}
```
 
De esta forma se validan las características más comunes de accesibilidad
 
> Si quieres ver más configuraciones es ESlint puedes ver el articulo [Usar ESLint y Prettier en proyectos TypeScript](https://enbonnet.me/article/46/usar-eslint-y-prettier-en-proyectos-typescript)
 
Si quieres garantizar un nivel de accesibilidad similar a AA puedes usar:
 
```js
{
 "extends": ["react-app", "plugin:jsx-a11y/recommended"]
}
```
 
Y si quieres ir un poco más (similar a AAA) allá puedes usar:
 
```js
{
 "extends": ["react-app", "plugin:jsx-a11y/strict"]
}
```
 
En esta [documentación](https://github.com/evcohen/eslint-plugin-jsx-a11y#difference-between-recommended-and-strict-mode) esta la diferencia detallada entre el modo recomendado y el modo estricto.
 
## Instalando `react-axe`
 
Un módulo que evalúe el código HTML de nuestra aplicación en el DOM para darnos recomendaciones de accesibilidad directamente en la consola del navegador, utiliza la api de [axe-core](https://github.com/dequelabs/axe-core) tambien puedes encontrar [react-a11y](https://github.com/reactjs/react-a11y) pero este fue depretado en favor de `react-axe`.
 
Para instalarlo:
 
```bash
yarn add -D react-axe
```
 
Ahora solo necesitas inyectar el inspector de Axe en el punto de entrada de tu aplicación, ejemplo: `index.js`
 
```js
if (process.env.NODE_ENV !== 'production') {
 const axe = require('react-axe')
 axe(React, ReactDOM, 1000)
}
```
 
Se usa la variable entorno `NODE_ENV` para mostrar las sugerencias solo en ambiente de desarrollo
 
Ahora podrás ver las notificaciones en la consola de desarrollo de tu navegador, estas tienen alertas que corresponden a los mismos niveles de accesibilidad mencionados:
 
- Minor (A)
- Moderate (AA)
- Serious (AAA)
- Critical (AAA)
 
Todo depende a que estés apuntando desde tu aplicación.
 
 
También tenemos a mano extensiones de Chrome que te pueden ayudar a validar la accesibilidad de la aplicación:
 
- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
- [Wave Evolution Tool](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)
- [Axe](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd)
 
Espero te sea de utilidad este contenido y recuerda que la accesibilidad la hacemos todos.
