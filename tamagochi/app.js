/**
 * app.js
 * Tamagochi - Mascota Virtual
 * 
 * Estados:
 *  - Hambre (0-100): Aumenta con el tiempo, se reduce al comer
 *  - Energía (0-100): Disminuye al jugar, se recupera al dormir
 *  - Felicidad (0-100): Aumenta al jugar, se reduce con hambre/cansancio
 */

// ============================================
// Clase: Tamagochi
// ============================================
class Tamagochi {
  constructor(nombre = 'Michi') {
    this.nombre = nombre;
    this.hambre = 50;      // 0-100 (0 = no hambre, 100 = mucho hambre)
    this.energia = 100;    // 0-100 (0 = cansado, 100 = lleno de energía)
    this.felicidad = 75;   // 0-100 (0 = triste, 100 = felicísimo)
    this.ultimo_pensamiento = '¡Hola! 👋';
    this.accion_en_curso = false;
  }

  // ============================================
  // Métodos de acciones
  // ============================================

  /**
   * El gato come
   */
  comer() {
    if (this.accion_en_curso) return false;
    
    this.accion_en_curso = true;
    this.hambre = Math.max(0, this.hambre - 40);
    this.felicidad = Math.min(100, this.felicidad + 10);
    
    // El gato come más si tiene mucha hambre
    if (this.hambre < 20) {
      this.ultimo_pensamiento = '¡Ñam ñam! Delicioso 😋';
    } else {
      this.ultimo_pensamiento = 'Mmm... gracias 😊';
    }

    setTimeout(() => {
      this.accion_en_curso = false;
    }, 500);

    return true;
  }

  /**
   * El gato duerme
   */
  dormir() {
    if (this.accion_en_curso) return false;
    if (this.energia > 90) {
      this.ultimo_pensamiento = 'No tengo sueño 😴';
      return false;
    }

    this.accion_en_curso = true;
    this.energia = Math.min(100, this.energia + 60);
    this.felicidad = Math.min(100, this.felicidad + 15);
    this.hambre = Math.min(100, this.hambre + 10);

    this.ultimo_pensamiento = 'Zzzzzzz... 💤';

    setTimeout(() => {
      this.accion_en_curso = false;
    }, 500);

    return true;
  }

  /**
   * El gato juega
   */
  jugar() {
    if (this.accion_en_curso) return false;

    // El gato no puede jugar si tiene mucha hambre
    if (this.hambre > 80) {
      this.ultimo_pensamiento = 'Tengo hambre, no puedo jugar 😞';
      return false;
    }

    // El gato no puede jugar si está muy cansado
    if (this.energia < 20) {
      this.ultimo_pensamiento = 'Estoy muy cansado 😫';
      return false;
    }

    this.accion_en_curso = true;
    this.energia = Math.max(0, this.energia - 30);
    this.felicidad = Math.min(100, this.felicidad + 30);
    this.hambre = Math.min(100, this.hambre + 20);

    const frases = ['¡Esto es divertido! 🎮', '¡Weeeee! 🤩', '¡Más, más! 😻', '¡Ja ja! 😄'];
    this.ultimo_pensamiento = frases[Math.floor(Math.random() * frases.length)];

    setTimeout(() => {
      this.accion_en_curso = false;
    }, 500);

    return true;
  }

  // ============================================
  // Método: Degradación de estados
  // ============================================

  /**
   * Los estados se degradan con el tiempo automáticamente
   */
  degradarEstados() {
    this.hambre = Math.min(100, this.hambre + 2);    // Aumenta hambre
    this.energia = Math.max(0, this.energia - 0.5);  // Disminuye energía
    
    // Felicidad se reduce si tiene hambre o está muy cansado
    if (this.hambre > 70) {
      this.felicidad = Math.max(0, this.felicidad - 1);
    }
    if (this.energia < 30) {
      this.felicidad = Math.max(0, this.felicidad - 1);
    }
  }

  // ============================================
  // Método: Pensar según estado
  // ============================================

  /**
   * El gato "piensa" según sus estados
   */
  pensar() {
    // Si acaba de hacer una acción, mantiene su pensamiento
    if (this.accion_en_curso) return this.ultimo_pensamiento;

    // Si tiene mucha hambre
    if (this.hambre > 70) {
      const frases = ['¡Tengo hambre! 🍖', 'Me encantaría comer algo 😋', 'Barriguita vacía 🤤'];
      this.ultimo_pensamiento = frases[Math.floor(Math.random() * frases.length)];
    }
    // Si está muy cansado
    else if (this.energia < 30) {
      const frases = ['Estoy cansado 😴', 'Necesito descansar 😫', 'Zzzzz... 💤'];
      this.ultimo_pensamiento = frases[Math.floor(Math.random() * frases.length)];
    }
    // Si está feliz
    else if (this.felicidad > 75) {
      const frases = ['¡Estoy feliz! 😻', '¡La vida es hermosa! 🌈', '¡Amo esto! 💕'];
      this.ultimo_pensamiento = frases[Math.floor(Math.random() * frases.length)];
    }
    // Si está triste
    else if (this.felicidad < 30) {
      const frases = ['Me siento solo 😞', 'Quiero jugar contigo 🥺', '¿Me ignoras? 😿'];
      this.ultimo_pensamiento = frases[Math.floor(Math.random() * frases.length)];
    }
    // Estado normal
    else {
      const frases = ['Hola 👋', '¿Qué tal? 😊', 'Te quiero 💕', '¿Qué haces? 👀'];
      this.ultimo_pensamiento = frases[Math.floor(Math.random() * frases.length)];
    }

    return this.ultimo_pensamiento;
  }

