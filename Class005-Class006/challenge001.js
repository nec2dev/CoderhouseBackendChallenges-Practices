/*Crear un proyecto en node.js que genere 10000 números 
aleatorios en el rango  de 1 a 20.*/

/*Crear un objeto cuyas claves sean los números salidos 
y el valor asociado a cada clave será la cantidad de veces 
que salió dicho número. Representar por consola los 
resultados.*/

const numMin=1;
const numMax=20;
const output={};

for(let i=0; i<10000; i++){
    let num = Math.floor(Math.random()*(numMax-numMin)+numMin);
    if(output[num]){
        output[num]++;
    }else{
        output[num]=1;
    }
}
console.log(output);
