const fs = require("fs");

class Productos {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAllProducts() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      if (!contenido) {
        const productos = [];
        fs.writeFileSync(this.archivo, JSON.stringify(productos));
        return productos;
      }
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const array = await this.getAllProducts().then((res) => res).catch((err) => {
        throw err;
      });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async saveProduct(obj) {
    try {
      const array = await this.getAllProducts().then((res) => res).catch((error) => {
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

  async deleteAllProducts() {
    try {
      const array = await this.getAllProducts().then((res) => res).catch((error) => {
        throw error;
      });
      if (array.length >= 1) {
        fs.writeFileSync(this.archivo, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id) {
    try {
      let array = await this.getAllProducts().then((res) => res).catch((error) => {
        throw error;
      });
      if (array.length >= 1) {
        array = array.filter((obj) => {
          return obj.id !== id;
        });
        for (let i = 0; i < array.length; i++) {
          if (array[i].id > id) {
            array[i].id -= 1;
          }
        }
        fs.writeFileSync(this.archivo, JSON.stringify(array), "utf-8");
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, title, description, code, price, thumbnail, stock) {
    try {
      const productos = await this.getAllProducts().then((res) => res).catch((error) => {
        throw error;
      });
      productos.map((producto) => {
        if (producto.id === id) {
          producto.title = title ? title : producto.title;
          producto.description = description ? description : producto.description;
          producto.code = code ? code : producto.code;
          producto.price = price ? price : producto.price;
          producto.thumbnail = thumbnail ? thumbnail : producto.thumbnail;
          producto.stock = stock ? stock : producto.stock;
        }
      });
      await this.deleteAllProducts();
      fs.writeFileSync(this.archivo, JSON.stringify(productos), "utf-8");
      const productoActualizado = await this.getProductById(id).then((res) => res);
      return productoActualizado;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Productos;
