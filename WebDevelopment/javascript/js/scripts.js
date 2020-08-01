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
const nombre = 'Juan',
      trabajo = 'Desarrollador Web';

console.log('Nombre: ' + nombre + ', Trabajo: ' + trabajo);
console.log(`Nombre:and i ${nombre}, Trabajo: ${trabajo} `);
