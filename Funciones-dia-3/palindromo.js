//Ejercicio: Detector de Palíndromos
//objetivo: crea una logica compleja ensapsulada en una funcion que determine si una palabra o frase es un palíndromo
//un ejemplo de palindromo es "es anilla" o "reconocer", oso
//1. crea una cuncion llamada esPalindromo que reciba un texto y retorne true si es palindromo y false su no lo es 
/**
 * Verifica si un texto es un palíndromo.
 * 
 * Esta función elimina los espacios en blanco, convierte el texto a minúsculas,
 * lo invierte y compara la versión limpia con la invertida.
 * 
 * @param {string} texto - El texto a verificar
 * @returns {boolean} true si el texto es un palíndromo, false en caso contrario
 * 
 * @example
 * // Retorna true
 * esPalindromo("Ama a Roma");
 * 
 * @example
 * // Retorna true
 * esPalindromo("anilina");
 * 
 * @example
 * // Retorna false
 * esPalindromo("javascript");
 */
function esPalindromo(texto) {
    if (typeof texto !== 'string') return false;
    // elimina espacios en blanco y convierte a minúsculas
    var textoLimpio = texto.toLowerCase().replace(/\s+/g, '');
    // invierte el texto limpio
    var textoInvertido = textoLimpio.split('').reverse().join('');
    // compara
    return textoLimpio === textoInvertido;
}
