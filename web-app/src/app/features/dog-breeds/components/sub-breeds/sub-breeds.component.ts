import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FavoriteBreed } from '@app/core/models/favorite-breed';
import { BreedService } from '@app/core/services/breed.service';
import { BreedsService } from '@app/core/services/breeds.service';
import { SessionStorageService } from '@app/core/storage/session-storage.service';
import { fadeOutOnLeaveAnimation } from 'angular-animations';
import { Subject, takeUntil } from 'rxjs';
import { DogBreedItem } from '../../models/dog-breed-item';

@Component({
  selector: 'app-sub-breeds',
  templateUrl: './sub-breeds.component.html',
  styleUrls: ['./sub-breeds.component.scss'],
  animations: [fadeOutOnLeaveAnimation({ duration: 275 })],
})
export class SubBreedsComponent implements OnInit, OnDestroy {
  @Input() mainBreed: DogBreedItem | undefined;
  @Output() clearSelection: EventEmitter<void> = new EventEmitter();
  @Output() selectSubBreed: EventEmitter<string> = new EventEmitter();

  subBreedList?: DogBreedItem[];
  favorite?: FavoriteBreed;

  readonly listSkeleton = Array.from({ length: 22 }, (_, index) => index);
  private readonly destroy$ = new Subject();

  constructor(private breedsService: BreedsService, private breedService: BreedService, private session: SessionStorageService) {}

  ngOnInit(): void {
    this.favorite = this.session.getFavotite();
    this.subBreedList = this.mainBreed?.subBreeds?.map((key) => ({ name: key, picture: this.breedService.breedPicture(this.mainBreed!.name, key, true) }));

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
