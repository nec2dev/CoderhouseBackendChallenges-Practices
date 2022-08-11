const Carritos = require("../model/carts");
const Productos = require("../model/products");
let carritos = new Carritos("./model/carritos.txt");
let productos = new Productos("./model/productos.txt");

const getProductsFromCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productsOfCart = await carritos.getProductsFromCart(+id).then((res) => res);
    if (!productsOfCart) {
      throw new Error('Carrito vacio');
    }
    res.json(productsOfCart);
  } catch (error) {
    next (error);
  }
}

const postCart = async (req, res, next) => {
  try {
    const {id_product}= req.body;
    const producto = await productos.getProductById(id_product).then((res) => res);
    if (!producto) {
      throw new Error('No se puede crear el carrito porque el producto no existe');
    }
    const carrito = {productos: [producto]};
    const cart = await carritos.createCart(carrito).then((res) => res);
    res.json(cart.id);
  } catch (error) {
    next(error);
  }
}

const addProductToCart = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {id_product}= req.body;
    const producto = await productos.getProductById(id_product).then((res) => res);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    const cart = await carritos.addProductToCart(+id, producto).then((res) => res);
    if (!cart) {
      throw new Error('Ese carrito no existe');
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

const deleteProductFromCart = async (req, res, next) => {
  try {
    const id_product = +req.params.id_prod;
    const id = +req.params.id;
    const producto = await productos.getProductById(id_product).then((res) => res);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    const cart = await carritos.deleteProductFromCart(id, id_product).then((res) => res);
    if (!cart) {
      throw new Error('Carrito o producto no encontrados')
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

const deleteCart = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const cart = await carritos.deleteCartById(id).then((res) => res);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

module.exports = { getProductsFromCart, postCart, addProductToCart, deleteProductFromCart, deleteCart };
