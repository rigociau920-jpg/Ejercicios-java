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

// -------------------------
// Calculadora básica (funciones existentes)
// -------------------------
function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        console.warn('División por cero: devuelve NaN');
        return NaN;
    }
    return a / b;
}

// Conversor de Unidades
function celsiusAFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// -------------------------
// Interacciones con `prompt()` (navegador)
// -------------------------
// Nota: `prompt()` no existe en Node. Estas funciones detectan el entorno
// y muestran instrucciones por consola si no están en un navegador.

function promptCalculadora() {
    if (typeof window === 'undefined' || typeof prompt !== 'function') {
        console.log('promptCalculadora: Ejecuta este script en un navegador para usar prompts.');
        console.log('Ejemplo en consola: console.log(sumar(2,3))');
        return;
    }

    const operacion = prompt('Operación (+, -, *, /):');
    if (!operacion) return;

    const aStr = prompt('Primer número:');
    const bStr = prompt('Segundo número:');
    const a = parseFloat(aStr);
    const b = parseFloat(bStr);

    if (Number.isNaN(a) || Number.isNaN(b)) {
        alert('Debes introducir números válidos.');
        return;
    }

    let resultado;
    switch (operacion.trim()) {
        case '+':
            resultado = sumar(a, b);
            break;
        case '-':
            resultado = restar(a, b);
            break;
        case '*':
        case 'x':
        case 'X':
            resultado = multiplicar(a, b);
            break;
        case '/':
            resultado = dividir(a, b);
            break;
        default:
            alert('Operación no válida. Usa +, -, * o /.');
            return;
    }

    const mensaje = `Resultado: ${resultado}`;
    alert(mensaje);
    console.log('promptCalculadora ->', a, operacion, b, '=', resultado);
}

function promptCelsiusAFahrenheit() {
    if (typeof window === 'undefined' || typeof prompt !== 'function') {
        console.log('promptCelsiusAFahrenheit: Ejecuta este script en un navegador para usar prompts.');
        console.log('Ejemplo en consola: console.log(celsiusAFahrenheit(0))');
        return;
    }

    const cStr = prompt('Introduce grados Celsius:');
    if (cStr === null) return; // cancel
    const c = parseFloat(cStr);
    if (Number.isNaN(c)) {
        alert('Introduce un número válido.');
        return;
    }

    const f = celsiusAFahrenheit(c);
    const mensaje = `${c}°C = ${f}°F`;
    alert(mensaje);
    console.log('promptCelsiusAFahrenheit ->', mensaje);
}

// Instrucciones rápidas (si se abre el archivo en consola/Node)
console.log('Funciones disponibles: sumar, restar, multiplicar, dividir, celsiusAFahrenheit');
console.log('Si abres este archivo en el navegador, llama a promptCalculadora() o promptCelsiusAFahrenheit() para usar la interfaz de prompts.');

// -------------------------
// UI: Conexión con el DOM (calculadora visual)
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    const numA = document.getElementById('numA');
    const numB = document.getElementById('numB');
    const btnSum = document.getElementById('btnSum');
    const btnSub = document.getElementById('btnSub');
    const btnMul = document.getElementById('btnMul');
    const btnDiv = document.getElementById('btnDiv');
    const btnClear = document.getElementById('btnClear');
    const resultDisplay = document.getElementById('resultDisplay');

    const celsiusInput = document.getElementById('celsiusInput');
    const btnConvertC = document.getElementById('btnConvertC');
    const convResult = document.getElementById('convResult');

    function getNumbers() {
        const a = parseFloat(numA.value);
        const b = parseFloat(numB.value);
        return { a, b };
    }

    function showResult(value) {
        resultDisplay.textContent = (Number.isNaN(value) ? 'Error' : value);
    }

    if (btnSum) btnSum.addEventListener('click', () => {
        const { a, b } = getNumbers();
        if (Number.isNaN(a) || Number.isNaN(b)) { showResult('Introduce números'); return; }
        showResult(sumar(a, b));
    });

    if (btnSub) btnSub.addEventListener('click', () => {
        const { a, b } = getNumbers();
        if (Number.isNaN(a) || Number.isNaN(b)) { showResult('Introduce números'); return; }
        showResult(restar(a, b));
    });

    if (btnMul) btnMul.addEventListener('click', () => {
        const { a, b } = getNumbers();
        if (Number.isNaN(a) || Number.isNaN(b)) { showResult('Introduce números'); return; }
        showResult(multiplicar(a, b));
    });

    if (btnDiv) btnDiv.addEventListener('click', () => {
        const { a, b } = getNumbers();
        if (Number.isNaN(a) || Number.isNaN(b)) { showResult('Introduce números'); return; }
        showResult(dividir(a, b));
    });

    if (btnClear) btnClear.addEventListener('click', () => {
        if (numA) numA.value = '';
        if (numB) numB.value = '';
        showResult('—');
    });

    if (btnConvertC) btnConvertC.addEventListener('click', () => {
        const c = parseFloat(celsiusInput.value);
        if (Number.isNaN(c)) {
            convResult.textContent = 'Introduce número válido';
            return;
        }
        convResult.textContent = `${c}°C = ${celsiusAFahrenheit(c)}°F`;
    });
});