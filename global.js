//node js es unas herramientas que ejecutan codigo javascript en el dispositivo, tienen objetos globales distintos y apis distintas al javascript de los navegadores, las principales diferencias son que no hay ni window ni document
//para crear un manifiesto se ejecuta en la consola, en la misma carpeta que el script principal (npm init --y) que crea un json con la configuracion
//para instalar y importar paquetes externos se usa (npm i "nombre"), creara una carpeta llamada node_modules y para importarlo bastara con el main del paquete en el package.json

console.log("inicio");//la consola sera la consola del sistema operativo
console.log(global);//es el objeto que remplaza a window
setTimeout(()=>{console.log("tiempo")}, 4000);//los timeouts no cambian, el codigo puede ser asincrono (timers, aysnc-await, promises)

console.log(process);//objeto con la informacion del proceso, porque esto se ejecuta como un programa
//process.exit();//cierra el proceso matando todas las tareas asincronas
console.log(process.env);//informacion variable a la hora de conectar a internet

console.log(__filename);//la ruta de este archivo
console.log(__dirname);//la ruta de la carpeta de este archivo
const {sumar, restar} = require('./paquete.js');//para importar cosas de otro script se hace asi, tras haberlo exportado, ejecuta todo el script antes y usa el exports como return
sumar(1,2);
const objetoImportado = require('./datos.json');//se hace asi para objetos .json, lo parsea automaticamente
console.log(objetoImportado.nombre);

global.unaVariableVar = 2;//el let funciona bien, pero no el var. para hacer variables globales se hace asi