import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  styleUrls: ['./not-found.component.scss'],
  template: `
    <mat-card>
      <mat-card-content>
        <div class="container-404" fxLayout="column">
          <a routerLink="/">
            <img class="app-logo" src="assets/img/dog-404.gif" />
          </a>
          <div>
            <h2 class="mat-headline app-gray-800">The page you are looking for is not found.</h2>
            <p class="mat-body-1 app-light-text-color">The page you are looking for may have been removed, had its name changed, or is temporarily unavailable.</p>
            <button routerLink="/" class="rounded" color="primary" mat-stroked-button>
              <mat-icon matPrefix>pets</mat-icon>
              Home
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class NotFoundComponent {}
