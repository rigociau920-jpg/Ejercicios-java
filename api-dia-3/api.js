//ejercicio: consumo de APIs con fetch
//obejtico: buscar un pokemon con pokeAPI y mostrar su nombre en consola
//1. crea una function llamado obetener PokemonAPI que reciba un nombre de pokemon, consulte la pokeAPI y devuelva lo datos en consola
/**
 * api.js
 * Cliente simple para PokeAPI + lógica DOM para una página Pokedex
 * - exporta la función global obtenerPokemonAPI(nombre) que devuelve datos del Pokémon
 * - añade la interacción con un formulario de búsqueda si existen elementos en la página
 */

// Cache simple para evitar llamadas repetidas
const POKE_CACHE = new Map();

/**
 * Obtener datos del Pokémon desde PokeAPI
 * @param {string} nombrePokemon - Nombre o id del Pokémon
 * @returns {Promise<object>} objeto con datos del pokemon o null si no existe
 */
async function obtenerPokemonAPI(nombrePokemon) {
    if (!nombrePokemon || typeof nombrePokemon !== 'string') return null;

    const key = nombrePokemon.toLowerCase().trim();
    // Revisar cache primero
    if (POKE_CACHE.has(key)) return POKE_CACHE.get(key);

    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(key)}`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            // 404 u otro error
            if (respuesta.status === 404) return null;
            throw new Error(`Error al obtener el Pokémon: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        // Guardar en cache y devolver
        POKE_CACHE.set(key, datos);
        return datos;
    } catch (error) {
        console.error('Error en la solicitud:', error.message || error);
        throw error;
    }
}

// Exponer la función en el scope global para que el HTML pueda usarla
window.obtenerPokemonAPI = obtenerPokemonAPI;

// -------------------------
// Código DOM: si la página tiene un formulario de búsqueda, conectamos la UI
// -------------------------
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    if (!root) return; // no estamos en la página objetivo

    // Construir UI ligera si el HTML sólo contiene <main id="app"></main>
    root.innerHTML = `
        <div class="pokedex">
            <header>
                <h1>Pokedex</h1>
                <p>Busca un Pokémon por nombre o id (ej: pikachu o 25)</p>
            </header>

            <div class="search">
                <input id="pokeInput" placeholder="Ej: pikachu" aria-label="buscar pokemon" />
                <button id="pokeSearch">Buscar</button>
            </div>

            <div id="result" class="result">Busca un Pokémon para ver su tarjeta</div>
        </div>
    `;

    // Añadir estilos mínimos
    const style = document.createElement('style');
    style.textContent = `
        .pokedex{max-width:760px;margin:24px auto;padding:18px;border-radius:12px;background:linear-gradient(180deg,#f7f9fc,#eef6ff);box-shadow:0 12px 40px rgba(23,42,69,.12)}
        .pokedex header{display:flex;flex-direction:column;align-items:center;gap:4px;margin-bottom:14px}
        .pokedex h1{margin:0;font-size:1.6rem;color:#2b3a67}
        .search{display:flex;gap:8px;justify-content:center;margin-bottom:18px}
        .search input{padding:10px 12px;border-radius:8px;border:1px solid #cfe0ff;width:320px}
        .search button{padding:10px 12px;border-radius:8px;border:none;background:#4a90e2;color:white;cursor:pointer}
        .result{display:flex;align-items:center;justify-content:center;min-height:220px}
        .card{width:100%;max-width:640px;background:white;padding:18px;border-radius:10px;display:flex;gap:14px;align-items:center;border:1px solid #e8f0ff}
        .sprite{width:180px;height:180px;background:#f3f6ff;border-radius:10px;display:flex;align-items:center;justify-content:center}
        .info{flex:1}
        .info h2{margin:0 0 6px;text-transform:capitalize}
        .meta{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0}
        .chip{padding:6px 8px;border-radius:999px;background:#f0f8ff;border:1px solid #dbeeff;font-weight:700;color:#245}
        .abilities, .stats{margin-top:8px}
    `;
    document.head.appendChild(style);

    // Elements
    const pokeInput = document.getElementById('pokeInput');
    const pokeSearch = document.getElementById('pokeSearch');
    const result = document.getElementById('result');

    async function onSearch() {
        const q = pokeInput.value.trim();
        if (!q) {
            result.textContent = 'Por favor ingresa un nombre o id de Pokémon.';
            return;
        }

        result.innerHTML = 'Cargando...';

        try {
            const data = await obtenerPokemonAPI(q);
            if (!data) {
                result.innerHTML = `<div style="color:#b00020">Pokémon no encontrado. Comprueba el nombre o id.</div>`;
                return;
            }

            // Construir tarjeta con la información relevante
            const types = data.types.map(t => t.type.name).join(', ');
            const abilities = data.abilities.map(a => a.ability.name).join(', ');
            const stats = data.stats.map(s => ({name: s.stat.name, base: s.base_stat}));

            result.innerHTML = `
                <div class="card">
                    <div class="sprite">
                        <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" alt="${data.name}" style="max-width:88%;max-height:88%;"/>
                    </div>
                    <div class="info">
                        <h2>#${data.id} ${data.name}</h2>
                        <div class="meta">
                            <div class="chip">Tipos: ${types}</div>
                            <div class="chip">Peso: ${data.weight}</div>
                            <div class="chip">Altura: ${data.height}</div>
                        </div>
                        <div class="abilities"><strong>Habilidades:</strong> ${abilities}</div>
                        <div class="stats"><strong>Stats:</strong> ${stats.map(s => `${s.name} ${s.base}`).join(' • ')}</div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error(error);
            result.innerHTML = `<div style="color:#b00020">Ocurrió un error al obtener datos del Pokémon.</div>`;
        }
    }

    // Listeners: click + Enter
    pokeSearch.addEventListener('click', onSearch);
    pokeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') onSearch();
    });
});