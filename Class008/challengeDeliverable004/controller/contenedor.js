const fs = require("fs").promises;

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

    async write() { //Método que escribe/sobreescribe: de este manera queda más limpio el código de los otros métodos
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ //Aumento la propiedad que va guardando el ID más alto
        object["id"] = this.countID //Agrego la propiedad id al objeto pasado como parámetro
        this.content.push(object) //Agrego el objeto al contenido(array)
        this.write() //Agrego el objeto al archivo
        return `El id del objeto añadido es ${this.countID}.` //Retorna el ID (lo solicita la consigna)
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

    /*deleteById(Number): void - Elimina del archivo el objeto con el id buscado.*/
    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() //SobreEscribo el archivo
            result = `El producto fue eliminado`
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    /*deleteAll(): void - Elimina todos los objetos presentes en el archivo.*/
    async deleteAll() { 
        this.content = await this.content.splice(0, this.content.length)
        this.write()
    }

    update(id, obj){
        const index = this.content.findIndex( objT => objT.id == id);
        obj.id = this[index].id
        this.content[index] = obj;
        return obj;
    }
}

module.exports = Contenedor