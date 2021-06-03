---
title: "10 buenas practicas que debes seguir con Reactjs en 2020"
date: 2020-05-21T20:57:33.233Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531469/a5ipbvsrjgolmpmuqgij.jpg
summary: 10 buenas practicas que debemos vigilar y aplicar en nuestras aplicaciones con Reactjs
draft: false
---
Como siempre las buenas prácticas o recomendaciones dependen del proyecto o la necesidades que tengamos, pero las buenas prácticas son lo que son, la mejor forma de hacer las cosas, aunque muchas veces por los famosos plazos de entrega no lleguemos a implementarlas todas.
 
Esta lista es una mezcla entre mi experiencia utilizando Reactjs e investigación, fácilmente podría ser una lista de 100 recomendaciones pero en este artículo me quiero enfocar en lo más transversal para la mayoría de los proyectos que conozco hasta ahora.
 
## 1. Componentes atómicos con funciones específicas
 
Nuestros componentes deben ser lo más atómicos posibles, a pesar de que técnicamente podríamos tener toda nuestra aplicación dentro de un solo componente y funciona estaríamos desperdiciando gran parte Reactjs, pensar en cada componente como si fuera una pieza de lego que podemos reutilizar a lo largo de nuestro aplicación tiene varios beneficios:
 
- Son más fáciles de testear.
- Se puede reutilizar en diferentes partes de la aplicación o quizás en más de una aplicación.
- Más fáciles de modificar o refactorizar.
- Mejoran el performance de la aplicación.
- Fáciles de debuggear.
 
Este concepto se puede extrapolar a las funciones que tengamos dentro de nuestra aplicación, los famosos helpers o hooks personalizados. En mi experiencia un componente con más de 500 líneas de código o que reciba más de 3 props ya es candidato para refactorizar y dividirlo en sub componentes.
 
## 2. Reutilización
 
Supongamos que tienes una modal `SuperModal.jsx` que muestra un mensaje de alerta, cuando se creó el componente solo se considero mostrar este mensaje de forma estática pero ahora necesitas una modal con los mismos estilos pero con un mensaje diferente. La forma en que debemos enfrentar esta necesidad con Reactjs es modificar la modal original para que pueda recibir el mensaje a mostrar cómo props y lo muestre, de esta forma el componente quedará listo para recibir y mostrar los mensajes que sean necesarios en cualquier vista de nuestra aplicación.
 
El primer componente se vería cerrado sin alternativas:
```js
<SuperModal />
```
 
Pero el segundo debe considerar una propiedad:
```js
<SuperModa message="super mensaje" />
```

De esa forma pasa de ser un componente cerrado a un layout que mostrará el mensaje que recibe por los props.
 
Además de considerar la reutilización por medio de props también debemos tener en cuenta los estilos, siempre pensando en que nuestro componente puede ser usado en diferentes vistas de nuestra aplicación si debemos colocar márgenes o padding externos que generen separación con otros componentes es mejor hacerlo en la vista en que se use el componente, en una vista podemos tener la necesidad de que margen sea mayor o menor a otra.
 
## 3. Don’t Repeat Yourself o DRY
 
Esta buena práctica trasciende todas las barreras de la programación, aplica para cualquier aplicación en la actualidad pero nunca está de más recordarla.
 
Es la regla en la que debes pensar siempre que estas a punto de `copiar y pegar` el código, copiarlo y pegarlo de StackOverflow no tiene nada de malo pero si ya tienes una porción de tú código que cumple la función que necesitas mejor intenta reutilizar lo que ya existe.
 
También es importante tenerlo en cuenta si tienes un componente que quiere repetir múltiples veces, como una tarjeta o un botón, por ejemplo:

```js
const youtubers = [
  {nombre: "Luisito Comunica", contenido: "Viajes"}
  {nombre: "Jaime Altozano", contenido: "Musica"}
]

// youtubers también puede llegar como props a este componente

return (
  <div>
    {
      youtubers.map( (youtuber) => {
        return (
          <Channel
            nombre={youtuber.nombre}
            contenido={youtuber.contenido}
          />
        );
      } )
    }
  </div>
);
```

De esa forma estaremos reutilizando el componente `<Channel ... />` todas las veces que sea necesario.
 
## 4. Evitar la indexibitis
 
Después de haber participado en varios proyectos de Reactjs siempre prefiero evitar lo que me gusta llamar la indexibitis, cuando tienes muchos componentes que se exportan desde el archivo `index.jsx`:
 
```js
components/header/index.jsx
components/footer/index.jsx
components/card/index.jsx
...
```
 
Esto depende mucho del tamaño del proyecto, si tienes 10 componentes y 3 o 4 vistas quizás sea sencillo buscar algún archivo o encontrar un error pero cuando tu proyecto crece ayuda que el nombre de tu archivo sea el mismo que el del componente, al momento de ver un error verás que el error ocurrió el archivo `Header.jsx` y no en `index.jsx` además ganas una capa extra de orden en la estructura del proyecto:
 
```js
components/header/index.js // aquí puedes implementar HoC y se encarga de exportar por defecto
components/header/header.jsx // toda la lógica del componente
components/header/style.js // .js si usas CSS in JS o .css si usas archivos de css independientes
components/header/header.test.js // los test que corresponden al componente
```
 
