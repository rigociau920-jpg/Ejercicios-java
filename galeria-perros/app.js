/**
 * app.js
 * Galería de perros aleatorios usando Dog API
 * API: https://dog.ceo/dog-api/
 * 
 * Endpoints principales:
 *  - /breeds/list/all - Lista todas las razas
 *  - /breed/{breed}/images/random/{count} - Imágenes aleatorias de una raza
 *  - /breeds/image/random/{count} - Imagen aleatoria de cualquier raza
 */

// ============================================
// Variables de estado
// ============================================
const DOG_API_BASE = 'https://dog.ceo/api';
let imageCount = 0;
let allBreeds = [];
let currentBreed = 'random';

// ============================================
// Elementos del DOM
// ============================================
const breedSelect = document.getElementById('breedSelect');
const getDogsBtn = document.getElementById('getDogsBtn');
const randomBtn = document.getElementById('randomBtn');
const gallery = document.getElementById('gallery');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const imageCountEl = document.getElementById('imageCount');
const currentBreedEl = document.getElementById('currentBreed');

// ============================================
// Función: Obtener lista de razas
// ============================================
/**
 * Obtiene la lista completa de razas disponibles de la API
 * @returns {Promise<Array>} Array de nombres de razas
 */
async function obtenerRazas() {
  try {
    const respuesta = await fetch(`${DOG_API_BASE}/breeds/list/all`);
    
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    
    const datos = await respuesta.json();
    
    if (datos.status === 'success') {
      // Convertir objeto de razas a array de strings
      // El objeto tiene razas principales con sub-razas como arrays
      const razas = Object.keys(datos.message).sort();
      return razas;
    }
    
    throw new Error('Respuesta inesperada de la API');
  } catch (error) {
    console.error('Error al obtener razas:', error.message);
    mostrarError('No se pudieron cargar las razas');
    return [];
  }
}

// ============================================
// Función: Cargar opciones de razas
// ============================================
/**
 * Carga las razas en el select del DOM
 */
async function cargarOpcionesRazas() {
  allBreeds = await obtenerRazas();
  
  if (allBreeds.length === 0) return;
  
  // Limpiar opciones previas
  breedSelect.innerHTML = '<option value="">-- Selecciona una raza --</option>';
  
  // Agregar cada raza como opción
  allBreeds.forEach(raza => {
    const option = document.createElement('option');
    option.value = raza;
    option.textContent = raza.charAt(0).toUpperCase() + raza.slice(1);
    breedSelect.appendChild(option);
  });
}

// ============================================
// Función: Obtener imágenes de perros
// ============================================
/**
 * Obtiene imágenes de una raza específica o aleatorias
 * @param {string} breed - Nombre de la raza (o 'random')
 * @param {number} count - Cantidad de imágenes a obtener (1-50)
 * @returns {Promise<Array>} Array de URLs de imágenes
 */
async function obtenerImagenesPerros(breed = 'random', count = 12) {
  try {
    mostrarCarga();
    
    let url;
    if (breed === '' || breed === 'random') {
      // Imágenes aleatorias de cualquier raza
      url = `${DOG_API_BASE}/breeds/image/random/${count}`;
      currentBreed = 'Aleatorio';
    } else {
      // Imágenes de una raza específica
      url = `${DOG_API_BASE}/breed/${breed}/images/random/${count}`;
      currentBreed = breed.charAt(0).toUpperCase() + breed.slice(1);
    }
    
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
    
    const datos = await respuesta.json();
    
    if (datos.status === 'success') {
      ocultarError();
      return datos.message;
    }
    
    throw new Error('No se pudieron obtener imágenes');
  } catch (error) {
    console.error('Error al obtener imágenes:', error.message);
    mostrarError(`❌ ${error.message}`);
    return [];
  }
}

// ============================================
// Función: Mostrar imágenes en galería
// ============================================
/**
 * Renderiza las imágenes en la galería
 * @param {Array} imagenes - Array de URLs de imágenes
 */
function mostrarGaleria(imagenes) {
  ocultarCarga();
  
  if (imagenes.length === 0) return;
  
  gallery.innerHTML = '';
  
  imagenes.forEach((imagenUrl, index) => {
    const card = document.createElement('div');
    card.className = 'dog-card';
    card.innerHTML = `
      <img src="${imagenUrl}" alt="Perro ${index + 1}" loading="lazy">
      <div class="dog-info">
        <h3>${currentBreed}</h3>
      </div>
    `;
    
    // Agregar evento de click para expandir imagen
    card.addEventListener('click', () => {
      mostrarImagenExpandida(imagenUrl, currentBreed);
    });
    
    gallery.appendChild(card);
  });
  
  // Actualizar estadísticas
  imageCount += imagenes.length;
  imageCountEl.textContent = imageCount;
  currentBreedEl.textContent = currentBreed;
}

// ============================================
// Función: Mostrar imagen expandida
// ============================================
/**
 * Muestra una imagen en tamaño completo en un modal
 * @param {string} imagenUrl - URL de la imagen
 * @param {string} breed - Nombre de la raza
 */
function mostrarImagenExpandida(imagenUrl, breed) {
  // Crear modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  `;
  
  const img = document.createElement('img');
  img.src = imagenUrl;
  img.style.cssText = `
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 1.5rem;
    background: #ffd700;
    border-radius: 50%;
    cursor: pointer;
  `;
  
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  modal.appendChild(img);
  modal.appendChild(closeBtn);
  document.body.appendChild(modal);
}

// ============================================
// Función: Mostrar estado de carga
// ============================================
/**
 * Muestra el indicador de carga
 */
function mostrarCarga() {
  loadingEl.classList.add('show');
  gallery.innerHTML = '';
  ocultarError();
}

// ============================================
// Función: Ocultar estado de carga
// ============================================
/**
 * Oculta el indicador de carga
 */
function ocultarCarga() {
  loadingEl.classList.remove('show');
}

// ============================================
// Función: Mostrar error
// ============================================
/**
 * Muestra un mensaje de error
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(mensaje) {
  errorEl.textContent = mensaje;
  errorEl.classList.add('show');
}

// ============================================
// Función: Ocultar error
// ============================================
/**
 * Oculta el mensaje de error
 */
function ocultarError() {
  errorEl.classList.remove('show');
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✓ Aplicación de galería de perros cargada');
  
  // Cargar razas al iniciar
  cargarOpcionesRazas();
  
  // Botón: Obtener perros de raza seleccionada
  getDogsBtn.addEventListener('click', async () => {
    const razaSeleccionada = breedSelect.value;
    const imagenes = await obtenerImagenesPerros(razaSeleccionada, 12);
    mostrarGaleria(imagenes);
  });
  
  // Botón: Obtener perros aleatorios
  randomBtn.addEventListener('click', async () => {
    const imagenes = await obtenerImagenesPerros('random', 12);
    mostrarGaleria(imagenes);
  });
  
  // Permitir Enter en el select
  breedSelect.addEventListener('change', async () => {
    const razaSeleccionada = breedSelect.value;
    if (razaSeleccionada) {
      const imagenes = await obtenerImagenesPerros(razaSeleccionada, 12);
      mostrarGaleria(imagenes);
    }
  });
  
  // Cargar perros aleatorios automáticamente al iniciar
  obtenerImagenesPerros('random', 12).then(imagenes => {
    mostrarGaleria(imagenes);
  });
});
