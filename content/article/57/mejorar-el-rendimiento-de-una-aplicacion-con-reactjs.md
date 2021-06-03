---
title: "Mejorar el rendimiento de una aplicación con ReactJS"
date: 2020-11-28T20:53:33.048Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1606606341/xmccoywt1knuhbtvf10f.jpg
summary: Técnicas que nos pueden ayudar a mejorar el rendimiento de nuestra aplicación ReactJS, disminuyendo el consumo de Memoría y CPU.
draft: false
---
En toda aplicación con ReactJS mediana o grande siempre llegará el momento en que necesitamos mejorar el rendimiento de la aplicación, este es el punto en el que te puedes detener a pensar en que el rendimiento depende de muchas cosas, el navegador que ejecuta el código, la versión del navegador, el dispositivo en donde se está ejecutando nuestra aplicación, la latencia de la red que tiene el usuario, todos estos puntos son importantes y debemos tenerlos en cuenta, pero en este artículo te quiero compartir lo que podamos hacer desde el lado de ReactJS para mejorar el rendimiento en general.
 
El rendimiento se basa en la cantidad de CPU y Memoria RAM que requiere nuestra aplicación para poder cargar o ser usada, un buen ejemplo de una aplicación pesada que está bien optimizada es [Google Maps](https://www.google.cl/maps). Pero la regla general para medir el rendimiento es que entre menos CPU y RAM consumas es mejor.
 
Antes también mencione la latencia, que en otras palabras es el tiempo que se demora tu aplicación en requerir información desde el servidor y recibirla, hay varias técnicas para mejorar estos tiempos, como CDN, balanceadores de carga u otros externos a ReactJS.
 
Antes de ir a los puntos quiero recordarte que la optimización temprana es uno de los peores errores que podemos cometer, la mayoría de los puntos siguientes son para atacar requerimientos específicos, en la mayoría de los casos ReactJS logra cubrir casos extremos de uso de recursos sin que lo notemos, pero si llegas a tener un caso en que necesita algo de ayuda para lograrlo pues aquí vamos.
 
# Consumo de CPU
 
El uso de CPU es el resultado de la ejecución del código, cada vez que cargamos una vista y sus componentes, cargamos y ejecutamos todo el código que incluye, se puede resumir mencionando que cada vez que renderizamos un componente, ejecutamos una función o hacemos un request de datos externos estamos usando CPU.
 
## Evita renders innecesarios
 
Un componente se renderiza de nuevo cada vez que sus `props` o `states` cambian, en un counter cada vez que le damos click al botón de `+` el valor del estado cambia, esto hace que el componente que recibe la cuenta se actualice con el nuevo valor y a su vez actualiza la UI, todo este proceso consume recursos. Si renderizamos un componente sin ningún cambio estamos consumiendo recursos innecesarios.
 
Para indicarle a ReactJS que debe validar los valores de los `props` podamos usar `PureComponent` en los componentes de clases o `memo` para los componentes funcionales, ambos métodos hacen una comparación de primer nivel en las propiedades que recibe un componente.
 
Ejemplo de Memo:
 
```javascript
const Componente() {
 return (...)
}
 
export default memo(Componente)
```
 
Pero ya que en nuestro amado JavaScript `{} === {}` es `false` cuando tenemos propiedades que son arreglos u objetos o si quieres que tu componente se renderize únicamente cuando una propiedad de tu componente cambia debes usar el segundo parámetro que recibe `memo` que es una función:
 
```javascript
// siguiendo el ejemplo anterior
 
const arePropsEqual = (prevProps, nextProps) => {
 return prevProps.propiedad === nextProps.propiedad;
}
 
export default memo(Componente, arePropsEqual);
```
 
En este caso, mientras que la función evalúe a `true` indicará que las propiedades son iguales y que el componente no debe actualizarse.
 
 
No se recomienda hacer operaciones sobre un array directamente sobre el prop:
 
```javascript
<Componente nombres={arreglo.filter((elemento) => elemento.propiedad === valor)} ... />
```
 
Esto generará que cada vez que se filter el arreglo cambiará todo el valor de `nombres` y requerirá renderizar de nuevo el componente y sus hijos, en este caso es mejor realizar el filtro dentro del componente y tener en cuenta que cada vez que se pueda es mejor evitar pasarle arreglos u objetos como propiedades a un componente.
 
## Manejar la ejecuciones de las funciones
 
Considera una función que se ejecuta cada vez que escribes una letra en un input, genera un request al servidor que busca datos, si queremos buscar "esternocleidomastoideo" al comenzar a escribir se estará ejecutando esta función, generando solicitudes al servidor, actualizando las propiedades y requiriendo que los componentes se rendericen nuevamente.
 
Aquí entran a jugar técnicas como `debounce` [lodash](https://lodash.com/docs/4.17.15#debounce) tiene una api que nos permita usarlo directamente, este método previene que una función se llame indiscriminadamente, si definimos un delay de 500ms luego de la primera ejecución, la aplicación espera 500 ms antes de volver a ejecutar la función, por ejemplo:
 
 
```javascript
const debouncedSearch = _.debounce ((e) => {
 const value = e.target.value;
 fetch (
   ...
 );
}, 500);
 
render () {
 return (
   <input onChange = {debouncedSearch} ...  />
 )
}
```
 
### Disminuir la cantidad de código en la página
 
Mientras menos código tenga nuestra aplicación, será más fácil de cargar en el cliente. En aplicaciones que se renderizan desde el lado del servidor no tenemos mucho que hacer, con cada cambio de página traeremos lo necesario de cada página preprocesado por el servidor, pero en aplicaciones que se ejecutan únicamente del lado del cliente debemos considerar todo lo que nos ayude a disminuir el tamaño del bundle.
 
El bundle es el paquete de código JavaScript que requiere nuestra aplicación para funcionar, cada línea de código que escribimos más el código que incluyen los paquetes externos que instalamos suman, para controlar el tamaño de los paquetes externos podemos usar herramientas como [bundlephobia](https://bundlephobia.com/) que nos muestrán cuanto peso agrega una librería de npm a nuestro bundle final en producción.
 
Para el código de nuestra aplicación ReactJS tiene disponible las api de `lazy` y `Suspense` [code splitting](https://es.reactjs.org/docs/code-splitting.html). Lazy se utiliza para cargar los componentes o vistas que requiere nuestra aplicación de forma asíncrona, es decir que el bundle de nuestra aplicación se dividirá en partes que tendrán relación con la vista que estamos viendo, al momento de entrar a la ruta `/home` se cargará el código JavaScript asociado a esta ruta y así sucesivamente con todas las rutas que se carguen de forma lazy.
 
Suspense por otro lado es un agrupador de componentes o rutas Lazy, es el encargado de controlar el "suspenso" que hay en la aplicación desde el monto que solicitamos los componentes de una nueva vista, hasta que estos se cargan efectivamente, para lograr esto recibe una propiedad `fallback` donde recibe el componente que se montará durante el suspenso o intercambio de una vista a otra.
 
En el ejemplo de la documentación de ReactJS podemos ver cómo se implementa:
 
```javascript
import React from 'react';
 
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
 
function MyComponent() {
 return (
   <div>
     <React.Suspense fallback={<div>Loading...</div>}>
       <section>
         <OtherComponent />
         <AnotherComponent />
       </section>
     </React.Suspense>
   </div>
 );
}
```
 
# Disminuir consumo de memoria
 
El consumo de memoria está asociado a la cantidad de datos que tenemos almacenados en tiempo de ejecución de nuestra aplicación, los estados de cada componente se guardan en memoria, en una aplicación de ReactJS sin librerías que persistan el valor de los estados cada vez que se desmonta un componente de la vista el valor de estos estados se limpia y no suelen ser un problema, pero si tenemos una implementación que requiere persistir algún estado del lado del cliente como Redux o algún otro State Manager que mantenga el valor cargado podemos comenzar a tener problemas.
 
## Reducir el tamaño del Storage
 
Asumiendo que el Storage es el lugar donde guardamos el valor del estado de nuestra aplicación, lo mejor es ir cargando los datos que vamos necesitando de forma recursiva y justo lo necesario, sabemos que mientras más datos tenemos del lado del cliente podemos hacer cálculos más rápidamente o actualizaciones de la UI, pero hay que saber dónde marcar la línea.
 
Al cargar la información de forma diferida generamos mayor cantidad de solicitudes de datos al servidor y esto también puede ser un problema por la latencia, por eso la linea de qué datos guardar en el cliente y cuáles solicitar al servidor depende mucho de la aplicación o negocio, por ejemplo si tenemos una tienda con 3 productos podríamos cargar la data de los 3 productos completa sin problemas, pero si tenemos una tienda con 100 productos quizás sea mejor cargar solo la información preliminar de los productos para poder mostrar una lista y al momento de que el usuario seleccione uno de estos ir al servidor a buscar la información detallada del producto, en este punto podemos decidir si guardar en momería la información asociada a ese producto por si la vuelve a consultar o sustituirla por otro producto si visita otro.
 
Una técnica que puede ser intermedia es guardar los datos en disco, para eso los navegadores nos disponibilizan la api de [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) podemos guardar la información y al momento de requerirla la vamos a buscar de forma local en el cliente, sin necesidad de ir al servidor.
 
## Estar atentos de los Memory Leak
 
Los Memory Leak o Pérdidas de memoria, ocurren en los lenguajes como JavaScirpt que tienen "Recolectores de Basura" también conocidos como Trash Collector que se ejecutan periódicamente en tiempo de ejecución para limpiar de la memoria las variables o funciones que ya no están en uso.
 
En ReactJS podemos ver estos errores cuando ejecutamos una solicitud al servidor de información que se debe cargar en el estado de un componente, pero antes de que el servidor responda se desmonta en componente, en estos casos debemos poder cancelar la petición hecha al servidor para evitar que se carguen esos datos en memoria que no serán consumidos por ningún componente.
 
Encontré ejemplos de como implementar el cancelar peticiones al servidor con [axios](https://dev.to/collegewap/cancelling-previous-requests-in-search-bar-using-axios-in-react-3nef)  y con [fetch](https://davidwalsh.name/cancel-fetch).
 
Teniendo en cuenta de que todos los estados o funciones que cargan en memoria cuando el componente se monta (ciclo de vida [componentDidMount()](https://es.reactjs.org/docs/react-component.html#componentdidmount)) se debe de descargar de la memoria cuando se desmonta el componente (ciclo de vida [componentWillUnmount](https://es.reactjs.org/docs/react-component.html#componentwillunmount)).
 
Esto se vuelve un poco más complejo de comprender en los componentes funcionales ya que ambos ciclos de vida ocurren dentro de `useEffect` pero si montamos un listener la acción sobre un botón debemos retornar la cancelación de ese es listener al momento de desmontar el componente, por ejemplo:
 
```javascript
...
 const funcQueHaceAlgo = () => {...}
 
 useEffect(() => {
   window.addEventListener('keydown', funcQueHaceAlgo);
 
   return () => {
     window.removeEventListener('keydown', funcQueHaceAlgo);
   };
 });
...
```
 
La función debe estar declarada y asignada a una variable, no se deben utilizar funciones anónimas ya que la función dentro de `addEventListener` tendrá un espacio de memoria diferente a la función dentro de `removeEventListener`.
 
También nos podemos ayudar con el DevTool de Chrome para encontrar problemas de memoria, [por acá un artículo al respecto](https://developers.google.com/web/tools/chrome-devtools/memory-problems).
 
Espero que esta información te sea útil y logres mejorar el rendimiento de tu aplicación, recuerda que el uso de CPU y Memoria repercute también en el uso de electricidad, si nuestra aplicación consume recursos en exceso y es abierta desde un dispositivo móvil podemos estar consumiendo más batería del usuario.
