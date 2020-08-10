//** Enviar a Consola */
// console.time();
// console.log('Hola');
// console.log(20+10);
// console.table([1, 2, 3]);
// console.error('Error');
// console.warn('Cuidado');
// console.timeEnd();
// //console.clear();

//** Prompt */
// var nombre = prompt('Cual es tu nombre?');
// document.getElementById('mensaje').innerHTML = `Bienvenido ${nombre}`;

//** Variable var */
// var hola = "Hola amigos";
// console.log(hola);

//Comment All Ctrl + k + c
//Comment All Ctrl + k + u

//** Variable let */
// No se puedes sobreescribir variables
// let nombreCliente = "Pedro";
// let nombreCliente = "Juan";

//** Variable Cont */
// No se puedes sobreescribir variables y tiene que darle un valor al inicializar
// const nombreCliente = "Pedro";
// console.log(nombreCliente);

//** Strings */
// let action = 'aprendiendo';
// let subject = 'javascript';
// console.log(action + ' ' + subject);
// //template-string
// console.log(`${action} ${subject}`);

// let banda = 'Metalica';
// let cancion = 'Enter Sandman';
// let nombre = banda + " " + cancion;
// nombre = nombre.concat(" ", "the best")
// console.log(banda.length);
// console.log(nombre);

// nombre = nombre.toUpperCase();
// console.log(nombre);

// lastsong = cancion.split(' ');
// console.log(lastsong);

// nombreCambiado = cancion.replace('Sandman', 'Du Hust');
// console.log(nombreCambiado);

// exists = cancion.includes('Sandman');
// console.log(exists);

// console.log(cancion.repeat(3));

//** Numbers */
// const   numero1 = 30,
//         numero2 = 20,
//         numero3 = 20.20,
//         numero4 = -3,
//         numero5 = 20;

// let resultado;

// resultado = numero1 + numero2;
// resultado = numero5 * numero2;
// resultado = Math.round(2.5);
// resultado = Math.abs(numero4);
// resultado = Math.min(numero1, numero2, numero3, numero4, numero5);

// console.log(resultado);
// console.log(parseFloat("20.20") + 20);
// console.log(parseInt("20.20") + 20);
// console.log(Number("-20.20") + 20);
// console.log(Number(-20.234578456).toFixed(3));

// dato = 284957845096;
// dato = String(dato);
// console.log(dato.length);

//** Arrays */
// let nombre = 'Juan';
// console.log(Array.isArray(nombre));

// let meses = ['enero', 'febrero', 'marzo'];
// console.log(Array.isArray(meses));

// meses.push('abril');
// console.table(meses);

// meses.splice(1, 1);
// console.table(meses);

//** Objetos */
// const persona = {
//     nombre: 'Juan',
//     apellido: 'De la torre',
//     edad: 80,
//     trabajo: true,
//     musica: ['Trance', 'Rock', 'Grunge'],
//     hogar : {
//         ciudad: 'Guadalajara',
//         pais: 'Mexico'
//     }
// }

// console.log(persona);

//** Template Strings */
// const nombre = 'Juan',
//       trabajo = 'Desarrollador Web';

// console.log('Nombre: ' + nombre + ', Trabajo: ' + trabajo);
// console.log(`Nombre: ${nombre}, Trabajo: ${trabajo}`);

// const contenedorApp = document.querySelector('#mensaje');
// let html = '<ul>' +
//             '<li>Strings</li>' +
//             '<li>Nombre: ' + nombre + '</li>' +
//             '<li>Trabajo: ' + trabajo + '</li>' +
//             '</ul>';
// contenedorApp.innerHTML = html;

// let html2 = `<ul>
//                 <li>Template Strings</li>
//                 <li>Nombre: ${nombre}</li>
//                 <li>Trabajo: ${trabajo}</li>
//             </ul>`;

// contenedorApp.innerHTML = html2;

//** Funciones */

// // function declaration
// function saludar() {
//     console.log('Hola');
// }
// saludar();

// // function expression: Debe ser declarada antes de ser invokada
// const suma =  function() {
//     console.log(1+2);
// }
// suma();

// function Hello(nombre) {
//     console.log(`Hola ${nombre}`);
// }
// Hello('Juan');

// // IIFE
// (function(tecnologia) {
//     console.log('Aqui estoy aprendiendo' + tecnologia);
// })('Java');

// Metodos
// const musica = {
//     reproducir: function(cancion) {
//         console.log(`Reproduciendo la cancion  ${cancion}`);
//     },
//     pausar: function() {
//         console.log('Paused ...');
//     }
// }
// // Metodos externos
// musica.borrar = function(id) {
//     console.log(`Borrando la cancion con el ID ${id}`);
// }

// musica.reproducir('Parla Pura');
// musica.pausar('Parla Pura');
// musica.borrar(405785);

// function multiplicacion(a, b) {
//     return a * b;
// }
// let result = multiplicacion(5, 4);
// console.log(result);

// function multiplicacion(a, b) {
//     return a * b;
// }

// // Arrow Function

// const division = (a, b) => {
//     return (a / b);
// }
// console.log(division(20, 10));

// const resta = (a, b) => a -b;
// console.log(resta(20, 10));

//** Object constructor */

// Object Literal
// const persona = {
//     nombre: 'Juan'
// }
// console.log(persona);

// // Object Constructor
// function Tarea(nombre, urgencia) {
//     this.nombre = nombre;
//     this.urgencia = urgencia;

// }
// const tarea1 = new Tarea('Aprender Javascript', 'Urgente');
// const tarea2 = new Tarea('Preparar Cafe', 'Medio');
// console.log(tarea1);
// console.log(tarea2);

