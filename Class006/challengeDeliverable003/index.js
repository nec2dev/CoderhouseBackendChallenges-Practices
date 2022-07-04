/*>> Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e 
implemente los siguientes endpoints en el puerto 8080:
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío 
anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como 
en el ejemplo del desafío anterior.*/

const Contenedor = require("./contenedor");
const express = require('express');
const app = express();
const PORT = 8080;
const PRODUCTOS = new Contenedor("productos.txt")

PRODUCTOS.init();
app.listen(PORT);

app.on("error", (error) => {
    console.log("Error");
});

app.get("/", (req, res) => {
    res.send('<h1 style=color:blue;>Bienvenidos al Servidor Express</h1>');
});

/*Ruta get '/productos' que devuelva un array con todos los productos disponibles en 
el servidor*/
app.get("/productos", async(req, res) => {
    let productos = await PRODUCTOS.getAll();
    res.send(productos);
});

/*Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos 
los productos disponibles*/
app.get("/productoRandom", (req, res) => {
    res.send(PRODUCTOS.getById(Math.floor(Math.random() * (PRODUCTOS.countID - 1 + 1) + 1)));
});