import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { canNotActivateGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [canNotActivateGuard],
  },
  {
    path: 'hero',
    loadChildren: () => import('./hero/hero.module').then((m) => m.HeroModule),
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard],
  },
  {
    path: '',
    redirectTo: 'hero',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
