/**
 * Analizador de Texto
 * Aplicación para analizar texto en tiempo real
 * Incluye: conteo de caracteres, palabras, oraciones y tiempo de lectura estimado
 */

// ============================================
// Función: Contar caracteres (incluyendo espacios)
// ============================================
/**
 * Cuenta el número total de caracteres en el texto (incluye espacios)
 * @param {string} text - Texto a analizar
 * @returns {number} Número total de caracteres
 */
function countCharacters(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  return text.length;
}

// ============================================
// Función: Contar caracteres sin espacios
// ============================================
/**
 * Cuenta el número de caracteres excluyendo espacios en blanco
 * Utiliza regex para eliminar espacios, tabulaciones y saltos de línea
 * @param {string} text - Texto a analizar
 * @returns {number} Número de caracteres sin espacios
 */
function countCharactersNoSpaces(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  // Eliminar todos los espacios en blanco: espacios, tabulaciones, saltos de línea
  const textWithoutSpaces = text.replace(/\s/g, '');
  return textWithoutSpaces.length;
}

// ============================================
// Función: Contar palabras
// ============================================
/**
 * Cuenta el número de palabras en el texto
 * Considera múltiples espacios consecutivos como separadores de una sola palabra
 * @param {string} text - Texto a analizar
 * @returns {number} Número de palabras
 */
function countWords(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  // Trim para eliminar espacios al inicio y final
  // split(/\s+/) divide por uno o más espacios en blanco
  // filter(word => word) elimina strings vacíos de la matriz
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);

  return words.length;
}

// ============================================
// Función: Contar oraciones
// ============================================
/**
 * Cuenta el número de oraciones en el texto
 * Las oraciones terminan en: punto (.), signo de interrogación (?), signo de exclamación (!)
 * @param {string} text - Texto a analizar
 * @returns {number} Número de oraciones
 */
function countSentences(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  // Buscar terminadores de oración: . ? !
  // El + significa uno o más terminadores consecutivos se cuentan como una oración
  const sentences = text.match(/[.!?]+/g);

  // Si no hay terminadores, retornar 0; si los hay, retornar cantidad
  return sentences ? sentences.length : 0;
}

// ============================================
// Función: Calcular tiempo de lectura estimado
// ============================================
/**
 * Calcula el tiempo estimado de lectura basado en 200 palabras por minuto
 * Es una estimación estándar en web
 * @param {string} text - Texto a analizar
 * @returns {object} Objeto con propiedades: minutes (número) y display (string)
 */
function calculateReadingTime(text) {
  const WORDS_PER_MINUTE = 200; // Velocidad de lectura estándar

  // Obtener número de palabras
  const words = countWords(text);

  // Calcular minutos: palabras / 200
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);

  // Retornar objeto con tiempo en minutos y texto formateado para mostrar
  return {
    minutes: minutes,
    display: minutes <= 1 ? '< 1 min' : `${minutes} min`
  };
}

// ============================================
// Función: Actualizar estadísticas en el DOM
// ============================================
/**
 * Actualiza todos los elementos visuales con las estadísticas
 * Esta función se llama cada vez que el usuario modifica el texto
 * @param {string} text - Texto actual del textarea
 */
function updateStats(text) {
  try {
    // Obtener referencias a los elementos del DOM
    const charCountEl = document.getElementById('charCount');
    const charNoSpaceCountEl = document.getElementById('charNoSpaceCount');
    const wordCountEl = document.getElementById('wordCount');
    const sentenceCountEl = document.getElementById('sentenceCount');
    const readingTimeEl = document.getElementById('readingTime');

    // Validar que los elementos existan
    if (!charCountEl || !charNoSpaceCountEl || !wordCountEl || !sentenceCountEl || !readingTimeEl) {
      console.error('Algunos elementos del DOM no fueron encontrados');
      return;
    }

    // Calcular todas las estadísticas
    const charCount = countCharacters(text);
    const charNoSpaceCount = countCharactersNoSpaces(text);
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    const readingTime = calculateReadingTime(text);

    // Actualizar los elementos con los nuevos valores
    // Usar textContent para evitar inyección de código (XSS)
    charCountEl.textContent = charCount;
    charNoSpaceCountEl.textContent = charNoSpaceCount;
    wordCountEl.textContent = wordCount;
    sentenceCountEl.textContent = sentenceCount;
    readingTimeEl.textContent = readingTime.display;

    console.log('✓ Estadísticas actualizadas:', {
      caracteres: charCount,
      caracteressinEspacios: charNoSpaceCount,
      palabras: wordCount,
      oraciones: sentenceCount,
      tiempoLectura: readingTime.display
    });

  } catch (error) {
    console.error('Error al actualizar estadísticas:', error);
    showFeedback('Error al actualizar estadísticas', 'error');
  }
}

// ============================================
// Función: Generar texto de estadísticas para copiar
// ============================================
/**
 * Genera un string formateado con todas las estadísticas
 * Este texto es lo que se copia al portapapeles
 * @param {string} text - Texto analizado
 * @returns {string} String formateado con estadísticas
 */
