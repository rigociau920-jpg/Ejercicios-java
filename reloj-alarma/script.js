/**
 * Reloj Digital Interactivo con Alarma
 * Funciones para mostrar hora, gestionar alarmas y notificaciones
 */

// ============================================
// Estado global
// ============================================
const state = {
  alarmTime: null,          // Hora de alarma (formato "HH:MM")
  isAlarmActive: false,     // Flag de alarma activa
  alarmTriggered: false,    // Flag para evitar disparar alarma múltiples veces
  is24HourMode: true,       // Formato de hora (true = 24h, false = 12h)
};

// ============================================
// Objeto con nombres de meses en español
// ============================================
const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const dayNames = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

// ============================================
// Función: Obtener saludo según la hora
// ============================================
/**
 * Retorna un saludo personalizado basado en la hora del día
 * @param {Date} date - Objeto Date con la hora actual
 * @returns {string} Saludo (Buenos días, Buenas tardes, Buenas noches)
 */
function getGreeting(date) {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return '☀️ Buenos días';
  } else if (hour >= 12 && hour < 18) {
    return '🌤️ Buenas tardes';
  } else {
    return '🌙 Buenas noches';
  }
}

// ============================================
// Función: Formatear hora con ceros a la izquierda
// ============================================
/**
 * Rellena un número con ceros a la izquierda para que tenga 2 dígitos
 * @param {number} num - Número a formatear (0-59)
 * @returns {string} Número formateado con 2 dígitos (ej: "05", "59")
 */
function padZero(num) {
  return num < 10 ? '0' + num : '' + num;
}

// ============================================
// Función: Convertir hora a formato 12h
// ============================================
/**
 * Convierte una hora en formato 24h a 12h (con AM/PM)
 * @param {number} hour - Hora en formato 24h (0-23)
 * @param {number} minute - Minuto (0-59)
 * @param {number} second - Segundo (0-59)
 * @returns {string} Hora formateada (ej: "02:30:45 PM")
 */
function formatTo12Hour(hour, minute, second) {
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

  return `${padZero(hour12)}:${padZero(minute)}:${padZero(second)} ${period}`;
}

// ============================================
// Función: Actualizar reloj
// ============================================
/**
 * Actualiza el display del reloj con la hora actual y la fecha
 * Se ejecuta cada segundo mediante setInterval
 */
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Obtener elementos del DOM
  const clockDisplay = document.getElementById('clock');
  const dateDisplay = document.getElementById('date');
  const greetingDisplay = document.getElementById('greeting');

  // Formatear la hora según el modo (24h o 12h)
  let timeString;
  if (state.is24HourMode) {
    timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  } else {
    timeString = formatTo12Hour(hours, minutes, seconds);
  }

  // Actualizar display del reloj
  clockDisplay.textContent = timeString;

  // Formatear y actualizar fecha
  const day = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const dayName = dayNames[now.getDay()];

  dateDisplay.textContent = `${dayName}, ${padZero(day)} de ${month} de ${year}`;

  // Actualizar saludo
  greetingDisplay.textContent = getGreeting(now);

  // Verificar si debe sonar la alarma
  checkAlarm(hours, minutes);
}

// ============================================
// Función: Verificar si debe sonar la alarma
// ============================================
/**
 * Compara la hora actual con la alarma configurada
 * Si coinciden, activa la alarma (solo una vez)
 * @param {number} hours - Hora actual (0-23)
 * @param {number} minutes - Minuto actual (0-59)
 */
function checkAlarm(hours, minutes) {
  // Si no hay alarma configurada o ya sonó, retornar
  if (!state.isAlarmActive || state.alarmTriggered) {
    return;
  }

  // Formatear hora actual como "HH:MM"
  const currentTime = `${padZero(hours)}:${padZero(minutes)}`;

  // Comparar con la hora de alarma
  if (currentTime === state.alarmTime) {
    triggerAlarm();
  }
}

// ============================================
// Función: Activar alarma
// ============================================
/**
 * Se ejecuta cuando la alarma suena
 * - Muestra notificación visual
 * - Reproduce sonido (simulado con alert)
 * - Anima la pantalla con parpadeo
 * - Desactiva automáticamente la alarma
 */
function triggerAlarm() {
  state.alarmTriggered = true;

  // Obtener elementos
  const notification = document.getElementById('notification');
  const clockDisplay = document.getElementById('clock');

  // Mostrar notificación visual
  notification.textContent = '🔔 ¡ALARMA ACTIVA!';
  notification.classList.add('show', 'alarm-ringing');
  clockDisplay.style.color = '#ff0000';

  // Simular sonido con alert (puedes usar Audio API para sonido real)
  console.log('🔔 ALARMA SONANDO A ' + state.alarmTime);

  // Reproducir sonido usando Web Audio API (tono simple)
  playAlarmSound();

  // Desactivar alarma después de 10 segundos
  setTimeout(() => {
    disableAlarm();
    notification.classList.remove('show', 'alarm-ringing');
    notification.textContent = 'Alarma desactivada';
    clockDisplay.style.color = '#00ff00';

    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }, 10000);
}

// ============================================
// Función: Reproducir sonido de alarma
// ============================================
/**
 * Reproduce un tono de alarma usando Web Audio API
 * Crea un sonido intermitente de 1000Hz
 */
