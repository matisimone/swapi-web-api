import { Route } from '@angular/router';
import { PlanetsComponent } from './pages/planets/planets.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Route[] = [
  { path: 'planets', component: PlanetsComponent, pathMatch: 'full' },
  { path: 'planets/:id', loadComponent: () =>  import('./pages/planet/planet.component').then(c => c.PlanetComponent) },
  { path: '', redirectTo: 'planets', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