// //Cambiar a clases (nuevas versiones)
// class TareaClass {
//     constructor (nombre, urgencia) {
//         this.nombre = nombre;
//         this.urgencia = urgencia;
//     }
// }
// const tarea3 = new TareaClass('Aprender Javascript', 'Urgente');
// const tarea4 = new TareaClass('Preparar Cafe', 'Medio');
// console.log(tarea1);
// console.log(tarea2);

// // Object Literal
// const people = {
//     nombre: 'Juan',
//     edad: 80,
//     anioNacimiento: function () {
//         return new Date().getFullYear() - this.edad;
//     }
// }
// console.log(people.anioNacimiento());

//** Fechas */
// const diaHoy = new Date();
// let valor = diaHoy;
// valor = diaHoy.getMonth();
// valor = diaHoy.getDay();
// valor = diaHoy.getDate();
// valor = diaHoy.getFullYear();
// valor = diaHoy.getMinutes();
// valor = diaHoy.getTime();

// const unDia = new Date('1-5-1987');
// console.log(valor);
// console.log(unDia);


// const puntaje = 1000;
// //Comparador valor
// if (puntaje == 1000) {}
// //Comparador estricto (valor y tipo)
// if (puntaje === 1000) {}

// // Ternario
// let logueado = true;
// console.log(logueado ? 'Si se logueo' : 'No se logueo');
// logueado = false;
// console.log(logueado ? 'Si se logueo' : 'No se logueo');

//** Otros iteradores en Javascript */

// const pendientes = ['Tarea', 'Comer', 'Proyecto', 'Estudiar'];

// const carrito = [
//     {id: 1, producto: 'Libro'},
//     {id: 2, producto: 'Camisa'},
//     {id: 3, producto: 'Disco'},
// ];

// let automovil = {
//     modelo: 'Camaro',
//     motor: 6.0,
//     anio: 1967
// }

// for (pendiente of pendientes) {
//     console.log(pendientes);
// }

// for (producto of carrito) {
//     console.log(producto.producto);
// }

// for (auto of Object.values(automovil)) {
//     console.log(auto);
// }

// pendientes.forEach(function(tarea) {
//     console.log(tarea);
// });

// pendientes.forEach(tarea => {
//     console.log(tarea);
// });

// // MAP Copia arreglo
// pendientes.map(function(tarea) {
//     console.log(tarea);
// });

// console.log("Recorrer Objeto");
// Object.values(carrito).forEach(item => {
//     console.log(item.producto);
// });

// Object.keys(automovil).forEach(keys => {
//     console.log(keys);
// });

//** Scope */

// var musica = 'Rock';

// if (musica) {
//     var musica = 'Grunge';
//     console.log('Dentro del IF ' + musica);
// }
// console.log('Fuera del IF ' + musica);

// let musica = 'Rock';

// if (musica) {
//     let musica = 'Grunge';
//     console.log('Dentro del IF ' + musica);
// }
// console.log('Fuera del IF ' + musica);

//** Object Destructuring */

// const cliente = {
//     nombre: 'Alejandra',
//     tipo: 'Premium',
//     datos: {
//         ubicacion: {
//             ciudad: 'Guadalajara',
//             pais: 'Mexico'
//         },
//         cuenta: {
//             desde: '10-12-2012',
//             saldo: 4000
//         }
//     }
// }
// console.log(cliente);

// //Forma anterior
// console.log('==================');
// const nombreCliente = cliente.nombre,
//     tipoCliente = cliente.tipo,
//     ubicacionCliente = cliente.datos.ubicacion;
// console.log(ubicacionCliente.pais);

// //Forma nueva
// console.log('==================');
// let {nombre, tipo} = cliente;
// let {datos: {ubicacion}} = cliente;
// let {datos: {ubicacion : {ciudad}}} = cliente;
// console.log(nombre);
// console.log(tipo);
// console.log(ubicacion);
// console.log(ciudad);


//** Object Literal Enhacement */

// const banda = 'Metalica',
//       genero = 'Heavy Metal',
//       canciones = [1, 2, 3];

// //Forma anterior
// const metallica = {
//     banda: banda,
//     genero: genero,
//     canciones: canciones
// }

// console.log(metallica)

// //Forma nueva
// const aerosmith = {banda, genero, canciones}

// console.log(aerosmith)

//** Filter & Map */

// const personas = [
//     {nombre: 'Juan', edad: 20},
//     {nombre: 'Pablo', edad: 21},
//     {nombre: 'Maria', edad: 22},
//     {nombre: 'Pedro', edad: 23},
//     {nombre: 'Luis', edad: 24}
// ];
// console.table(personas);

// const mayores = personas.filter(persona => persona.edad > 22);
// console.table(mayores);

// const luis = personas.find(persona => persona.nombre == 'Luis');
// let {edad} = luis;
// console.log(edad);

// //reduce
// let total = personas.reduce((edadTotal, persona) => {
//     return edadTotal + persona.edad;
// }, 0);
// console.log(total);
// console.log(total / personas.length);

//** Fetch API */
// Reemplazo de AJAX

// function descargarUsuarios(cantidad) {
//     const api = `https://api.randomuser.me/?nat=US&results=${cantidad}`;
//     fetch(api)
//         .then(respuesta => respuesta.json())
//         .then(datos => imprimirHTML(datos.results));
// }

// function imprimirHTML(datos) {
//     datos.forEach(usuario => {
//         const li = document.createElement('li');
//         const { name: {first}, name: {last},picture: {medium}, nat} = usuario;
//         const {} = usuario;
//         li.innerHTML = `
//             Nombre: ${first} ${last}
//             Pais: ${nat}
//             Imagen: <img src="${medium}">
//         `;
//         document.querySelector('#app').appendChild(li);
//     });
// }
// descargarUsuarios(30);