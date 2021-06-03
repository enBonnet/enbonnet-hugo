---
title: "Especificidad en CSS: Apuntes que deberías saber"
date: 2020-02-10T18:24:17.306Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1581359057/mdhr5msm6hkhehfciccx.jpg
summary: La especificidad de CSS es la forma en que los navegadores aplican los estilos a nuestros elementos y que regla predomina sobre el otro.
draft: true
---
Cada capa del desarrollo de aplicaciones o páginas web son relativamente sencillas hasta que tienes que mantener un proyecto con 3 años de desarrollo, más de 30 personas trabajando en el código, pues el CSS no es una excepción, lo sencillo que puede ser al comienzo es lo que a su vez lo hace complejo. Cualquiera puede hacer CSS en un proyecto nuevo, pero mantenerlo o agregar nuevas funciones al código existente es otro proceso muy diferente.

---

Cada vez que creas una regla de CSS e intentas aplicarlo a un elemento dentro del dom y este no reacciona a las reglas o aplica algunas propiedades pero otras se sobre escriben con valores que no son los que describiste exactamente. Los navegadores son los encargados de aplicar las reglas de CSS descritas sobre los elementos, más sus propias reglas y la especificidad es lo que determina que propiedad será la que debe tomar el elemento en cuestión.

Dos cosas que debemos tener en cuenta sobre la especificidad:

- Orden, las relgas se leen de arriba hacía abajo.
- Peso, cada regla tiene un peso.

El peso predomina sobre el orden `Peso > Orden` esa es la razón por la que en algunos casos una regla escrita al final del archivo CSS no se apliquen como esperas sobre un elemento.



