console.log('1');

(function() {
    'use strict'
    document.addEventListener('DOMContentLoaded', function() {

        // getElementById

        // var logo = document.getElementById('logo');
        // console.log(logo);
        // //logo.hasAttribute('class');
        // //logo.getAttribute('class');
        // //logo.setAttribute('class', 'nueva_clase');
        // var navegacion = document.getElementById('navegacion');
        // console.log(navegacion);
        // //navegacion.style.display = 'none';

        // getElementsByClassName
        // var navegacion = document.getElementsByClassName('navegacion');
        // console.log(navegacion);

        // var contenido = document.getElementsByClassName('contenido');
        // console.log(contenido);

        // getElementsByTagName
        // var enlances = document.getElementsByTagName('a');
        // console.log(enlances[0]);
        // for (var i = 0; i < enlances.length; i++) {
        //     enlances[i].setAttribute('target', '_blank');
        // }

        // var enlancesSidebar = document.getElementById('sidebar').getElementsByTagName('a');
        // console.log(enlancesSidebar);

        // querySelector
        // var logo =  document.querySelector('#logo');
        // console.log(logo);
        // var logo =  document.querySelector('.logo');
        // console.log(logo);

        // var encabezado = document.querySelector('aside h2');
        // console.log(encabezado);

        // var h2 = document.querySelector('h2');
        // console.log(h2.innerText);

        // var allh2 = document.querySelectorAll('h2');
        // console.log(allh2);

        // var footer = document.querySelectorAll('h2, footer p');
        // console.log(footer);

        //** Nodos */
        // var enlaces = document.querySelectorAll('#menu ul li a');
        // console.log(enlaces[0].nodeType);
        // console.log(enlaces[0].nodeName);
        // console.log(enlaces[0].attributes);
        // console.log(enlaces[0].firstChild);
        // console.log(enlaces[0].firstChild.nodeValue);
        // enlaces[0].firstChild.nodeValue = 'Home';

        //** Crear contenido
        // var sidebar = document.querySelector('#sidebar');
        // var nuevoElemento = document.createElement("h1");
        // var nuevoTexto = document.createTextNode('Hola Mundo');
        // nuevoElemento.appendChild(nuevoTexto);
        // console.log(nuevoElemento);
        // console.log(sidebar);
        // sidebar.appendChild(nuevoElemento);

        // // Agregar entrada 6
        // var enlancesSidebar = document.querySelectorAll('#sidebar ul');
        // console.log("Enlaces Sidebar");
        // console.log(enlancesSidebar);
        // var nuevaEntrada = document.createElement('a');
        // nuevaEntrada.setAttribute('href', 'http://google.com');
        // var nuevoTexto = document.createTextNode('Entrada 6');
        // nuevaEntrada.appendChild(nuevoTexto);
        // console.log("Nueva Entrada")
        // console.log(nuevaEntrada);
        // var nuevaLista = document.createElement('li');
        // nuevaLista.appendChild(nuevaEntrada);
        // console.log("Nueva Lista")
        // console.log(nuevaLista);
        // enlancesSidebar[0].appendChild(nuevaLista);
        // console.log(enlancesSidebar);

        //** Clonar Nodo */
        // var contenido = document.querySelectorAll('main');
        // console.log(contenido);
        // var nuevoContenido = contenido[0].cloneNode(true);
        // var sidebar = document.querySelector('aside');
        // sidebar.insertBefore(nuevoContenido, sidebar.childNodes[5]);

        //Insertar Nodo
        // var sidebar = document.querySelector('aside');
        // var masVisitados = document.createElement('h2');
        // var textoVisitados = document.createTextNode('Post mas visitados');
        // masVisitados.appendChild(textoVisitados);
        // sidebar.insertBefore(masVisitados, sidebar.childNodes[0]);

        // var contenido = document.querySelectorAll('main h2');
        // for (var i = 0; i < contenido.length; i++) {
        //     var nuevoElemento = document.createElement('li');
        //     var nuevoTexto = document.createTextNode(contenido[i].firstChild.nodeValue);
        //     nuevoElemento.appendChild(nuevoTexto);
        //     sidebar.insertBefore(nuevoElemento, sidebar.childNodes[1]);
        // }

        // //** Remover Nodos */
        // var primerPost = document.querySelector('main article');
        // console.log(primerPost);
        // primerPost.parentNode.removeChild(primerPost);

        // var enlaces = document.querySelector('#navegacion nav ul li a');
        // console.log(enlaces);
        // enlaces.parentNode.removeChild(enlaces);

        // var enlaces = document.querySelectorAll('#navegacion nav ul li a')[9];
        // console.log(enlaces);
        // enlaces.parentNode.removeChild(enlaces);

        // var viejoNodo = document.querySelector('main h2');
        // var nuevoNodo = document.querySelector('footer h2');
        // viejoNodo.parentNode.replaceChild(nuevoNodo, viejoNodo);

        // // reemplazar nodo
        // var nuevoTitulo = document.createElement('h2');
        // var nuevoTexto = document.createTextNode('Hola Mundo');
        // nuevoTitulo.appendChild(nuevoTexto);

        // var viejoNodo = document.querySelector('main h2');
        // viejoNodo.parentNode.replaceChild(nuevoTitulo, viejoNodo);


    });
})();

console.log('3');