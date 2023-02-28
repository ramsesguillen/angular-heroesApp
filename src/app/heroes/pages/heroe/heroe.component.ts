import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent {

  heroe!: Heroe;
  constructor(
    private route: ActivatedRoute,
    private heroeService: HeroesService,
    private router: Router
  ) {}


  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    this.route.params.
    pipe(
        switchMap(({ id }) => {
          return this.heroeService.getHeroe(id)
        })
    ).
    subscribe(heroe => {
      this.heroe = heroe;
    });
  }

  regresar() {
    this.router.navigate(['/heroes/listado'])
  }
}
