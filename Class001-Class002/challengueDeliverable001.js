/*>> Consigna: */
/*1) Declarar una clase Usuario*/
class Ususario {

    /*2) Hacer que Usuario cuente con los siguientes atributos:
    nombre: String
    apellido: String
    libros: Object[]
    mascotas: String[]
    Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.*/
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    /*3) Hacer que Usuario cuente con los siguientes métodos:
    getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
    addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
    countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
    addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.*/
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }   
    addMascota(mascota) {   
        this.mascotas.push(mascota);    
    }
    countMascotas() {
        return this.mascotas.length;
    }
    addBook(nombre, autor) {
        this.libros.push({
            nombre,
            autor
        });
    }
    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    }

}

/*4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.*/
usuario = new Ususario('Juana', 'Cadiz', [], []);
console.log(usuario.getFullName());
usuario.addMascota('Greta', 'Brisa', 'Pepa');
console.log(usuario.countMascotas());
usuario.addBook('El señor de los anillos', 'J.R.R. Tolkien');
console.log(usuario.getBookNames());