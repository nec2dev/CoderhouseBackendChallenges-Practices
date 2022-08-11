const fs = require("fs");
class Carritos {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAllCarts() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      if (!contenido) {
        const carts = [];
        fs.writeFileSync(this.archivo, JSON.stringify(carts));
        return carts;
      }
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      throw error;
    }
  }

  async getProductsFromCart(id) {
    try {
      const array = await this.getAllCarts().then((res) => res).catch((err) => {
        throw err;
      });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i].productos;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async createCart(obj) {
    try {
      const array = await this.getAllCarts().then((res) => res).catch((error) => {
        throw error;
      });
      obj.timestamp = Date.now();
      if (array.length <= 0) {
        obj.id = 1;
        array.push(obj);
        const data = JSON.stringify(array);
        fs.writeFileSync(this.archivo, data, "utf-8");
        return obj;
      }
      obj.id = array.length + 1;
      array.push(obj);
      const data = JSON.stringify(array);
      fs.writeFileSync(this.archivo, data, "utf-8");
      return obj;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(id, product) {
    try {
      const array = await this.getAllCarts().then((res) => res).catch((error) => {
        throw error;
      });
      if (array.length <= 0) {
        return null;
      }
      for (let carrito of array) {
        if (carrito.id === id) {
          carrito.productos.push(product);
          const data = JSON.stringify(array);
          fs.writeFileSync(this.archivo, data, "utf-8");
          return carrito;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCarts() {
    try {
      const array = await this.getAllCarts().then((res) => res).catch((error) => {
        throw error;
      });
      if (array.length >= 1) {
        fs.writeFileSync(this.archivo, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCartById(id) {
    try {
      let array = await this.getAllCarts().then((res) => res).catch((error) => {
        throw error;
      });
      let cartToDelete;
      if (array.length <= 0) {
        return null;
      }
      for (let carrito of array) {
        if (carrito.id === id) {
          cartToDelete = carrito;
        }
      }
      array = array.filter((obj) => {
        return obj.id !== id;
      });
      for (let i = 0; i < array.length; i++) {
        if (array[i].id > id) {
          array[i].id -= 1;
        }
      }
      if (!cartToDelete) {
        return null;
      }
      fs.writeFileSync(this.archivo, JSON.stringify(array), "utf-8");
      return cartToDelete;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(id, id_prod) {
    try {
      let array = await this.getAllCarts().then((res) => res).catch((error) => {
        throw error;
      });
      let productoBorrado;
      if (array.length <= 0) {
        return null;
      }
      for (let carrito of array) {
        if (carrito.id === id) {
          carrito.productos = carrito.productos.filter((prod) => {
            productoBorrado = prod.id === id_prod ? prod : null;
            return prod.id != id_prod;
          });
        }
      }
      if (!productoBorrado) {
        return null;
      }
      fs.writeFileSync(this.archivo, JSON.stringify(array), "utf-8");
      return productoBorrado;
    } catch (error) {
      throw error;
    }
  }

}

module.exports = Carritos;