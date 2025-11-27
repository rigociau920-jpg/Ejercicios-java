/**
 * Generador de Colores Aleatorios
 * Funciones para generar colores hexadecimales, actualizar el DOM y copiar al portapapeles
 */

// ============================================
// Función: Generar color hexadecimal aleatorio
// ============================================
/**
 * Genera un color hexadecimal aleatorio en formato #RRGGBB
 * @returns {string} Código hexadecimal del color (ej: #A3F892)
 */
function generateRandomColor() {
  // Generar tres números aleatorios del 0-255 (rojo, verde, azul)
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convertir cada valor a hexadecimal (formato: 00-FF)
  // padStart asegura que siempre tenga 2 dígitos (ej: 05 en lugar de 5)
  const toHex = (val) => val.toString(16).padStart(2, '0').toUpperCase();

  // Retornar el código hexadecimal completo
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

// ============================================
// Función: Actualizar el color en la página
// ============================================
/**
 * Cambia el color de fondo del div y actualiza el texto con el código hex
 * @param {string} hexColor - Código hexadecimal del color (ej: #FF5733)
 */
function updateColorDisplay(hexColor) {
  // Obtener referencias a los elementos del DOM
  const colorBox = document.getElementById('colorBox');
  const colorCode = document.getElementById('colorCode');

  // Cambiar el color de fondo del div con transición suave
  colorBox.style.backgroundColor = hexColor;

  // Actualizar el texto que muestra el código hexadecimal
  colorCode.textContent = hexColor;

  // Guardar el color actual en localStorage para persistencia
  localStorage.setItem('lastColor', hexColor);
}

// ============================================
// Función: Copiar código al portapapeles
// ============================================
/**
 * Copia el código hexadecimal al portapapeles y muestra confirmación visual
 * @param {string} text - Texto a copiar (el código hex)
 */
function copyToClipboard(text) {
  // Usar API moderna de Clipboard (async)
  navigator.clipboard.writeText(text)
    .then(() => {
      // Éxito: mostrar mensaje de confirmación
      const feedbackEl = document.getElementById('feedback');
      feedbackEl.textContent = '✓ ¡Copiado al portapapeles!';
      feedbackEl.classList.add('show');

      // Eliminar el mensaje después de 2 segundos
      setTimeout(() => {
        feedbackEl.classList.remove('show');
      }, 2000);

      console.log('Código copiado:', text);
    })
    .catch((err) => {
      // Error: mostrar mensaje de error
      console.error('Error al copiar:', err);
      const feedbackEl = document.getElementById('feedback');
      feedbackEl.textContent = '✗ Error al copiar';
      feedbackEl.style.color = '#e74c3c';
      feedbackEl.classList.add('show');

      setTimeout(() => {
        feedbackEl.classList.remove('show');
        feedbackEl.style.color = '#27ae60'; // Resetear color para siguiente intento
      }, 2000);
    });
}

// ============================================
// Event Listeners: Conexión con el DOM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const btnGenerate = document.getElementById('btnGenerate');
  const btnCopy = document.getElementById('btnCopy');
  const colorCode = document.getElementById('colorCode');

  // Generar un color inicial al cargar la página
  const initialColor = generateRandomColor();
  updateColorDisplay(initialColor);

  // Listener: Botón "Generar Color"
  // Al hacer clic, generar un nuevo color y actualizar la pantalla
  btnGenerate.addEventListener('click', () => {
    const newColor = generateRandomColor();
    updateColorDisplay(newColor);
  });

  // Listener: Botón "Copiar Código"
  // Al hacer clic, copiar el código hexadecimal al portapapeles
  btnCopy.addEventListener('click', () => {
    const currentColor = colorCode.textContent;
    copyToClipboard(currentColor);
  });

  // Bonus: Permitir generar color con Enter desde cualquier lugar
  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const newColor = generateRandomColor();
      updateColorDisplay(newColor);
    }
  });

  console.log('✓ Generador de colores cargado correctamente');
});
