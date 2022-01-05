import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule) },
  { path: 'dog-breeds', loadChildren: () => import('./features/dog-breeds/dog-breeds.module').then((m) => m.DogBreedsModule) },
  { path: 'not-found', loadChildren: () => import('@app/features/not-found/not-found.module').then((m) => m.NotFoundModule) },

  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // not found
  { path: '**', pathMatch: 'full', loadChildren: () => import('@app/features/not-found/not-found.module').then((m) => m.NotFoundModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
