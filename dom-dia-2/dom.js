// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.


// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

// ---------------------------
// Ejemplos prácticos
// ---------------------------
// 1) Seleccionar elementos por ID
// Usamos `document.getElementById('idDelElemento')` para obtener una referencia.
const btnCambiarColor = document.getElementById('btnCambiarColor');
const miCaja = document.getElementById('miCaja');

// 2) Comprobar que existen antes de usarlos (evita errores si el HTML no los tiene)
if (btnCambiarColor && miCaja) {
	// 3) Escuchar clicks y modificar estilos
	btnCambiarColor.addEventListener('click', () => {
		// Cambia el color de fondo de la caja a rojo
		miCaja.style.backgroundColor = 'red';
	});
}

// Reto: si existe un botón para cambiar el texto, lo manejamos también
const btnCambiarTexto = document.getElementById('btnCambiarTexto');
if (btnCambiarTexto && miCaja) {
	btnCambiarTexto.addEventListener('click', () => {
		miCaja.textContent = '¡Hola DOM!';
	});
}