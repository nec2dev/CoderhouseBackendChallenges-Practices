const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
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

  async getById(id) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((err) => {
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

  async save(obj) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
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

  async deleteAll() {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        fs.writeFileSync(this.archivo, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      let array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
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

  async update(id, title, price, thumbnail) {
    try {
      const productos = await this.getAll().then((res) => res);
      productos.map((producto) => {
        if (producto.id === id) {
          producto.title = title ? title : producto.title;
          producto.price = price ? price : producto.price;
          producto.thumbnail = thumbnail ? thumbnail : producto.thumbnail;
        }
      });
      await this.deleteAll();
      fs.writeFileSync(this.archivo, JSON.stringify(productos), "utf-8");
      const productoActualizado = await this.getById(id).then((res) => res);
      return productoActualizado;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contenedor;
