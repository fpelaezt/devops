
function sumar(a: number, b: number): number {
    return a + b
}

// const resultado = sumar('Fernando', 'Pelaez')
// console.log(resultado)


const resultado2 = sumar(5, 2)
console.log(resultado2)

const sumarFlecha = (a: number, b: number): number => {
    return a + b
}

console.log(sumarFlecha(11, 44))

const multiplicar = (a: number, b?: number, base: number = 2): number => {
    return a * base
}

console.log(multiplicar(5, 0, 10))

interface PersonajeLOR {
    nombre: string
    pv: number
    mostarPv: () => void
}

const curar = (personaje: PersonajeLOR, percent: number): void => {
    personaje.pv += percent
}

const Frodo: PersonajeLOR = {
    nombre: 'Frodo',
    pv: 50,
    mostarPv() {
        console.log('Puntos de vida:', this.pv)
    }
}

curar(Frodo, 25)
Frodo.mostarPv()
