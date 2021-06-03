---
title: "Como agregar TypeScript a Nextjs en 2 pasos"
date: 2020-11-02T00:25:07.645Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1604276707/tejk4dmtbrd5heapxlsd.jpg
description: Una guía para agregar TypeScript a un proyecto con Nextjs
public: true
---
Nextjs puede ser de gran ayuda para sacarle provecho a Reactjs, cuando le agregamos TypeScript puede llegar a ser aún mejor.
 
1- Crear un proyecto de Nextjs, como de costumbre usando `npx`:
 
```bash
npx create-next-app nextjs-con-typescript --use-npm
```
 
2- Agregamos las dependencias necesarias:
 
```bash
npm install --save-dev typescript @types/react @types/node
```
 
Una vez instalado todo lo necesario le puedes cambiar la extension al archivo `pages/index.js` a `pages/index.tsx` entonces Nextjs generará automáticamente el archivo `tsconfig.json` que es donde se guardan las configuraciones para transpilar TypeScript.
 
Listo! Ahora puedes ejecutar tu proyecto y funcionará según lo esperado
 
```bash
npm run dev
```
 
Puedes notar que también se generó el archivo `next-env.d.ts` en la raíz del proyecto, no necesitamos tocarlo.
 
#### Tipos incluidos
 
Por otro lado Nextjs incluye los tipos que puedas necesitar, para cada uno de los métodos de renderizado:
 
```javascript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
 
export const getStaticProps: GetStaticProps = async context => {
 // ...
}
 
export const getStaticPaths: GetStaticPaths = async () => {
 // ...
}
 
export const getServerSideProps: GetServerSideProps = async context => {
 // ...
}
```
 
Tipos para los controladores del api:
 
```javascript
import { NextApiRequest, NextApiResponse } from 'next'
 
export default (req: NextApiRequest, res: NextApiResponse) => {
 // ...
}
```
 
Para el archivo `_app.tsx` en caso de que quieras personalizarlo:
 
```javascript
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
```
 
También para el archivo `_document.tsx`:
 
```javascript
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";
 
class MyDocument extends Document {
 static async getInitialProps(ctx: DocumentContext) {
   const initialProps = await Document.getInitialProps(ctx);
 
   return initialProps;
 }
 
 render() {
   return (
     <Html>
       <Head />
       <body>
         <Main />
         <NextScript />
       </body>
     </Html>
   );
 }
}
 
export default MyDocument;
```
 
De estas formas Nextjs nos permite incluir TypeScript y sacarle el máximo provecho.
