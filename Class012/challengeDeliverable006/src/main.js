// WEBSOCKETS
// >> Consigna 1:  

/* Modificar el último entregable para que disponga de 
un canal de websocket que permita representar, por 
debajo del formulario de ingreso, una tabla con la 
lista de productos en tiempo real. 
Puede haber varios clientes conectados simultáneamente 
y en cada uno de ellos se reflejarán los cambios que se 
realicen en los productos sin necesidad de recargar la vista.
Cuando un cliente se conecte, recibirá la lista de productos 
a representar en la vista. */

/* >> Aspectos a incluir en el entregable:
Para construir la tabla dinámica con los datos recibidos por 
websocket utilizar Handlebars en el frontend. Considerar usar 
archivos públicos para alojar la plantilla vacía, y obtenerla 
usando la función fetch( ). Recordar que fetch devuelve una promesa. */

// >> Consigna 2:  

// Añadiremos al proyecto un canal de chat entre los clientes y el servidor.

/* >> Aspectos a incluir en el entregable:
En la parte inferior del formulario de ingreso se presentará el centro de 
mensajes almacenados en el servidor, donde figuren los mensajes de todos 
los usuarios identificados por su email. 
El formato a representar será: email (texto negrita en azul) [fecha y hora 
(DD/MM/YYYY HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde) 
Además incorporar dos elementos de entrada: uno para que el usuario ingrese 
su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes 
y enviarlos mediante un botón. 
Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable). */
    
const Contenedor = require("../contenedor");
const express = require('express')
const handlebars = require('express-handlebars')
const Chat = require("../chat");
const { Socket } = require("socket.io");
const ProductsAPI = require('../model/productos.js')
const ProductosAPI = new ProductsAPI()
const app = express()
const { Router } = express;
const apiRouter = Router();
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server running on port:  ${server.address().port}`)
})
const io = require("socket.io")(server);
server.on("error", error => console.log(`Error server: ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.engine("hbs",handlebars({extname: ".hbs",defaultLayout: 'index.hbs',}));
app.set("view engine", "hbs");
app.set("views", "./view");
app.post('/productos', (req, res) => {
    const producto = req.body
    ProductosAPI.save(producto)
    res.redirect('/')
})
app.get('/productos', (req, res) => {
    const prods = ProductosAPI.toListAll()
    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

let productos = new Contenedor("./productos.txt");
let chat = new Chat("./chat.txt");

io.on("connection", async (socket) => {
    console.log("Un cliente se ha conectado");
  
    const arrayDeProductos = await productos.getAll().then((resolve) => resolve);
    const messages = await chat.getMessages().then((res) => res);
  
    socket.emit("productos", arrayDeProductos);
    socket.emit("messages", messages);
  
    socket.on("new-product", async (data) => {
      await productos.save(data).then((resolve) => resolve);
      const arrayDeProductos = await productos
        .getAll()
        .then((resolve) => resolve);
      io.sockets.emit("productos", arrayDeProductos);
    });
  
    socket.on("new-message", async (data) => {
      await chat.saveMessages(data).then((resolve) => resolve);
      const messages = await chat.getMessages().then((resolve) => resolve);
      io.sockets.emit("messages", messages);
    });
  });

  apiRouter.get("/", async (req, res, next) => {
    res.render("vista");
  });
  
  apiRouter.get("/productos", async (req, res, next) => {
    try {
      const arrayDeProductos = await productos
        .getAll()
        .then((resolve) => resolve);
      if (arrayDeProductos.length === 0) {
        throw new Error("No hay productos");
      }
      res.render("datos", { arrayDeProductos });
    } catch (err) {
      next(err);
    }
  });
  
  apiRouter.get("/productos/:id", async (req, res, next) => {
    try {
      const producto = await productos
        .getById(Number(req.params.id))
        .then((resolve) => resolve);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      res.json(producto);
    } catch (err) {
      next(err);
    }
  });
  
  apiRouter.post("/productos", async (req, res, next) => {
    try {
      const nombresValidos = /^[a-zA-Z0-9ÑñÁáÉéÍíÓóÚú\s]+$/;
      if (!req.body.title || !req.body.price || !req.body.thumbnail) {
        throw new Error("Debes enviar un producto con nombre, precio y URL");
      }
      if (req.body.price <= 0) {
        throw new Error("El precio debe ser mayor a 0");
      }
      if (!nombresValidos.exec(req.body.title)) {
        throw new Error(
          "El nombre solo puede contener letras, números y espacios"
        );
      }
      await productos.save(req.body).then((resolve) => {
        res.redirect("/");
      });
    } catch (err) {
      next(err);
    }
  });
  
  apiRouter.put("/productos/:id", async (req, res, next) => {
    try {
      const producto = await productos
        .getById(Number(req.params.id))
        .then((res) => res);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      await productos
        .update(
          Number(req.params.id),
          req.body.title,
          req.body.price,
          req.body.thumbnail
        )
        .then((resolve) => {
          res.json(resolve);
        });
    } catch (err) {
      next(err);
    }
  });
  apiRouter.delete("/productos/:id", async (req, res, next) => {
    try {
      const producto = await productos
        .getById(Number(req.params.id))
        .then((resolve) => resolve);
      if (!producto) {
        throw new Error("Producto no encontrado");
      }
      await productos.deleteById(Number(req.params.id)).then((resolve) => {
        res.json(`${producto.title} se borro con éxito`);
      });
    } catch (err) {
      next(err);
    }
  });
  
  function handleErrors(err, req, res, next) {
    console.log(err.message);
    res.render("datos", { err });
  }
  apiRouter.use(handleErrors);
  
  

