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
    getAll = async() => {
        try {
            const productos = await fs.promises.readFile(`${this.nombre}`, 'utf-8');
            return JSON.parse(productos);
        } catch (error) {
            console.log('El archivo est{a vacío');
            await fs.promises.readFile(this.nombre, 'utf-8');
            return productos
        }
    }

}

module.exports = Contenedor;