  // ============================================
  // Método: Obtener estado general
  // ============================================

  /**
   * Retorna el estado general del gato
   */
  getEstadoGeneral() {
    if (this.hambre > 80) return 'Mucho hambre 😫';
    if (this.energia < 20) return 'Muy cansado 😴';
    if (this.felicidad < 30) return 'Muy triste 😞';
    if (this.felicidad > 75) return 'Muy feliz 😻';
    if (this.hambre > 50) return 'Un poco hambriento 🤤';
    return 'Bien 😊';
  }

  // ============================================
  // Método: Obtener expresión del gato
  // ============================================

  /**
   * Retorna la expresión visual del gato según su estado
   */
  getExpresion() {
    if (this.hambre > 80) return '😫';    // Mucho hambre
    if (this.energia < 20) return '😴';   // Cansado
    if (this.felicidad > 75) return '😻';  // Feliz
    if (this.felicidad < 30) return '😿';  // Triste
    return '😸';                           // Normal
  }

  // ============================================
  // Método: Verificar si está "muerto"
  // ============================================

  /**
   * Si todo está muy mal, el gato "muere"
   */
  estaMuerto() {
    return this.hambre >= 100 || this.energia <= 0 || this.felicidad <= 0;
  }
}

// ============================================
// Variables globales
// ============================================
let gato = new Tamagochi('Michi');
const INTERVALO_DEGRADACION = 3000; // 3 segundos

// ============================================
// Elementos del DOM
// ============================================
const petNameInput = document.getElementById('petName');
const catDisplay = document.getElementById('catDisplay');
const thoughtBubble = document.getElementById('thoughtBubble');
const hambreValue = document.getElementById('hambreValue');
const hambreBar = document.getElementById('hambreBar');
const energiaValue = document.getElementById('energiaValue');
const energiaBar = document.getElementById('energiaBar');
const felicidadValue = document.getElementById('felicidadValue');
const felicidadBar = document.getElementById('felicidadBar');
const stateDisplay = document.getElementById('stateDisplay');

const comerBtn = document.getElementById('comerBtn');
const dormirBtn = document.getElementById('dormirBtn');
const jugarBtn = document.getElementById('jugarBtn');

// ============================================
// Función: Actualizar pantalla
// ============================================

function actualizarPantalla() {
  // Actualizar nombre
  gato.nombre = petNameInput.value || 'Michi';

  // Actualizar valores de hambre
  hambreValue.textContent = Math.round(gato.hambre);
  hambreBar.style.width = gato.hambre + '%';

  // Actualizar valores de energía
  energiaValue.textContent = Math.round(gato.energia);
  energiaBar.style.width = gato.energia + '%';

  // Actualizar valores de felicidad
  felicidadValue.textContent = Math.round(gato.felicidad);
  felicidadBar.style.width = gato.felicidad + '%';

  // Actualizar pensamiento
  const pensamiento = gato.pensar();
  thoughtBubble.textContent = pensamiento;

  // Actualizar expresión del gato
  const expresion = gato.getExpresion();
  catDisplay.textContent = `${expresion}`;

  // Actualizar clase de animación
  catDisplay.className = 'cat-container';
  if (gato.felicidad > 75) {
    catDisplay.classList.add('happy');
  } else if (gato.felicidad < 30) {
    catDisplay.classList.add('sad');
  } else if (gato.energia < 30) {
    catDisplay.classList.add('tired');
  }

  // Actualizar estado general
  const estado = gato.getEstadoGeneral();
  stateDisplay.textContent = `Estado: ${estado}`;

  // Verificar si el gato está "muerto"
  if (gato.estaMuerto()) {
    stateDisplay.textContent = '¡Tu gato necesita más cuidado! ¿Volver a empezar?';
    stateDisplay.style.background = '#e74c3c';
    comerBtn.disabled = true;
    dormirBtn.disabled = true;
    jugarBtn.disabled = true;
  }
}

// ============================================
// Función: Acción con animación
// ============================================

function realizarAccion(accion) {
  if (gato.accion_en_curso) return;

  const resultado = accion();

  if (!resultado) {
    thoughtBubble.classList.add('pulse');
    setTimeout(() => {
      thoughtBubble.classList.remove('pulse');
    }, 500);
  } else {
    catDisplay.classList.add('pulse');
    setTimeout(() => {
      catDisplay.classList.remove('pulse');
    }, 500);
  }

  actualizarPantalla();
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✓ Tamagochi iniciado');

  // Botones de acciones
  comerBtn.addEventListener('click', () => realizarAccion(() => gato.comer()));
  dormirBtn.addEventListener('click', () => realizarAccion(() => gato.dormir()));
  jugarBtn.addEventListener('click', () => realizarAccion(() => gato.jugar()));

  // Cambiar nombre
  petNameInput.addEventListener('change', actualizarPantalla);

  // Actualizar pantalla inicial
  actualizarPantalla();

  // Degradar estados automáticamente
  setInterval(() => {
    gato.degradarEstados();
    actualizarPantalla();
  }, INTERVALO_DEGRADACION);
});
