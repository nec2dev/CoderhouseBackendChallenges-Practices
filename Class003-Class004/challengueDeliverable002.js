/*>> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:*/
const fs = require('fs')
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.countID = 0
        this.contenido = []
    }
    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.contenido))
    }

    /*save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.*/
    save(objeto) {
        this.countID++ 
        objeto["id"] = this.countID 
        this.contenido.push(objeto) 
        this.write() 
        return `El id asignado del objeto añadido es ${this.countID}` 
    }

    /*getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.*/
    getById(id) {
        let resultado
        if (this.contenido.length > 0) {
            resultado = this.contenido.find(objeto => objeto.id === id)
            if (resultado === undefined) {
                resultado = null
            }
        return resultado
        }
    }

    /*getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.*/
    getAll() {
        return this.contenido;
    }

    /*deleteById(Number): void - Elimina del archivo el objeto con el id buscado.*/
    deleteById(id) {
        let resultado
        if (this.contenido.length > 0) {
            let nuevoContenido = this.contenido.filter(objeto => objeto.id !== id)
            this.contenido = nuevoContenido
            this.write()
            resultado = `El objeto con id ${id} ha sido eliminado`
        }
        return resultado
    }

    /*deleteAll(): void - Elimina todos los objetos presentes en el archivo.*/
    async deleteAll() {
        this.contenido = this.contenido.splice(0, this.contenido.length)
        this.write()
    }
}

module.exports = Contenedor