function generateStatsText(text) {
  try {
    const charCount = countCharacters(text);
    const charNoSpaceCount = countCharactersNoSpaces(text);
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    const readingTime = calculateReadingTime(text);

    // Generar reporte en formato legible
    const report = `📊 ESTADÍSTICAS DEL TEXTO
━━━━━━━━━━━━━━━━━━━━━━━━
📄 Caracteres (con espacios): ${charCount}
🔤 Caracteres (sin espacios): ${charNoSpaceCount}
📝 Palabras: ${wordCount}
⭕ Oraciones: ${sentenceCount}
⏱️ Tiempo de lectura: ${readingTime.display}
━━━━━━━━━━━━━━━━━━━━━━━━
Generado: ${new Date().toLocaleString('es-ES')}`;

    return report;
  } catch (error) {
    console.error('Error al generar texto de estadísticas:', error);
    throw error;
  }
}

// ============================================
// Función: Copiar estadísticas al portapapeles
// ============================================
/**
 * Copia el reporte de estadísticas al portapapeles
 * Muestra un mensaje de confirmación visual
 * @param {string} text - Texto analizado
 */
function copyStatsToClipboard(text) {
  try {
    // Validar que hay texto para analizar
    if (!text || text.trim().length === 0) {
      showFeedback('⚠️ Escribe algo primero', 'error');
      return;
    }

    // Generar el reporte
    const statsText = generateStatsText(text);

    // Usar API moderna Clipboard para copiar
    navigator.clipboard.writeText(statsText)
      .then(() => {
        showFeedback('✓ Estadísticas copiadas al portapapeles', 'success');
        console.log('Estadísticas copiadas:', statsText);
      })
      .catch(err => {
        console.error('Error al copiar:', err);
        // Fallback si Clipboard API falla
        fallbackCopyToClipboard(statsText);
      });

  } catch (error) {
    console.error('Error en copyStatsToClipboard:', error);
    showFeedback('❌ Error al copiar estadísticas', 'error');
  }
}

// ============================================
// Función: Fallback para copiar (navegadores antiguos)
// ============================================
/**
 * Método alternativo para copiar al portapapeles si la API Clipboard no funciona
 * Crea un textarea temporal, lo selecciona y ejecuta copy
 * @param {string} text - Texto a copiar
 */
function fallbackCopyToClipboard(text) {
  try {
    // Crear un textarea temporal
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    // Añadir al DOM
    document.body.appendChild(textarea);

    // Seleccionar y copiar
    textarea.select();
    document.execCommand('copy');

    // Eliminar el textarea
    document.body.removeChild(textarea);

    showFeedback('✓ Estadísticas copiadas (método alternativo)', 'success');
  } catch (error) {
    console.error('Fallback copy error:', error);
    showFeedback('❌ No se pudo copiar al portapapeles', 'error');
  }
}

// ============================================
// Función: Limpiar textarea y resetear estadísticas
// ============================================
/**
 * Limpia el textarea y resetea todas las estadísticas a 0
 */
function clearText() {
  try {
    const textInput = document.getElementById('textInput');

    // Validar que el elemento existe
    if (!textInput) {
      console.error('Elemento textarea no encontrado');
      return;
    }

    // Limpiar el contenido
    textInput.value = '';

    // Actualizar estadísticas (pasando string vacío)
    updateStats('');

    // Mostrar feedback
    showFeedback('🗑️ Texto limpiado', 'success');

    // Enfocar el textarea para mejor UX
    textInput.focus();

    console.log('✓ Texto limpiado');
  } catch (error) {
    console.error('Error al limpiar:', error);
    showFeedback('❌ Error al limpiar', 'error');
  }
}

// ============================================
// Función: Mostrar mensaje de retroalimentación
// ============================================
/**
 * Muestra un mensaje temporal en la esquina inferior derecha
 * Desaparece automáticamente después de 3 segundos
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success' o 'error'
 */
function showFeedback(message, type = 'success') {
  try {
    const feedbackEl = document.getElementById('feedback');

    if (!feedbackEl) {
      console.warn('Elemento feedback no encontrado');
      return;
    }

    // Configurar el mensaje y tipo
    feedbackEl.textContent = message;
    feedbackEl.classList.remove('error', 'show');

    // Añadir clase según tipo
    if (type === 'error') {
      feedbackEl.classList.add('error');
    }

    // Mostrar con animación
    feedbackEl.classList.add('show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
      feedbackEl.classList.remove('show');
    }, 3000);

  } catch (error) {
    console.error('Error en showFeedback:', error);
  }
}

// ============================================
// Event Listeners: Conexión con el DOM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Obtener referencias a elementos
    const textInput = document.getElementById('textInput');
    const btnClear = document.getElementById('btnClear');
    const btnCopyStats = document.getElementById('btnCopyStats');

    // Validar que existen todos los elementos
    if (!textInput || !btnClear || !btnCopyStats) {
      console.error('No se encontraron todos los elementos necesarios del DOM');
      return;
    }

    // Listener: Actualizar estadísticas en tiempo real mientras se escribe
    textInput.addEventListener('input', (e) => {
      updateStats(e.target.value);
    });

    // Listener: Botón Limpiar
    btnClear.addEventListener('click', () => {
      clearText();
    });

    // Listener: Botón Copiar Estadísticas
    btnCopyStats.addEventListener('click', () => {
      copyStatsToClipboard(textInput.value);
    });

    // Listener: Permitir Ctrl+A para seleccionar todo el texto
    textInput.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        textInput.select();
      }
    });

    // Inicializar estadísticas (mostrar 0 valores)
    updateStats('');

    console.log('✓ Analizador de texto cargado correctamente');
  } catch (error) {
    console.error('Error durante la inicialización:', error);
  }
});
