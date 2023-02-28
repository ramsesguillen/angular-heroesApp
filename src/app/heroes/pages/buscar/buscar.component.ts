import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe(heroes => this.heroes = heroes);
  }

  optionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const heroe: Heroe = event.option.value;
    if (!heroe) {
      this.heroeSeleccionado = undefined;
      return;
    }
    this.termino = heroe.superhero;
    this.heroesService.getHeroe(heroe.id!)
    .subscribe(heroe => this.heroeSeleccionado = heroe);
  }
}
