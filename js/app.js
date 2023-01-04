//1.PRIMEROS PASOS

//VARIABLES QUE NECESITO

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articuloCarrito = []

//CARGAR EVENTOS
cargarEventListener()
function cargarEventListener() {
    //cuando agregas un curso presinando el boton de 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso)


     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     //vaciar el carrito
     vaciarCarritoBtn.addEventListener('click' , () => {
        articuloCarrito = [] //reseteamos el carrito

        limpiarHTML()
     })
}

//FUNCIONES

function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        //console.log(e.target)
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)


    }
}



//2.LEER LOS DATOS DEL CURSO QUE SELLECIONAMOS
//Lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso) {
    // console.log(curso)

    //crear un objeto con la informacion del contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Verificar si un elemnto existe en el carrito

    const existe = articuloCarrito.some(curso => curso.id === infoCurso.id)

    if (existe) {
        //Actualizamos la cantidad
        const cursos = articuloCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso; //retorna el onjeto actualizado

            }
            else {
                return curso; //retornar los objetos que no son los duplicados
            }
        })
        articuloCarrito = [...cursos]
    }
    else {
        //Agregar elementos al arreglo de carrito que esta en la variable let articuloCarrito
        articuloCarrito = [...articuloCarrito, infoCurso]
    }

console.log(articuloCarrito)
    carritoHTML()
}
//ELIMINAR CURSOS DEL CARRITO SI YA NO LOS QUIERO COMPRAR
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        // e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute('data-id')

        //elimina del arreglo de articuloCarrito por el data-id
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId)
        // console.log(articuloCarrito)

        console.log(eliminarCurso)
        carritoHTML()
    }

}

//3.Muestra los articulos de tu compra en el thml

function carritoHTML() {

    limpiarHTML()
    //Recorre el carrito y genera el html

    articuloCarrito.forEach(curso => {
        //DESTRUCTURING
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
            <td> <img src= "${imagen}" width = "100"> </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
        `
        contenedorCarrito.appendChild(row)
    })
}

//Eliminar los cursos del html

function limpiarHTML() {
    //FORMA LENTA
    // contenedorCarrito.innerHTML = ''

    //FORMA MAS RAPIDA

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}