De esta forma puedes mantener los imports como acostumbras sin tener que repetir el nombre del componente:
 
```js
import Header from "../components/header"
```
 
Ganas orden y puedes estar tranquilo(a) que después todo se transforma en un solo archivo de js (prácticamente...)
 
## 5. Todos los archivos relacionados a un componente deben estar en la misma carpeta
 
Todos los archivos que estén relacionado con un componente deben estar dentro de la misma carpeta, tal y como en el ejemplo anterior:
 
```js
components/header/index.js // exportar
components/header/header.jsx // logica
components/header/style.scss // estilos
components/header/header.test.js // test
components/header/useHeader.js // hooks
...
```
 
De esta forma en caso de que tengas un error o sea necesario refactorizar el componente tendrás a la mano todos los archivos necesarios.
 
## 6. Nombra tus componentes por lo que hacen
 
Puede sonar obvio, al igual que el nombre de una función o una variable debe ser lo más acotado y descriptivo posible, pero nuestros componentes deben estar enfocados en ser reutilizables por ejemplo, tenemos un componente que muestra una imagen en la vista de ayuda lo podemos llamar `<ImagenAyuda ...props />`. Funciona perfectamente porque es lo que hace en esta vista "mostrar la imagen de ayuda", pero ¿Qué pasa si necesito mostrar una imagen en otra vista? Tendría que crear otro componente para mostrar imágenes en esa vista o refactorizar `ImagenAyuda`.
 
Para evitarnos estos cambios a medio camino resulta mejor llamar al componente `<Imagen ...props />` de esa forma sabemos que es el indicado para mostrar imágenes en todas las vistas, cuando el nombre del componente está relacionado con la vista en la que lo usamos estamos limitando a sea reutilizado en una vista diferente, así que si tienes componentes nombrados por contexto y no por su función que no te de miedo de cambiarles el nombre.
 
## 7. Siempre comienzan con mayúsculas
 
Si estás aprendiendo Reactjs recientemente quizás te puede causar curiosidad porque si un componente es una función debería comenzar con mayúscula, pero anteriormente los componentes eran clases y allí puede comenzar a tener sentido, además de heredar esta característica también ayuda a diferenciar un componente de los tag HTML, puedes tener un componente `<Header />` y de esta forma se diferencia del tag `<header><header/>`.

El uso de mayúsculas en el nombre del archivo o el directorio es totalmente opcional, si el componente se llama, como en este ejemplo, `<Header ... />` el nombre del archivo podría ser `Header.jsx` o `header.js` al igual que la extensión solo ayuda a que los IDE reconozcan más rápidamente la sintaxis.
 
## 8. Separar los stateful de los stateless
 
Los componentes `stateful` son los que manejan los estados o efectos secundarios, por otro lado los `stateless` reciben props y solo se encarga de renderizar el contenido. Pero no es solo esto, los componentes `stateful` también se encargan de manejar lógica o recibir datos desde la api, en el ejemplo de los youtubers, del punto 3, el componente `<Channel .../>` es `stateless` y el que lo contiene se encarga de manejar la lógica de recorrer el arreglo de youtubers para renderizar los canales.
 
## 9. Debe ser testeable
 
Cuando agregamos una nueva funcionalidad a nuestra aplicación solemos tener claro el alcance, ese es el mejor momento de escribir los tests necesario para garantizar que se mantenga la funcionalidad esperada a pesar de los cambios que se agreguen luego.
 
"Los tests que escribes hoy, los agradecerás mañana" - Yo mismo, creo.
 
Cuando una aplicación crece y tenemos componentes sin tests más temprano que tarde llegará la hora de testear y descubrirás que algunos componentes tienen comportamientos difíciles de testear, necesitarás emplear tiempo de desarrollo para analizarlo y poder escribir los tests.
 
Todos los test deben estar dentro del mismo directorio del componente al que corresponden y tener la extensión `.test.js` para ser fáciles de identificar.
 
 
## 10. Linters y tooling
 
Personalmente no puedo concebir un proyecto actual sin herramientas que te ayuden a controlar los errores más comunes de código, nos ahorraremos mucho tiempo y en proyectos donde colaboramos con un equipo ayuda a mantener un estilo de código similar.
 
Existen muchas herramientas allí afuera pero las indispensables para mi son:
- [ESLint](https://eslint.org/) - Analiza el código semanticamente y alerta si hay errores comunes.
- [Prettier](https://prettier.io/) - Formatea el código.
- [HTML Tidy](https://htmltidy.net/) - Corrector de HTML.
- [StyleLint](https://stylelint.io/) - Linter de CSS


Espero que estas recomendaciones te ayuden a mejorar la experiencia de desarrollo en tu aplicación, si tienes alguna otra recomendación me la puedes hacer llegar por twitter [@enBonnet](https://twitter.com/enbonnet) o directamente por telegram [@enBonnet](https://t.me/enbonnet).

Gracias a [@lcjury](https://twitter.com/lcjury) y [@joseglego](https://twitter.com/joseglego) por la revisión y correción de este articulo.
