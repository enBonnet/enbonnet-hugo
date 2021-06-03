---
title: "Como configurar TailwindCSS con Nextjs y TypeScript"
date: 2020-11-02T16:10:36.472Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1604333437/dkqaek6qbzsg95c8sdiy.jpg
description: Una guía rápida para configurar TailwindCSS con TypeScript en un proyecto de Nextjs, además de PostCSS-PurgeCSS para optimizar el CSS.
public: true
---
Si tienes dudas de como iniciar un proyecto con Nextjs con TypeScript por aqui te dejo otro articulo en se explica como hacerlo [Como agregar TypeScript a Nextjs en 2 pasos](https://enbonnet.me/article/55/como-agregar-typescript-a-nextjs-en-2-pasos).

Una vez que tenemos el proyecto con TypeScript comenzamos la configuración de TailwindCSS, primero instalamos las dependencias, el CLI de TailwindCSS y PostCSS:

```bash
yarn add -D tailwindcss postcss-preset-env
```

Luego nos ayudamos de `npx` para iniciar la configuración:

```bash
npx tailwind init
```

Este comando generará el archivo `tailwind.config.js`, luego lo abrimos y cambiamos el contenido para que quede algo similar a este:

```javascript
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
```
*Los parámetros dentro de `future` son flags de compatibilidad entre versiones de TailwindCSS*.

Creamos el archivo `postcss.config.js` con una configuración inicial:

```javascript
module.exports = {
  plugins: [
    "tailwindcss", 
    "postcss-preset-env"
  ]
};
```

Ahora necesitamos un archivo de estilos donde vamos a importar todas las clases de tailwindcss, me gusta crearlo en `styles/tailwind.css` y debería tener un contenido similar a este:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Este archivo lo vamos a importar en `_app.tsx`:

```javascript
import type { AppProps } from "next/app";
import "../styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

De esa forma ya aplicamos las clases de tailwind a todo el proyecto.

#### Para limpiar las clases que no usamos

Vamos a configurar un plugin de PurgeCSS `@fullhuman/postcss-purgecss`, instalamos la dependencia:

```bash
yarn add -D @fullhuman/postcss-purgecss
```

Luego cambiamos el archivo `postcss.config.js` para que quede similar a:

```javascript
const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "tailwindcss",
    process.env.NODE_ENV === "production" ? purgecss : undefined,
    "postcss-preset-env",
  ],
};
```

De esta forma nos aseguramos de que se limpien las clases solo en producción, *esta configuración genera un warning en la consola de desarrollo porque se le pasa un `undefined` en el array de plugins*.

Tambin necesitamos agregar unos comentarios en el archivo `tailwind.css`:

```css
/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
```

¡Con esto estamos listos!
A disfrutar de TailwindCSS