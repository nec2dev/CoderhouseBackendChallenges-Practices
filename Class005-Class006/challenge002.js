/*Desarrollar un proyecto en node.js que declare un array de objetos de este tipo:*/
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
];
/*y obtenga la siguiente información de dicho array
a) Los nombres de los productos en un string separados por comas.
b) El precio total
c) El precio promedio
d) El producto con menor precio
e) El producto con mayor precio
f) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola
Aclaración: todos los valores monetarios serán expresados con 2 decimales*/

const nombresProductos = productos.map(p=>p.nombre).join(', ');
const precioTotal = productos.map(p=>p.precio).reduce((a, b)=>a+b, 0).toFixed(2);
const precioPromedio = (precioTotal/productos.length).toFixed(2);
const productosOrdenadosPorprecio = productos.sort((a, b)=>a.precio-b.precio);
const productoMenorPrecio = productosOrdenadosPorprecio[0];
const productoMayorPrecio = productosOrdenadosPorprecio[productosOrdenadosPorprecio.length-1];

const resultado = {
    nombresProductos,
    precioTotal,
    precioPromedio,
    productoMenorPrecio,
    productoMayorPrecio
}

console.log({ resultado });

