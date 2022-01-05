import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AppHttpClient } from '../http/app-http-client';
import { BreedDetail } from '../models/breed-detail';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  constructor(private http: AppHttpClient) {}

  breedPicture(breed: string, subBreed?: string, saveCache = false): Observable<string> {
    const subBreedPath = subBreed ? `/${subBreed}` : '';
    const headers = saveCache ? { 'use-cache': 'true' } : undefined;
    return this.http.get(`breed/${breed}${subBreedPath}/images/random`, { responseRef: String, headers: headers });
  }

  breedPictures(breed: string, subBreed?: string, size: number = 50): Observable<string[]> {
    const subBreedPath = subBreed ? `/${subBreed}` : '';
    return this.http.get(`breed/${breed}${subBreedPath}/images/random/${size}`, { responseRef: String });
  }

  breedDetails(breed: string, subBreed?: string): Observable<BreedDetail> {
    const subBreedPath = subBreed ? `/${subBreed}` : '';
    return this.http.get<BreedDetail, BreedDetail>(`breed/${breed}${subBreedPath}`, { responseRef: BreedDetail }).pipe(
      catchError((error): Observable<BreedDetail> => {
        const details = new BreedDetail();
        details.info = error.error.message;
        return of(details);
      }),
    );
  }
}
