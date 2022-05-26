import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent {

  @Input() personajes: Personaje[] = []
  @Input() nuevo: Personaje = {
    nombre: '',
    poder: 0
  }

  agregar = () => {
    if (this.nuevo.nombre.trim().length === 0) { return }
    const nuevoPersonaje = this.nuevo
    this.personajes.push(nuevoPersonaje)
    this.nuevo = {
      nombre: '',
      poder: 0,
    }
  }

}
