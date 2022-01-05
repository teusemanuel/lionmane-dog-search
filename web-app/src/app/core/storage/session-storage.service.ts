import { Injectable } from '@angular/core';
import { StorageService } from '@app/core/storage/storage.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { FavoriteBreed } from '../models/favorite-breed';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  // store the URL so we can redirect after logging in
  private readonly favorite$: BehaviorSubject<FavoriteBreed | undefined> = new BehaviorSubject<FavoriteBreed | undefined>(undefined);

  constructor(private storageService: StorageService) {
    const favorite = this.getFavotite();
    this.favorite$.next(favorite);
  }

  get favoriteDog(): Subject<FavoriteBreed | undefined> {
    return this.favorite$;
  }

  get hasFavorite(): boolean {
    const favorite = this.storageService.getFavorite();
    return !!favorite;
  }

  // FUNCTIONS
  /////////////////
  setFavorite(favorite: FavoriteBreed): void {
    this.storageService.setFavorite(favorite);
    this.favorite$.next(favorite);
  }

  getFavotite(): FavoriteBreed | undefined {
    if (!this.hasFavorite) {
      return;
    }

    return this.storageService.getFavorite();
  }

  removeFavorite(): void {
    this.storageService.clearFavorite();
    this.favorite$.next(undefined);
  }
}
