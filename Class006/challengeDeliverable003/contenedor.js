const fs = require("fs");
class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
    this.countID = 0;
    this.contenido = [];
  }

  async init() {
    try {
      let data = await fs.promises.readFile(this.nombre);
      this.contenido = JSON.parse(data);
      for (const elemento of this.contenido) {
        if (elemento.id > this.countID) this.countID = elemento.id;
      }
    } catch (error) {
      console.log("No existe ningún archivo");
    }
  }

  async write() {
    await fs.promises.writeFile(this.nombre, JSON.stringify(this.contenido));
  }

  /*save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.*/
  save(objeto) {
    this.countID++;
    objeto["id"] = this.countID;
    this.contenido.push(objeto);
    this.write();
    return `El id asignado del objeto añadido es ${this.countID}`;
  }

  /*getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.*/
  getById(id) {
    let resultado;
    if (this.contenido.length > 0) {
      resultado = this.contenido.find((objeto) => objeto.id === id);
      if (resultado === undefined) {
        resultado = null;
      }
    } else {
      result = "El archivo está vacío";
    }
    return resultado;
  }

  /*getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.*/
  async getAll() {
    return this.contenido;
  }

  /*deleteById(Number): void - Elimina del archivo el objeto con el id buscado.*/
  deleteById(id) {
    let resultado;
    if (this.contenido.length > 0) {
      let nuevoContenido = this.contenido.filter((objeto) => objeto.id !== id);
      this.contenido = nuevoContenido;
      this.write();
      resultado = `El objeto con id ${id} ha sido eliminado`;
    }
    return resultado;
  }

  /*deleteAll(): void - Elimina todos los objetos presentes en el archivo.*/
  async deleteAll() {
     this.contenido = this.contenido.splice(0, this.contenido.length);
     this.write();
   }
}

module.exports = Contenedor;
