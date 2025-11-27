/**
 * Calcula el volumen de un cilindro aplicando la fórmula:
 * volumen = área de la base (círculo) * altura.
 *
 * Esta función reutiliza la función areaCirculo(radio) para obtener
 * el área de la base y la multiplica por la altura proporcionada.
 * 
 * Notas:
 * - Se espera que `radio` y `altura` sean números (preferiblemente no negativos).
 * - La función no valida ni lanza errores por valores no numéricos o negativos;
 *   si se necesitan validaciones adicionales, deben añadirse antes de la llamada.
 *
 * @param {number} radio - Radio de la base circular del cilindro (mismas unidades que la altura).
 * @param {number} altura - Altura del cilindro.
 * @returns {number} Volumen del cilindro en las unidades cúbicas correspondientes.
 *
 * @example
 * // Con radio = 2 y altura = 5:
 * // área de la base = π * 2^2 = 12.566370614359172
 * // volumen = 12.566370614359172 * 5 = 62.83185307179586
 * const vol = volumenCilindro(2, 5);
 */
//crea una funcion para calcular el area de un circulo dado su radio
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}
//crea una funcion para calcular el area de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo.
 * @param {number} base - La base del rectángulo en unidades.
 * @param {number} altura - La altura del rectángulo en unidades.
 * @returns {number} El área del rectángulo (base × altura).
 */
function areaRectangulo(base, altura) {
    return base * altura;
} 
//crea una funcion para calcular el area de un tringulo 
function areaTriangulo(base, altura) {
    return (base * altura) / 2;
}
//vamos a calcular el volumen de un cilindro 
//El volumen es area de la base (circulo) * altura
/**
 * Calcula el volumen de un cilindro.
 *
 * La función obtiene el área de la base llamando a areaCirculo(radio)
 * y la multiplica por la altura para obtener el volumen.
 * Requiere que exista una función auxiliar areaCirculo(radio) que
 * devuelva el área del círculo para el radio indicado.
 *
 * @param {number} radio - Radio de la base del cilindro.
 * @param {number} altura - Altura del cilindro.
 * @returns {number} Volumen del cilindro (misma unidad^3).
 *
 * @example
 * // Suponiendo que areaCirculo(r) = Math.PI * r * r
 * // Volumen de un cilindro con radio 2 y altura 5:
 * // const volumen = volumenCilindro(2, 5);
 * // console.log(volumen); // ≈ 62.83185307179586
 */
function volumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}
//crea una funcion para calcular una derivada simple de una funcion polimonial de la forma ax^n
/**
 * Calcula el coeficiente de la derivada de un término polinómico de la forma a*x^n.
 *
 * La derivada de a*x^n es (a * n) * x^(n-1). Esta función devuelve el coeficiente (a * n)
 * correspondiente a la nueva potencia x^(n-1). Si n es 0, la derivada es 0.
 *
 * @param {number} a - Coeficiente del término original (a en a*x^n).
 * @param {number} n - Exponente del término original (n en a*x^n).
 * @returns {number} Coeficiente de la derivada, es decir a * n.
 *
 * @example
 * // Para el término 3x^4:
 * // derivadaPolinomio(3, 4) devuelve 12, que corresponde a la derivada 12x^3.
 * derivadaPolinomio(3, 4); // 12
 */
function derivadaPolinomio(a, n) {
    // La derivada de ax^n es a*n*x^(n-1) 
    return a * n;
} 
//crea una funcion para calcular una integral simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la integral de un polinomio de la forma ax^n.
 * La integral de ax^n es (a/(n+1))*x^(n+1) + C, donde C es la constante de integración.
 *
 * @param {number} a - El coeficiente del término del polinomio.
 * @param {number} n - El exponente del término del polinomio.
 * @returns {{ coeficiente: number, potencia: number }} - Un objeto que contiene el nuevo coeficiente y la nueva potencia de la integral.
 *
 * @example
 * // Para la integral de 3x^2
 * const resultado = integralPolinomio(3, 2);
 * console.log(resultado); // { coeficiente: 1, potencia: 3 }
 */
function integralPolinomio(a, n) {
    // La integral de ax^n es (a/(n+1))*x^(n+1) + C
    const nuevoCoeficiente = a / (n + 1);
    const nuevaPotencia = n + 1;
    return { coeficiente: nuevoCoeficiente, potencia: nuevaPotencia };
}