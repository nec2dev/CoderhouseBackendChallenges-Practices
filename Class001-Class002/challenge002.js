/*En este ejercicio construiremos una herramienta que permita que diferentes personas puedan llevar cuentas individuales sobre algo que deseen contabilizar, al mismo tiempo que nos brinde una contabilidad general del total contado. Para ello:
Definir la clase Contador.*/
class Contador {

    // 1) Cada instancia de contador debe ser identificada con el nombre de la persona responsable de ese conteo.
    constructor(nombre) {
        this.nombre = nombre
        // 2) Cada instancia inicia su cuenta individual en cero.
        this.contador = 0
    }
    
    // 3) La clase en sí misma posee un valor estático con el que lleva la cuenta de todo lo contado por sus instancias, el cual también inicia en cero.
    static contadorGlobal = 0

    // 4) Definir un método obtenerResponsable que devuelva el nombre del responsable de la instancia.
    obtenerResponsable() {
        return console.log("El responsable es: " + this.nombre)
    }

    // 5) Definir un método obtenerCuentaIndividual que devuelva la cantidad contada por la instancia.
    obtenerCuentaIndividual() {
        return this.contador
    }
    // 6) Definir un método obtenerCuentaGlobal que devuelva la cantidad contada por todos los contadores creados hasta el momento.
    obtenerCuentaGlobal() {
        return Contador.contadorGlobal
    }
    // 7) Definir el método contar que incremente en uno tanto la cuenta individual como la cuenta general
    contar(number) {
        this.contador += number
        Contador.contadorGlobal += number
    }
}







