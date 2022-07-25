// Incorporando Handlebars
// >> Consigna:  
/* 1)Utilizando la misma API de productos del proyecto entregable 
de la clase anterior, construir un web server (no REST) que 
incorpore: */
    /* a) Un formulario de carga de productos en la ruta raíz 
    (configurar la ruta '/productos' para recibir el POST, y 
    redirigir al mismo formulario). */
    /* b) Una vista de los productos cargados (utilizando plantillas 
        de handlebars) en la ruta GET '/productos'. */
    /* c) Ambas páginas contarán con un botón que redirija a la otra. */
/* 2) Manteniendo la misma funcionalidad reemplazar el motor de plantillas 
handlebars por pug. */
/* 3) Manteniendo la misma funcionalidad reemplazar el motor de plantillas 
handlebars por ejs. */
/* 4) Por escrito, indicar cuál de los tres motores de plantillas prefieres 
para tu proyecto y por qué. */
    

const express = require('express')
const ProductsAPI = require('../model/productos.js')
const ProductosAPI = new ProductsAPI()
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server running on port:  ${server.address().port}`)
})

server.on("error", error => console.log(`Error server: ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './view');
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

