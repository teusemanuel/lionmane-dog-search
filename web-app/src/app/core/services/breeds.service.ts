import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClient } from '../http/app-http-client';

@Injectable({
  providedIn: 'root',
})
export class BreedsService {
  constructor(private http: AppHttpClient) {}

  randonBreed(): Observable<Map<string, string[]>> {
    return this.http.get('breeds/list/all/random', { responseRef: Map });
  }

  breeds(): Observable<Map<string, string[]>> {
    return this.http.get('breeds/list/all', { responseRef: Map });
  }
}
