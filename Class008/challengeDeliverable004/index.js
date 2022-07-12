/*>> Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca 
una API RESTful de productos. En detalle, que incorpore las siguientes rutas:*/
/*Cada producto estará representado por un objeto con el siguiente formato:
    {
      title: (nombre del producto),
      price: (precio),
      thumbnail: (url al logo o foto del producto)
    }*/
/*Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando 
en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será 
utilizado para identificar un producto que va a ser listado en forma individual.*/

const Contenedor = require("./controller/contenedor.js");
const express = require("express");
const app = express();
const port = '8080';
const { Router } = express;
const router = Router();
const productos = new Contenedor(__dirname + "/model/productos.json");
const serverExpress = app.listen(port, () => {
  console.log(`Server running on port ${serverExpress.address().port}`);
});

serverExpress.on('error', (error) => {`Error en el servidor: ${error}`});
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('view'));
// app.use('/api/productos', rutas.allProducts);
// app.use('/api/productos', rutas.idProduct);
// app.use('/api/productos', rutas.newProduct);
// app.use('/api/productos', rutas.newProductHtml);
// app.use('/api/productos', rutas.updateProduct);
// app.use('/api/productos', rutas.deleteProduct);

// GET '/api/productos' -> devuelve todos los productos.
router.get("/", (req, res) => {
  return res.json(productos.content);
});

// GET '/api/productos/:id' -> devuelve un producto según su id.
router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.getById(id));
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post("/", (req, res) => {
  let obj = req.body;
  return res.json(productos.save(obj));
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put("/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  return res.json(productos.update(id, obj));
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.deleteById(id));
});

