//Ejercicio Array y objetos
//1. array( listas)
//crea una lista de tus 3 comidas favoritas 
var comidasFavoritas = ["Pizza", "Sushi", "Tacos"]; 

//2. objeto ( key y value)
var persona = {
    nombre: "Juan",
    edad: 25,
    ciudad: "Madrid",
    habilidades: ["programación", "dibujo", "cocina"], 
    estructura: 1.75,
    programador:true 
};
// como accedo a la propiedad nombre de mi objeto o persona
console.log ("nombre:", persona.nombre);
//como accedo a la propiedad habilidades de mi objeto o persona
console.log ("habilidades:", persona.habilidades);
//como accedo a la habilidad dibujo de mi objeto o persona
console.log ("habilidad dibujo:", persona.habilidades[1]);

//1. array de objetos
//Crea una lista de 3 alumnos (objetos) con nombre y calificacion 
var alumnos = [
    { nombre: "Ana", calificacion: 90 },
    { nombre: "Luis", calificacion: 85 },
    { nombre: "Maria", calificacion: 92 },
    { nombre: "Carlos",}
];
// Escribe un bucle que recorra el array de alumnos e imprima solo los que tengan una calificacion mayor a 80 
for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log("Aliumno con calificacion mayor a 80:") ;
        console.log(alumnos[i].nombre);


    }
}