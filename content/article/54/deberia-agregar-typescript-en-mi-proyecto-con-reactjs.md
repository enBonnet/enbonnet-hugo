---
title: "¿Debería agregar TypeScript en mi proyecto con Reactjs?"
date: 2020-07-21T23:03:53.540Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1595372633/ik4b6ag2mghkftchtimz.jpg
summary: Si te estas preguntando si vale la pena TypeScript o tienes ganas de hacer todo desde cero con TS quizás te pueda ayudar en algo aquí.
draft: true
---
Este es un árticulo bastente opinionado, no solo por mi, estuve conversando con algunes devs en un [tweet relacionado](https://twitter.com/enBonnet/status/1285573234621063173). 

# Versión corta

Si quieres respuestas rápidas:

¿Debería implementar TypeScript en mi proyecto con Reactjs?

Si

¿Vale la pena implementar TypeScript en mi proyecto?

Si

¿Mi proyecto necesita TypeScript?

No

# Versión larga o zona de `depende`

Si llegaste hasta aquí quizás quieres saber un poco más en profundidad las consideraciones que debes tener en mente al pensar si deberías usar o no TypeScript en tu proyecto así que vamos a ver

## ¿Debería implementar TypeScript en mi proyecto con Reactjs?

Como dije antes, si, teniendo en mente que TS es un super set de features que se agregan sobre JS nunca estará de más, siempre resulta en un aporte para tu proyecto. Podría ser considerado como tooling (visto de una forma muy simplista), que se enfoca en agregar tipos a tu código de JS, por ejemplo:

```javascript
 const imFunc = (imParam, otherParam) => {
  // Ahora necesitamos validar que imParam existe
  // pero de que tipo es imParam??
  if (imParam.length) {
    // Es valido, ahora podemos hacer algo con imParam
    return imParam.map(oneParam => oneParam + " hey! i'm with a param");
    // Entonces parece que imParam es un array!
  } else if(otherParam) {
    // Hacer algo más con el otro parametro
    return imParam + otherParam;
    // Espera, pero en este caso otherParam parece ser un string? quizás es un número?
    // Y el otor parametro que es???
  }
}
```

Este código es totalmente funcional a menos de que pases una cadena de texto (string) en el imParam y se rompera todo porque no tiene el metodo `map`, pero técnicamente es código JS valido. TypeScript por otro lado nos ahorraría la molestía de tener que ejecutar este código para probarlo, ya que los parametros deberían tener un tipo definido y en caso de que `imParam` fuera un arreglo de elemementos (array) deberiamos tener definido los tipos de cada uno de sus elementos y nos avisaría de que en el segundo caso estamos intentando concatenar (+) un arreglo de elementos con una cadena de texto lo que no es posible.

Aunque sabemos que no se debería escribir una función así TypeScript es la voz de la consciencia que nos ayuda a recordarlo.

Además del beneficio obvio de tener los tipos en cada parametros nos reduce las dudas acerca de lo que puede estar pasando en el código o en donde está el error.

...

