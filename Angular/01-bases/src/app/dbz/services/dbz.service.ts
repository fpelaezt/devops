import { Injectable } from "@angular/core";
import { Personaje } from "../interfaces/dbz.interface";

@Injectable()
export class DbzService {

    private _personajes: Personaje[] = [
        {
            nombre: 'Goku',
            poder: 15000,
        },
        {
            nombre: 'Vegeta',
            poder: 6000,
        },
    ]

    get personajes(): Personaje[] {
        return [...this._personajes]
    }

    constructor () {
        console.log('servicio inicializado')
    }

    // nuevo: Personaje = {
    //     nombre: 'Trunks',
    //     poder: 7000,
    // }

    // cambiarNombre = (event: any) => {
    //     console.log(event.target.value)
    // }

    // agregarNuevoPersonaje = (argumento: Personaje) => {
    //     console.log(2+2)
    //     this.personajes.push(argumento)
    // }

    agregarPersonaje(personaje: Personaje) {
        this._personajes.push(personaje)
    }

}