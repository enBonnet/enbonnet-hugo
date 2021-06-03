---
title: "Construir API Golang con Fiber"
date: 2020-06-26T17:59:25.300Z
featured_image: https://res.cloudinary.com/enbonnet/image/upload/v1593531451/ah3u2hiparvqxcgwnvtb.jpg
description: Fiber es un framework web que nos puede ayudar a crear una API con sabores similares a Express de Nodejs
public: true
---
[Fiber](https://github.com/gofiber/fiber/) es un framework de Golang, inspirado en Express de Nodejs, uno de los más utilizados para construir API web actualmente, es una alternativa muy viable si vienes desde Nodejs a Golang.
 
# ¿Porque Golang?
 
Es el primer artículo de este blog en el que tocó un tema relacionado a Golang y quizás puede quedar la duda, si con JS puedes hacer lo mismo y está mucho más pulido para el mundo de la web, con herramientas y módulos, si quieres tipos podrías usar TypeScript y listo, pero en mi caso al probar TS me gusto mucho, pero me quedaba el mal sabor de la cantidad de herramientas que debes configurar sobre JS para sacarle provecho a TS, adicional a eso los proceso que se le agregan a la programación con el paso de transpilación.
 
En la búsqueda de una alternativa me encontré con [Golang](https://golang.org/) (y su [Gopher](https://blog.golang.org/gopher)) me pareció genial, un lenguaje moderno, tipado fuerte, compilado, con muchas herramientas preconfiguradas por debajo que ayudan a mantener el código bastante estandarizado y otras cosas que fui descubriendo en el camino... Si quieres conversar en profundidad al respecto me puedes contactar por cualquiera de las redes sociales.
 
# ¿Porque Fiber?
 
Esta pregunta es interesante, el cuestionamiento puede partir desde por que usar Fiber que es un framework de Golang cuando Nodejs tiene Express o Prisma que están mucho más probados para la web con herramientas que te ahorran escribir mucho código, hay una conversación muy interesante al respecto en [Reddit](https://www.reddit.com/r/golang/comments/dwmwtc/why_use_golang_for_a_rest_api/).
 
En mi caso quería usar Golang y en el camino me encontré con muchísimas alternativas de frameworks web, incluido el paquete [net/http](https://golang.org/doc/articles/wiki/) que incluye el lenguaje por defecto con el que puedes construir directamente una API sin nada más, luego vi algunas alternativas como [Gin](https://github.com/gin-gonic/gin) y el crack de [@hsorellana](https://twitter.com/hsorellana) me recomendo probar [Echo](https://echo.labstack.com/), cada uno con sus particularidades y muy alimentados por el entorno de golang basado en paquetes, interfaces y structs.
 
Con estas 3 comparaciones en mente se me cruzó en el camino Fiber que pude comprender más fácilmente por su inspiración en Express, la forma de manejar los paquetes como veremos más adelante se siente muy amigable, es como tener lo bueno del mundo Golang utilizando un framework que me permite utilizar lo que ya conozco de Express.
 
# Características principales de Fiber:
 
- Utiliza [Fasthttp](https://github.com/valyala/fasthttp) un cliente web rápido, muy rápido.
- Optimizado para bajo consumo de memoria.
- Facilita el manejo de parámetros.
- Implementa Middlewares que pueden usar `Next()`.
 
# Veamos algunas comparaciones
 
Comenzamos como siempre con nuestro amigo `Hello, World!`, según Express puede ser algo así:
 
```js
const app = express()
 
app.get('/', (req, res) => res.send('Hello, World!'))
 
app.listen(8080)
```
 
Y con Fiber:
 
```go
app := fiber.New()
 
app.Get("/", func(c *fiber.Ctx) {
 c.Send("Hello, World!")
})
 
app.Listen(8080)
```
 
 
Puedes ver varios ejemplos en el [repositorio de ejemplos](https://github.com/gofiber/recipes).
 
# ¿Es rápido Fiber?
 
Si, pero no me creas a mi hay muchos benchmark que hacen comparaciones de los diferentes frameworks de Golang [go-web-framework-benchmark](https://github.com/smallnest/go-web-framework-benchmark) y un articulo de [koddr](https://dev.to/koddr) en [dev.to](https://dev.to/koddr/are-sure-what-your-lovely-web-framework-running-so-fast-2jl1) que compara Express con Fiber cara a cara.
 
 
# ¿Que necesitamos?
 
- Un conocimiento básico de Golang, aunque intentaré ir explicando un poco como es costumbre.
- Instalar Golang 1.12 en adelante, [obtener Golang](https://golang.org/dl/).
- Posicionarnos dentro del directorio `$GOPATH/scr` con `cd $GOPATH/src`
 
# Estamos listos para escribir código
 
Si quieres saltarte toda esta parte y descargar el código directamente puedes al [repositorio en Github](https://github.com/enBonnet/api-simple-golang-fiber). Pero puedes seguir esta guía paso a paso para que llegues exactamente al mismo resultado.
 
Una vez dentro del directorio `$GOPATH/src` creamos un directorio e iniciamos el proyecto:
 
```bash
mkdir api-simple
cd api-simple
go mod init
```
 
En caso de que te avise que los módulos no están habilitados usa el comando `export GO111MODULE=on` para habilitarlos e intenta de nuevo `go mod init`, este comando nos genera un archivo `go.mod` que es similar al `package.json`, se encarga de anotar las dependencias del proyecto, las versiones, si es una dependencias directa o indirecta, entre otras cosas.
 
Si vamos a usar Fiber, debemos decirle que nos traiga el paquete de Fiber:
 
```bash
go get github.com/gofiber/fiber
```
 
Ahora creamos el archivo de entrada para el proyecto, Golang usa un archivo `main.go`, así que lo agregamos y para nuestro ejemplo debe contener lo siguiente:
 
```go
package main
 
import "github.com/gofiber/fiber"
 
func main() {
 app := fiber.New()
 
 app.Get("/", func(c *fiber.Ctx) {
   c.Send("Hello, World!")
 })
 
 app.Listen(3000)
}
```
 
Están pasando varias cosas aquí, se declara el paquete main, dentro del archivo main, que será el paquete de entrada y archivo de entrada para nuestro proyecto, dentro estamos importando Fiver y declarando la función main que crea un servidor web con Fiber y se declara un endpoint en la raíz de método GET que devuelve un `Hello, World!` en texto plano, al final le decimos al servidor web que escuche las peticiones en el puerto 3000, tal y como lo vimos en el ejemplo anterior.
 
Si todo está bien, al ejecutar `go run main.go` veremos el mensaje:
 
```bash
       _______ __
 ____ / ____(_) /_  ___  _____
_____ / /_  / / __ \/ _ \/ ___/
 __ / __/ / / /_/ /  __/ /
   /_/   /_/_.___/\___/_/ v1.12.0
Started listening on 0.0.0.0:3000
```
 
Si consultamos la url `localhost:3000` podemos ver el mensaje `Hello, World!`, ¡Yay! Tenemos un servidor web funcionando.
 
# Mover el handler o controlador
 
Al ser otro lenguaje es normal que tenga otros paradigmas a pesar de las similitudes, no hay nada escrito en piedra al respecto pero en algunos ejemplos los he visto como Controllers, a la forma de JS y en otros como Handlers más del estilo Golang. Pero vamos a desacoplar para que se entienda mejor, aún dentro del archivo `main.go` vamos a cambiar el código:
 
```go
package main
 
import (
	"github.com/gofiber/fiber"
)
 
func helloWorld(c *fiber.Ctx) {
	c.Send("Hello, World!")
}
 
func setupRoutes(app *fiber.App) {
	app.Get("/", helloWorld)
}
 
func main() {
	app := fiber.New()
 
	setupRoutes(app)
	app.Listen(3000)
}
```
 
Con este cambio estamos sacando de la función main la declaración del endpoint y a su vez en handler del mismo, declarando la función `setupRoutes` que se encarga de registrar las rutas de los endpoints por ahora solo el GET de la raíz, solo que ahora el método get recibe la ruta `"/"` y la función `helloWorld` que es nuestro handler.
 
Hasta aquí todo funciona de la misma forma pero comenzamos a desacoplar las funciones del proyectos para poder organizar y reutilizar.
 
# Agreguemos algunos endpoints
 
Como sabemos una API tiene más de un método y eso fue lo que vinimos a hacer aquí. En este ejemplo veamos una API que nos permita controlar libros con un CRUD.
 
Entonces necesitamos los endpoints:
 
- GET con la ruta `api/v1/book` - para leer todos los books.
- GET con la ruta `api/v1/book/:id` - para leer un book.
- POST con la ruta `api/v1/book` - para crear o registrar un book.
- PATH con la ruta `api/v1/book/:id` - para actualizar la información de un book.
- DELETE con la ruta `api/v1/book/:id` - para eliminar un book.
 
Para eso vamos a crear los handlers primero, de esta forma nos ahorramos algunos errores del linter de Golang cuando vayamos a buscar algun metodo, para eso creamos el paquete de `book` y el archivo `book.go`, en la raíz del proyecto:
 
```bash
mkdir book
cd book
touch book.go
```
 
Dentro de `book.go` vamos a crear las funciones que luego serán nuestros handlers:
 
```go
package book
 
import (
	"github.com/gofiber/fiber"
)
 
func GetBooks(c *fiber.Ctx) {
	c.Send("Te muestro todos los Books")
}
 
func GetBook(c *fiber.Ctx) {
	c.Send("Solo un Book")
}
 
func NewBook(c *fiber.Ctx) {
	c.Send("Nuevo Book")
}
 
func UpdateBook(c *fiber.Ctx) {
	c.Send("Actualizar Book")
}
 
func DeleteBook(c *fiber.Ctx) {
	c.Send("Borrar Book")
}
```
 
Tenemos todos nuestros handlers de book dentro del paquete book, uno para cada Endpoint, ahora podemos asignar las rutas y los métodos en el `main.go`
 
```go
package main
 
import (
	"api-simple/book"
 
	"github.com/gofiber/fiber"
)
 
func helloWorld(c *fiber.Ctx) {
	c.Send("Hello, World!")
}
 
func setupRoutes(app *fiber.App) {
	app.Get("/", helloWorld)
 
	app.Get("/api/v1/book", book.GetBooks)
	app.Get("/api/v1/book/:id", book.GetBook)
	app.Post("/api/v1/book", book.NewBook)
       app.Patch("/api/v1/book/:id", book.UpdateBook)
	app.Delete("/api/v1/book/:id", book.DeleteBook)
}
 
func main() {
	app := fiber.New()
 
	setupRoutes(app)
	app.Listen(3000)
}
```
 
Agregamos un par de cosas aquí; importamos dentro del main el paquete book con el import de `api-simple/book` de esa forma nos traemos todo el paquete `book`luego podemos usar los métodos que estén declarados por medio de `book.Metodo`, unimos los métodos con las rutas dentro de la función `setupRoutes`, si ejecutas ahora el proyecto podrás ver los mensajes en texto plano que tenemos en los handlers.
 
Podemos probar con nuestro amigo `curl` :
 
```bash
curl http://localhost:3000/api/v1/book
Te muestro todos los Books
 
$ curl http://localhost:3000/api/v1/book/1
Solo un Book
 
$ curl -X POST http://localhost:3000/api/v1/book
Nuevo Book
 
$ curl -X PATCH http://localhost:3000/api/v1/book/1
Actualizar Book
 
$ curl -X DELETE http://localhost:3000/api/v1/book/1
Borrar Book
```
 
¡Todo bien!
 
# Agrupando los Endpoints
 
En la implementación que tenemos hasta el momento funciona, pero estamos repitiendo muchas veces el prefijo de las rutas para cada endpoint `api/v1/` para evitar esto Fiber nos provee con el método `Group` el cual recibe un string y una función opcional que puede ser un Middleware o un Handler, con este cambio nuestro `main.go` quedaría así:
 
```go
package main
 
import (
	"api-simple/book"
 
	"github.com/gofiber/fiber"
)
 
func helloWorld(c *fiber.Ctx) {
	c.Send("Hello, World!")
}
 
func setupRoutes(app *fiber.App) {
	app.Get("/", helloWorld)
 
	api := app.Group("/api")
	v1 := api.Group("/v1")
 
	v1.Get("/book", book.GetBooks)
	v1.Get("/book/:id", book.GetBook)
	v1.Post("/book", book.NewBook)
	v1.Patch("/book/:id", book.UpdateBook)
	v1.Delete("/book/:id", book.DeleteBook)
}
 
func main() {
	app := fiber.New()
 
	setupRoutes(app)
	app.Listen(3000)
}
```
 
Ahora están mejor ordenadas las rutas. En este punto tenemos todas las rutas y los handlers del CRUD que necesitamos para Book, ahora necesitamos una base de datos para persistir estos datos.
 
# Agregando la base de datos
 
Para esta misión me voy a servir de uno de mis paquetes favoritos ~por ahora~ del ecosistema de Golang que es [gorm](https://gorm.io/) que buen nombre, (Go + Orm = Gorm) el nombre se explica a si mismo, hermoso.
 
Para usar gorm tenemos que traer el módulo, ejecutamos el comando:
 
```bash
go get -u github.com/jinzhu/gorm
```
 
Ahora creamos el paquete `database` para ello:
 
```bash
mkdir database
cd database
touch database.go
```
 
Dentro del archivo `database.go` agregamos lo siguiente:
 
```go
package main
 
import (
	"api-simple/book"
	"api-simple/database"
	"fmt"
 
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)
 
func helloWorld(c *fiber.Ctx) {
	c.Send("Hello, World!")
}
 
func setupRoutes(app *fiber.App) {
	app.Get("/", helloWorld)
 
	api := app.Group("/api")
	v1 := api.Group("/v1")
 
	v1.Get("/book", book.GetBooks)
	v1.Get("/book/:id", book.GetBook)
	v1.Post("/book", book.NewBook)
	v1.Patch("/book/:id", book.UpdateBook)
	v1.Delete("/book/:id", book.DeleteBook)
}
 
func initDatabase() {
	var err error
	database.DB, err = gorm.Open("sqlite3", "books.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
}
 
func main() {
	app := fiber.New()
	initDatabase()
 
	setupRoutes(app)
	app.Listen(3000)
 
	defer database.DB.Close()
}
 
```
 
De esta forma agregamos el método `initDatabase` que se encargará de conectarnos a la base de datos `books.db`, agregamos el cierre de la conexión con la base de datos también dentro de la función `main` que es una buena práctica, además de importar los paquetes de `gorm`, `fmt` para imprimir en la consola y el dialecto de sqlite.
 
Al ejecutar de nuevo nuestro proyecto con `go run main.go` se creará el archivo `books.db` en caso de que no exista.
 
# Comencemos a manejar la data
 
En este punto tenemos listas las rutas, los handlers o controllers y la base de datos, ahora vamos a darle poderes a nuestros handlers para que pueda manipular la base de datos, para ellos necesitamos definir el `struct` o estructura de books, puedes pensar en las estructuras como objetos de JavaScript, para ellos vamos al archivo `book/book.go` y agregamos el siguiente código justo debajo de los imports, también debemos importar el paquete de gorm:
 
```go
type Book struct {
	gorm.Model
	Title  string `json:"title"`
	Author string `json:"author"`
	Rating int    `json:"rating"`
}
```
 
`gorm.Model` le agrega campos por defecto a la tabla que representa este `struct` en la base de datos, como el campo `CREATE_AT` de Squelize, tenemos entonces el nombre de los campos, el tipo y el nombre dentro del json. Luego veremos cómo debería quedar el archivo `book.go`, ahora debemos importar también la variable `DB` que creamos en el paquete `database` y el dialecto de sqlite.
 
Por lo que nuestro archivo `book/book.go` debería de verse así:
 
```go
package book
 
import (
	"api-simple/database"
 
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)
 
type Book struct {
	gorm.Model
	Title  string `json:"name"`
	Author string `json:"author"`
	Rating int    `json:"rating"`
}
 
func GetBooks(c *fiber.Ctx) {
	c.Send("Te muestro todos los Books")
}
 
func GetBook(c *fiber.Ctx) {
	c.Send("Solo un Book")
}
 
func NewBook(c *fiber.Ctx) {
	c.Send("Nuevo Book")
}
 
func UpdateBook(c *fiber.Ctx) {
	c.Send("Actualizar Book")
}
 
func DeleteBook(c *fiber.Ctx) {
	c.Send("Borrar Book")
}
```
 
Con el `struct` de Book en posición tenemos que decirle a `gorm` que lo cargue como una tabla, para esto vamos de nuevo al archivo `main.go` y en la función `initDatabase` agregamos el metodo `AutoMigrate`, esta función debería quedar algo así:
 
```go
func initDatabase() {
	var err error
	database.DB, err = gorm.Open("sqlite3", "books.db")
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("Connection Opened to Database")
	database.DB.AutoMigrate(&book.Book{})
	fmt.Println("Database Migrated")
}
```
 
Ahora estamos listos para darle poderes a los handlers:
 
### GetBooks
Leer todos los books
 
```go
func GetBooks(c *fiber.Ctx) {
	db := database.DB
	var books []Book
	db.Find(&books)
	c.JSON(books)
}
```
 
### GetBook
Leer un book por el ID
 
```go
func GetBook(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DB
	var book Book
	db.Find(&book, id)
	c.JSON(book)
}
```
 
### NewBook
Crear un book, con `bodyParser` controlamos los parámetros que vienen en el body
 
```go
func NewBook(c *fiber.Ctx) {
	db := database.DB
	book := new(Book)
	if err := c.BodyParser(book); err != nil {
		c.Status(503).Send(err)
		return
	}
	db.Create(&book)
	c.JSON(book)
}
```
 
### UpdateBook
Actualizar un book por el id y el body
 
```go
func UpdateBook(c *fiber.Ctx) {
	type DataUpdateBook struct {
		Title  string `json:"title"`
		Author string `json:"author"`
		Rating int    `json:"rating"`
	}
	var dataUB DataUpdateBook
	if err := c.BodyParser(&dataUB); err != nil {
		c.Status(503).Send(err)
		return
	}
	var book Book
	id := c.Params("id")
	db := database.DB
	db.First(&book, id)
 
	book = Book{
		Title:  dataUB.Title,
		Author: dataUB.Author,
		Rating: dataUB.Rating,
	}
	db.Save(&book)
	c.JSON(book)
}
```
 
### DeleteBook
Borrar un libro por el ID
 
```go
func DeleteBook(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DB
 
	var book Book
	db.First(&book, id)
	fmt.Println(&book)
	if book.Title == "" {
		c.Status(500).Send("No Book Found with ID")
		return
	}
	db.Delete(&book)
	c.Send("Book Successfully deleted")
}
``` 
 
Al finalizar todos estos cambios nuestro archivo `book.go` debe lucir así:
 
```go
package book
 
import (
	"api-simple/database"
 
	"github.com/gofiber/fiber"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)
 
type Book struct {
	gorm.Model
	Title  string `json:"title"`
	Author string `json:"author"`
	Rating int    `json:"rating"`
}
 
func GetBooks(c *fiber.Ctx) {
	db := database.DB
	var books []Book
	db.Find(&books)
	c.JSON(books)
}
 
func GetBook(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DB
	var book Book
	db.Find(&book, id)
	c.JSON(book)
}
 
func NewBook(c *fiber.Ctx) {
	db := database.DB
	book := new(Book)
	if err := c.BodyParser(book); err != nil {
		c.Status(503).Send(err)
		return
	}
	db.Create(&book)
	c.JSON(book)
}
 
func UpdateBook(c *fiber.Ctx) {
	type DataUpdateBook struct {
		Title  string `json:"title"`
		Author string `json:"author"`
		Rating int    `json:"rating"`
	}
	var dataUB DataUpdateBook
	if err := c.BodyParser(&dataUB); err != nil {
		c.Status(503).Send(err)
		return
	}
	var book Book
	id := c.Params("id")
	db := database.DB
	db.First(&book, id)
 
	book = Book{
		Title:  dataUB.Title,
		Author: dataUB.Author,
		Rating: dataUB.Rating,
	}
	db.Save(&book)
	c.JSON(book)
}
 
func DeleteBook(c *fiber.Ctx) {
	id := c.Params("id")
	db := database.DB
 
	var book Book
	db.First(&book, id)
	if book.Title == "" {
		c.Status(500).Send("No Book Found with ID")
		return
	}
	db.Delete(&book)
	c.Send("Book Successfully deleted")
}
 
```
 
¡Guardamos los cambios, ejecutamos el proyecto y ahora podemos probar todos los endpoints!
 
Si quieres probar con Postman te dejo mi colección [aquí](https://www.getpostman.com/collections/7fffc4d209bbb797b994).
 
Por otro lado si tienes alguna duda al respecto del codigo o algo no funciona como debería puedes ir a echarle un ojo al [repositorio en Github](https://github.com/enBonnet/api-simple-golang-fiber).
 
Si quieres ver otro ejemplos de Fiber puedes ir al repositorio de ejemplos [text](link)
 
He podido compartir tres ejemplos en este repositorio:
- API similar a la de este articulo con gorm, la puedes ver [aquí](https://github.com/gofiber/recipes/tree/master/gorm).
- API con JWT, entrega de token y validación aquí, la puedes ver [aquí](https://github.com/gofiber/recipes/tree/master/jwt).
- API con Auth de usurio con email o username, la puedes ver [aquí](https://github.com/gofiber/recipes/tree/master/auth-jwt).
 
Cualquier duda me puedes contactar por mis redes sociales o telegram, estaré feliz de aclararla o si cometí algún error igual es bienvenido, aún estoy aprendiendo sobre Golang y todas sus maravillas.
 
Espero te sea de utilidad esta información y como siempre te deseo mucho éxito en tu camino de aprendizaje.
