import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AppHttpClient } from '../http/app-http-client';
import { Breed } from '../models/breed';
import { BreedDTO } from '../models/dto/breed-dto';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class BreedsService {
  constructor(private http: AppHttpClient, private storage: StorageService) {}

  getBreed(): Observable<Breed> {
    const breed = this.storage.getFavorite();
    let obs$: Observable<Breed>;

    if (breed) {
      return of({ name: breed.name, subBreed: breed.subBreed });
    } else {
      return this.http.get('breeds/list/all/random', { responseRef: BreedDTO }).pipe(
        map((result: any) => new Map(Object.entries(result))),
        map((result) => {
          const entry: [string, string[]] = result.entries().next().value;
          return { name: entry[0], subBreed: entry[1].length > 0 ? entry[1][0] : undefined };
        }),
      );
    }
  }

  randonBreed(): Observable<BreedDTO> {
    return this.http.get('breeds/list/all/random', { responseRef: BreedDTO });
  }

  breeds(): Observable<BreedDTO> {
    return this.http.get('breeds/list/all', { responseRef: BreedDTO });
  }
}
