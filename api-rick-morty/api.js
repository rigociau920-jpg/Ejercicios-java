/**
 * api.js
 * Cliente para Rick and Morty API
 * Busca personajes por nombre y los muestra en tarjetas
 */

const API_BASE = 'https://rickandmortyapi.com/api/character';

// Referencias al DOM
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const container = document.getElementById('container');

// ============================================
// Función: Obtener personajes de la API
// ============================================
/**
 * Obtiene personajes de la Rick and Morty API
 * Puede buscar por nombre o obtener todos/pagina específica
 * @param {string} name - Nombre del personaje a buscar (opcional)
 * @returns {Promise<Array>} Array de personajes
 */
async function obtenerPersonajes(name = '') {
  try {
    // Construir URL: si hay nombre, buscar por nombre; si no, obtener primeros
    let url = API_BASE;
    if (name && name.trim() !== '') {
      url += `?name=${encodeURIComponent(name.trim())}`;
    }

    // Realizar petición
    const respuesta = await fetch(url);

    // Manejar errores HTTP
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        return []; // Sin resultados
      }
      throw new Error(`Error: ${respuesta.status}`);
    }

    // Parsear JSON
    const datos = await respuesta.json();

    // La API devuelve {results: [...], info: {...}}
    // Si es un personaje único (búsqueda exacta), devuelve el objeto directamente
    // Si es un array, retornar results o el array
    if (Array.isArray(datos)) {
      return datos;
    }

    return datos.results || [];
  } catch (error) {
    console.error('Error en obtenerPersonajes:', error.message);
    mostrarError(`Error al obtener personajes: ${error.message}`);
    return [];
  }
}

// ============================================
// Función: Mostrar tarjetas de personajes
// ============================================
/**
 * Renderiza un array de personajes como tarjetas en el DOM
 * @param {Array} personajes - Array de objetos personaje
 */
function mostrarPersonajes(personajes) {
  // Limpiar contenedor
  container.innerHTML = '';

  // Validar que hay personajes
  if (!personajes || personajes.length === 0) {
    container.innerHTML = '<div class="empty">No se encontraron personajes. Intenta con otro nombre.</div>';
    return;
  }

  // Crear una tarjeta por cada personaje
  personajes.forEach(personaje => {
    const card = document.createElement('div');
    card.className = 'card';

    // Determinar clase de estado
    const statusClass = personaje.status.toLowerCase();

    // Construir HTML de la tarjeta
    card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}" />
      <div class="card-content">
        <h3 class="card-name">${personaje.name}</h3>
        <div class="card-info">
          <div class="info-row">
            <span class="label">Estado:</span>
            <span class="status ${statusClass}">${personaje.status}</span>
          </div>
          <div class="info-row">
            <span class="label">Especie:</span>
            <span>${personaje.species}</span>
          </div>
          <div class="info-row">
            <span class="label">Ubicación:</span>
            <span class="location">${personaje.location.name}</span>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================
// Función: Mostrar estado de carga
// ============================================
/**
 * Muestra un indicador de carga en el contenedor
 */
function mostrarCarga() {
  container.innerHTML = '<div class="loading">Cargando personajes...</div>';
}

// ============================================
// Función: Mostrar error
// ============================================
/**
 * Muestra un mensaje de error
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarError(mensaje) {
  container.innerHTML = `<div class="error">${mensaje}</div>`;
}

// ============================================
// Función: Ejecutar búsqueda
// ============================================
/**
 * Lee el input de búsqueda, obtiene personajes y los muestra
 */
async function buscar() {
  const nombreBusqueda = searchInput.value.trim();

  // Mostrar carga
  mostrarCarga();

  // Obtener personajes
  const personajes = await obtenerPersonajes(nombreBusqueda);

  // Mostrar resultados
  mostrarPersonajes(personajes);
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Evento: Botón buscar
  searchBtn.addEventListener('click', buscar);

  // Evento: Enter en el input
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      buscar();
    }
  });

  // Cargar personajes iniciales (por ejemplo, page 1 o los primeros)
  // Para que la página no esté vacía al inicio
  mostrarCarga();
  obtenerPersonajes().then(personajes => {
    mostrarPersonajes(personajes.slice(0, 12)); // Mostrar solo los primeros 12
  });

  console.log('✓ Rick and Morty API cargado correctamente');
});