function playAlarmSound() {
  try {
    // Crear contexto de audio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Crear oscilador (generador de tono)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configurar tono (1000 Hz)
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';

    // Volumen
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    // Sonar durante 10 segundos con parpadeos
    oscillator.start(audioContext.currentTime);

    for (let i = 0; i < 10; i++) {
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + i + 0.2);
    }

    oscillator.stop(audioContext.currentTime + 10);
  } catch (error) {
    console.log('Web Audio API no disponible. Usando alert:', error);
    // Fallback a alert si Web Audio API no funciona
    alert('⏰ ¡ALARMA! Es la hora configurada: ' + state.alarmTime);
  }
}

// ============================================
// Función: Establecer alarma
// ============================================
/**
 * Valida y establece la hora de alarma
 * - Verifica que la hora sea futura
 * - Activa la alarma
 * - Actualiza el UI
 */
function setAlarm() {
  const alarmInput = document.getElementById('alarmInput');
  const alarmTime = alarmInput.value;

  // Validar que se haya seleccionado una hora
  if (!alarmTime) {
    showNotification('Por favor, selecciona una hora', false);
    return;
  }

  // Obtener hora actual
  const now = new Date();
  const currentTime = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;

  // Validar que la alarma sea futura
  if (alarmTime <= currentTime) {
    showNotification('⚠️ La alarma debe ser una hora futura', false);
    return;
  }

  // Establecer alarma
  state.alarmTime = alarmTime;
  state.isAlarmActive = true;
  state.alarmTriggered = false;

  // Actualizar UI
  updateAlarmUI();
  showNotification(`✓ Alarma establecida para las ${alarmTime}`, true);
}

// ============================================
// Función: Cancelar alarma
// ============================================
/**
 * Desactiva la alarma y reinicia el estado
 */
function disableAlarm() {
  state.alarmTime = null;
  state.isAlarmActive = false;
  state.alarmTriggered = false;

  // Actualizar UI
  updateAlarmUI();
  showNotification('Alarma cancelada', true);
}

// ============================================
// Función: Actualizar UI de alarma
// ============================================
/**
 * Actualiza los elementos visuales relacionados con la alarma
 * - Botones habilitados/deshabilitados
 * - Texto de estado
 * - Indicador visual
 */
function updateAlarmUI() {
  const btnSetAlarm = document.getElementById('btnSetAlarm');
  const btnCancelAlarm = document.getElementById('btnCancelAlarm');
  const alarmStatus = document.getElementById('alarmStatus');
  const alarmIndicator = document.getElementById('alarmIndicator');
  const alarmInput = document.getElementById('alarmInput');

  if (state.isAlarmActive) {
    // Alarma activa
    btnSetAlarm.disabled = true;
    btnCancelAlarm.disabled = false;
    alarmStatus.textContent = `🔔 Alarma configurada para las ${state.alarmTime}`;
    alarmStatus.classList.add('active');
    alarmIndicator.classList.add('active');
    alarmInput.disabled = true;
  } else {
    // Alarma inactiva
    btnSetAlarm.disabled = false;
    btnCancelAlarm.disabled = true;
    alarmStatus.textContent = 'Sin alarma configurada';
    alarmStatus.classList.remove('active');
    alarmIndicator.classList.remove('active');
    alarmInput.disabled = false;
    alarmInput.value = '';
  }
}

// ============================================
// Función: Mostrar notificación
// ============================================
/**
 * Muestra un mensaje temporal en el área de notificaciones
 * @param {string} message - Mensaje a mostrar
 * @param {boolean} isSuccess - true para mensaje éxito (verde), false para error/aviso (rojo)
 */
function showNotification(message, isSuccess = true) {
  const notification = document.getElementById('notification');

  notification.textContent = message;
  notification.classList.add('show');
  notification.style.borderColor = isSuccess ? '#00ff00' : '#ff6b6b';
  notification.style.color = isSuccess ? '#00ff00' : '#ff6b6b';

  // Ocultar notificación después de 3 segundos
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// ============================================
// Función: Toggle entre formato 24h y 12h
// ============================================
/**
 * Cambia entre formato de 24 horas y 12 horas (AM/PM)
 */
function toggleTimeFormat() {
  state.is24HourMode = !state.is24HourMode;

  const btnToggle = document.getElementById('btnToggleTime');
  btnToggle.textContent = state.is24HourMode ? 'Cambiar a 12h' : 'Cambiar a 24h';

  // Actualizar reloj inmediatamente
  updateClock();
}

// ============================================
// Event Listeners: Conexión con el DOM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Botones
  const btnSetAlarm = document.getElementById('btnSetAlarm');
  const btnCancelAlarm = document.getElementById('btnCancelAlarm');
  const btnToggleTime = document.getElementById('btnToggleTime');

  // Listeners
  btnSetAlarm.addEventListener('click', setAlarm);
  btnCancelAlarm.addEventListener('click', disableAlarm);
  btnToggleTime.addEventListener('click', toggleTimeFormat);

  // Permitir establecer alarma al presionar Enter
  document.getElementById('alarmInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      setAlarm();
    }
  });

  // Actualizar reloj cada segundo
  updateClock();
  setInterval(updateClock, 1000);

  console.log('✓ Reloj digital con alarma cargado correctamente');
});
