import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent {

  heroes: Heroe[] = [];

  constructor(private heroresService: HeroesService) {}

  ngOnInit(): void {
    this.heroresService.getHeroes()
    .subscribe(heroes => this.heroes = heroes)
  }
}
