import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CardheroComponent } from './components/cardhero/cardhero.component';
import { HeroRoutingModule } from './hero-routing.module';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { HeroLayoutPageComponent } from './pages/hero-layout-page/hero-layout-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    HeroPageComponent,
    ListPageComponent,
    CreatePageComponent,
    SearchPageComponent,
    HeroLayoutPageComponent,
    CardheroComponent,
    HeroImagePipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeroRoutingModule,
    ReactiveFormsModule,
  ],
})
export class HeroModule {}
