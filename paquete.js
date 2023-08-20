function sumar(a, b){
    return a + b;
}
function restar(a, b){
    return a - b;
}

module.exports = {sumar, restar};//para que al importar el script se puedan usar sus cosas se hace asi, con un objeto  con todas las cosas a exportar
console.log(module);//objeto con rutas de dependencias y con lo que se este exportando, en este caso las 2 funciones (module.exports)
//para usar el sistema de modulos es modules el archivo debe ser .cjs o poner en el package.json "type": "module", tambien se puede forzar el por defecto commonjs con .mjs
//en caso de usar el otro tipo se exporta poniendo export antes ej: (export function sumar(){}) (tambien sirve el export default x). y para importar: import {} from './archivo'