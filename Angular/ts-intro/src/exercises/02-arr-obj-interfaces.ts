
let habilidades:string[] = ['bash', 'counter', 'healing']

habilidades.push('rake')

// Interface

interface Personaje {
    nombre: string
    hp: number
    habilidades: string[]
    city?: string;
}
const personaje: Personaje = {
    nombre: 'Strider',
    hp: 100,
    habilidades: ['bash', 'counter', 'healing']
}

personaje.city = 'New York'

console.table(personaje)