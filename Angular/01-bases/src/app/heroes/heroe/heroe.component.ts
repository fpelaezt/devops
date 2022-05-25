import { Component } from "@angular/core";

@Component({
    selector: 'app-hero',
    templateUrl: 'heroe.component.html',
}
)

export class HeroeComponent {
    nombre: string = 'Ironman'
    edad: number = 45
    nombreReal: string = 'Tony Stark'

    get nombreCapitalizado() {
        return this.nombreReal.toUpperCase()
    }

    obtenerNombre = (): string => {
        return `El nombre del Heroe es: ${this.nombreReal}`
    }

    cambiarNombre = (): void => {
        this.nombre = 'Spiderman'
    }

    cambiarEdad = (): void => {
        this.edad = 23
    }
}