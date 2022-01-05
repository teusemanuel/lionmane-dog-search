import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { ConsoleStyle, LogLevel } from '@src/console.style';
import { environment } from '@src/environments/environment';
import { BUILD_VERSION } from '@src/environments/version';
import { distinctUntilChanged, filter, map, Observable, shareReplay, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProgressSpinnerComponent } from './core/componens/progress-spinner/progress-spinner.component';
import { LoaderService } from './core/services/ui/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild('drawer') viewDrawer?: MatSidenav;

  title = '';
  version = BUILD_VERSION;
  loadingRoute = false;
  isFirstloading = true;
  loadingRequest = false;
  progressOverlayRef: OverlayRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  private destroy$ = new Subject();

  private requestTimeout: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private loaderService: LoaderService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private overlay: Overlay,
    private titleService: Title,
    public platform: Platform,
  ) {
    this.matIconRegistry.addSvgIcon('dog-solid', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/dog-solid.svg'));

    this.progressOverlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
      backdropClass: 'progress-spinner-overlay-backdrop',
    });

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        tap((event) => {
          if (event instanceof RouteConfigLoadStart) {
            this.loadingRoute = true;
          } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingRoute = false;
          }
          this.changeProgressSpinnerState();
        }),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        switchMap((route) => route.data),
        map((data) => {
          if (data && data['title']) {
            this.titleService.setTitle(`${data['title']} - LionMane Dog Search`);
            this.title = data['title'];
          } else {
            this.title = 'LionMane Dog Search';
            this.titleService.setTitle('LionMane Dog Search');
          }
          this.isFirstloading = false;
        }),
      )
      .subscribe({ next: () => {} });
  }

  ngOnInit(): void {
    this.loaderService.isLoading.pipe(takeUntil(this.destroy$), distinctUntilChanged()).subscribe({
      next: (event) => {
        clearTimeout(this.requestTimeout);
        if (event) {
          this.requestTimeout = setTimeout(() => {
            this.loadingRequest = event;
            this.changeProgressSpinnerState();
          }, 350);
        } else {
          this.loadingRequest = event;
          this.changeProgressSpinnerState();
        }
      },
    });

    if (environment.production) {
      setTimeout(() => {
        ConsoleStyle.log('Warning', LogLevel.ERROR);
        ConsoleStyle.log(
          'Using this console can allow intruders to make their identity to steal information through an attack called Self-XSS.' +
            '\n Do not enter or paste codes that you do not know.',
          LogLevel.INFO,
        );
      }, 1500);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  menuClick() {
    if (this.viewDrawer?.mode == 'over') {
      this.viewDrawer.close();
    }
  }

  changeProgressSpinnerState(): void {
    if ((this.loadingRoute || this.loadingRequest) && !this.progressOverlayRef.hasAttached()) {
      const progressRef = this.progressOverlayRef.attach(new ComponentPortal(ProgressSpinnerComponent));
      progressRef.instance.isFirstloading = this.isFirstloading;
    } else if (!this.loadingRoute && !this.loadingRequest && this.progressOverlayRef.hasAttached()) {
      this.progressOverlayRef.detach();
    }
  }
}
