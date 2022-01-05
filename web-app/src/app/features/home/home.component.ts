import { Component, OnInit } from '@angular/core';
import { Breed } from '@app/core/models/breed';
import { BreedService } from '@app/core/services/breed.service';
import { BreedsService } from '@app/core/services/breeds.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  breed$?: Observable<Breed>;
  gallerySkeleton = Array.from({ length: 10 }, (_, index) => index);
  constructor(private breedsService: BreedsService, private breedService: BreedService) {}

  ngOnInit(): void {
    this.breed$ = this.breedsService.getBreed().pipe(
      map((breed) => {
        breed.picture = this.breedService.breedPicture(breed.name, breed.subBreed);
        breed.pictures = this.breedService.breedPictures(breed.name, breed.subBreed);
        breed.details = this.breedService.breedDetails(breed.name, breed.subBreed);
        return breed;
      }),
    );
  }
}
