import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./main-page/main-page.component').then((x) => x.MainPageComponent),
  },
  {
    path: 'o-nas',
    loadComponent: () => import('./about-page/about-page.component').then((x) => x.AboutPageComponent)
  },
  {
    path: 'oferta',
    loadComponent: () => import('./offer-page/offer-page.component').then((x) => x.OfferPageComponent)
  },
  {
    path: 'galeria',
    loadComponent: () => import('./gallery-page/gallery-page.component').then((x) => x.GalleryPageComponent)
  },
  {
    path: 'kontakt',
    loadComponent: () => import('./contact-page/contact-page.component').then((x) => x.ContactPageComponent)
  },
  {
    path: 'regulamin',
    loadComponent: () => import('./rules-page/rules-page.component').then((x) => x.RulesPageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
