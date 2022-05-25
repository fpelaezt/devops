
interface Direccion {
    calle: string
    ciudad: string
    pais: string
}

interface SuperHeroe {
    nombre: string
    edad: number
    direccion: Direccion
    mostrarDireccion: () => string
}
const superHeroe: SuperHeroe = {
    nombre: 'Spiderman',
    edad: 30,
    direccion: {
        calle: 'Main St',
        ciudad: 'NY',
        pais: 'USA'
    },
    mostrarDireccion () {
        return  `${this.nombre}, ${this.direccion.calle}, ${this.direccion.ciudad}, ${this.direccion.pais}`
    }
}

const direccion = superHeroe.mostrarDireccion()

console.log(direccion)

console.log(superHeroe.direccion.calle.length)