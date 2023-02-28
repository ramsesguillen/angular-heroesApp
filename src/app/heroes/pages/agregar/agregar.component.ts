import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';

import { Component } from '@angular/core';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class AgregarComponent {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    al_img: ''
  };

  constructor(
    private route: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    if (!this.router.url.includes('editar')) return;
      this.route.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroe(id))
      )
      .subscribe((heroe) => this.heroe = heroe);
  }

  guardar() {
    if (!this.heroe.superhero.trim()) return;

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(resp => {
          this.mostrarSnackbar('Registro actualizado.')
        })
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnackbar('Registro creado.')
          this.router.navigate(['/heroes/editar', heroe.id])
        })
    }
  }


  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed()
    .subscribe((result) => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe(resp => {
            this.router.navigate(['/heroes'])
          })
      }
    });
  }

  mostrarSnackbar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok!', {
      duration: 2500,
    })
  }
}
