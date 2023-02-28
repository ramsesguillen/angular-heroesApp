import { Component, Input } from '@angular/core';

import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-targeta',
  templateUrl: './heroe-targeta.component.html',
  styles: [`
      mat-card {
        margin-top: 20px;
      }
    `
  ]
})
export class HeroeTargetaComponent {
  @Input() heroe!: Heroe;
}
