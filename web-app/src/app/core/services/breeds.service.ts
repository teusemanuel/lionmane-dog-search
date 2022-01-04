import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
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
      obs$ = of({ name: breed.name, subBreed: breed.subBreed });
    } else {
      obs$ = this.http.get('breeds/list/all/random', { responseRef: BreedDTO }).pipe(
        map((result: any) => new Map(Object.entries(result))),
        map((result) => {
          const entry: [string, string[]] = result.entries().next().value;
          return { name: entry[0], subBreed: entry[1].length > 0 ? entry[1][0] : undefined };
        }),
      );
    }

    return obs$.pipe(
      tap((breed) => {
        breed.picture = this.breedPicture(breed.name, breed.subBreed);
        breed.pictures = this.breedPictures(breed.name, breed.subBreed);
        breed.details = this.breedDetails(breed.name, breed.subBreed);
      }),
    );
  }

  randonBreed(): Observable<BreedDTO> {
    return this.http.get('breeds/list/all/random', { responseRef: BreedDTO });
  }

  breeds(): Observable<BreedDTO> {
    return this.http.get('breeds/list/all', { responseRef: BreedDTO });
  }

  breedPicture(breed: string, subBreed?: string): Observable<string> {
    const subBreedPath = subBreed ? `/${subBreed}` : '';
    return this.http.get(`breed/${breed}${subBreedPath}/images/random`, { responseRef: String });
  }

  breedPictures(breed: string, subBreed?: string, size: number = 50): Observable<string[]> {
    const subBreedPath = subBreed ? `/${subBreed}` : '';
    return this.http.get(`breed/${breed}${subBreedPath}/images/random/${size}`, { responseRef: String });
  }

  breedDetails(breed: string, subBreed?: string): Observable<any> {
    const subBreedPath = subBreed ? `/${subBreed}` : '';
    return this.http.get(`breed/${breed}${subBreedPath}`, { responseRef: Object }).pipe(
      catchError((error) => {
        return of(error.error.message);
      }),
    );
  }
}
