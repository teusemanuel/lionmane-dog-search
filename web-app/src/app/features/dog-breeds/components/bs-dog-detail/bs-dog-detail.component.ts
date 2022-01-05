import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Breed } from '@app/core/models/breed';
import { BreedService } from '@app/core/services/breed.service';
import { SessionStorageService } from '@app/core/storage/session-storage.service';
import { rotateInOnEnterAnimation, zoomInOnEnterAnimation } from 'angular-animations';

export type BsDogDetailData = { name: string; subBreed?: string };

@Component({
  selector: 'app-bs-dog-detail',
  templateUrl: './bs-dog-detail.component.html',
  styleUrls: ['./bs-dog-detail.component.scss'],
  animations: [
    zoomInOnEnterAnimation({ anchor: 'bounceStarCircle', delay: 700 }),
    zoomInOnEnterAnimation({ anchor: 'bounceStar', delay: 800 }),
    rotateInOnEnterAnimation({ anchor: 'bounceStarRotate', delay: 1000 }),
  ],
})
export class BsDogDetailComponent {
  breed: Breed;
  isFavorite: boolean = false;
  gallerySkeleton = Array.from({ length: 10 }, (_, index) => index);
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BsDogDetailData,
    private bottomSheetRef: MatBottomSheetRef<BsDogDetailComponent>,
    private breedService: BreedService,
    private session: SessionStorageService,
  ) {
    this.breed = new Breed();
    this.breed.name = data.name;
    this.breed.subBreed = data.subBreed;
    this.breed.picture = this.breedService.breedPicture(data.name, data.subBreed, true);
    this.breed.pictures = this.breedService.breedPictures(data.name, data.subBreed);
    this.breed.details = this.breedService.breedDetails(data.name, data.subBreed);
    const favorite = this.session.getFavotite();
    this.isFavorite = (favorite && favorite.name == data.name && favorite.subBreed == data.subBreed) == true;
  }

  setFavorite() {
    this.bottomSheetRef.dismiss(this.data);
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
