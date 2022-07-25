const express = require('express');
const routes = express.Router();
const productosController = require('../controller/controller.js');

exports.allProducts = routes.get('/', productosController.consultaProductos);
exports.idProduct = routes.get('/:id', productosController.consultaProductoId);
exports.newProduct = routes.post('/', productosController.saveProducto);
exports.newProductHtml = routes.post('/html', productosController.saveProductoHtml);
exports.updateProduct = routes.put('/:id', productosController.updateProductoId);
exports.deleteProduct = routes.delete('/:id', productosController.deleteProductoId);