import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {

  nuevo: Personaje = {
    nombre: 'Trunks',
    poder: 7000,
  }

  constructor () {}

  // get personajes(): Personaje[] {
  //   return this.dbzService.personajes
  // }

}
