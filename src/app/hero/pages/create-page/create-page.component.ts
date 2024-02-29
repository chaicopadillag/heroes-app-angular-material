import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import {
  HeroType,
  Publisher,
} from '../../interfaces/heroes-response.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styles: ``,
})
export class CreatePageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroService: HeroService,
    private activateRoute: ActivatedRoute,
    private ruter: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.ruter.url.includes('edit')) return;
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHero(id)))
      .subscribe((hero) => {
        if (!hero) {
          this.ruter.navigateByUrl('/');
        }
        this.heroForm.reset(hero as HeroType);
      });
  }

  get currentHero(): HeroType {
    return this.heroForm.value as HeroType;
  }

  submitHero() {
    if (!this.heroForm.valid) return;

    if (this.currentHero.id) {
      this.heroService.update(this.currentHero).subscribe(console.log);
    } else {
      this.heroService.create(this.currentHero).subscribe((hero) => {
        this.showMessaje(`${hero.superhero} created!`);
        this.ruter.navigate(['/hero/edit', hero.id]);
      });
    }
  }

  showMessaje(messaje: string) {
    this.snackBar.open(messaje, 'done', { duration: 2500 });
  }

  deleteHero() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((isOk) => isOk),
        switchMap((_) => this.heroService.delete(this.currentHero.id)),
        filter((isDeleted) => isDeleted)
      )
      .subscribe(() => {
        this.ruter.navigateByUrl('/hero/list');
      });
  }
}
