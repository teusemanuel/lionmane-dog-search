import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FavoriteBreed } from '@app/core/models/favorite-breed';
import { BreedService } from '@app/core/services/breed.service';
import { BreedsService } from '@app/core/services/breeds.service';
import { SessionStorageService } from '@app/core/storage/session-storage.service';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { DogBreedItem } from '../../models/dog-breed-item';

@Component({
  selector: 'app-main-breeds',
  templateUrl: './main-breeds.component.html',
  styleUrls: ['./main-breeds.component.scss'],
  animations: [fadeOutOnLeaveAnimation({ duration: 275 })],
})
export class MainBreedsComponent implements OnInit, OnDestroy {
  @Output() selectBreed: EventEmitter<DogBreedItem> = new EventEmitter();

  form: FormGroup;

  breeds$?: Observable<DogBreedItem[]>;
  favorite?: FavoriteBreed;

  readonly listSkeleton = Array.from({ length: 22 }, (_, index) => index);
  private readonly destroy$ = new Subject();

  constructor(private fb: FormBuilder, private breedsService: BreedsService, private breedService: BreedService, private session: SessionStorageService) {
    this.form = this.fb.group({
      search: '',
    });
  }

  ngOnInit(): void {
    this.favorite = this.session.getFavotite();
    this.breeds$ = this.breedsService.breeds().pipe(
      map((dto) => {
        const keys = Object.keys(dto);
        return keys.map<DogBreedItem>((key) => ({ name: key, picture: this.breedService.breedPicture(key, undefined, true), subBreeds: dto[key] }));
      }),
    );

    this.session.favoriteDog.pipe(takeUntil(this.destroy$)).subscribe({
      next: (favorite) => {
        this.favorite = favorite;
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  trackByBreed(index: number, breed: DogBreedItem): string | undefined {
    return breed.name; // unique id corresponding to the item
  }

  trackBySkeleton(index: number): number {
    return index; // unique id corresponding to the item
  }
}
