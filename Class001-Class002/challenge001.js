/*Definir variables variables que almacenen los siguiente datos:
Un nombre: “pepe”
Una edad: 25
Un precio: $99.90
Los nombres de mis series favoritas: “Dark”, “Mr Robot”, “Castlevania”
Mis películas favoritas, en donde cada película detalla su nombre, el año de estreno, y una lista con los nombres de sus protagonistas.
Mostrar todos esos valores por consola
Incrementar la edad en 1 y volver a mostrarla
Agregar una serie a la lista y volver a mostrarla*/

const nombre = "Pepe";
const edad = 25;
const precio = 99.90;
const seriesFavoritas = ['Game of Thrones', 'Breaking Bad', 'The Big Bang Theory'];
const peliculasFavoritas = [
    {
        nombre: 'The Avengers',
        estreno: 2012,
        protagonistas: ['Iron man', 'Hulk', 'Captain America', 'Thor', 'Black Widow', 'Hawkeye']
    },
    {
        nombre: 'The Avengers',
        estreno: 2012,
        protagonistas: ['Iron man', 'Hulk', 'Captain America', 'Thor', 'Black Widow', 'Hawkeye']
    },
    {
        nombre: 'The Avengers',
        estreno: 2012,
        protagonistas: ['Iron man', 'Hulk', 'Captain America', 'Thor', 'Black Widow', 'Hawkeye']
    },
    {
        nombre: 'The Avengers',
        estreno: 2012,
        protagonistas: ['Iron man', 'Hulk', 'Captain America', 'Thor', 'Black Widow', 'Hawkeye']
    }
]
console.log({nombre});
console.log({edad});
console.log({precio});
console.log({seriesFavoritas});
console.log(peliculasFavoritas);
edad+=1;
console.log({edad});
seriesFavoritas.push('The Walking Dead');
console.log({seriesFavoritas});