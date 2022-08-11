const express = require("express");
const cartsControllers = require("../controller/cart");
const { Router } = express;
const apiCarritos = Router();

apiCarritos.get("/:id/productos", cartsControllers.getProductsFromCart)
.post("/", cartsControllers.postCart)
.post('/:id/productos', cartsControllers.addProductToCart)
.delete("/:id/productos/:id_prod", cartsControllers.deleteProductFromCart)
.delete("/:id", cartsControllers.deleteCart);

module.exports = apiCarritos;
