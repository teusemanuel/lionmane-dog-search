import { Injectable } from '@angular/core';
import { StorageAlternativeService } from '@app/core/storage/storage-alternative.service';
import { FavoriteBreed } from '../models/favorite-breed';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  static readonly STORAGE_FAVORITE_NAME = 'STORAGE_FAVORITE_NAME';
  static readonly STORAGE_FAVORITE_SUB_BREED = 'STORAGE_FAVORITE_SUB_BREED';

  private storage: Storage | StorageAlternativeService = localStorage;

  constructor(storageAlternativeService: StorageAlternativeService) {
    if (!this.isLocalStorageSupported()) {
      this.storage = storageAlternativeService;
    }
  }

  // FUNCTIONS FOR USER
  /////////////////
  setFavorite(favorite: FavoriteBreed): void {
    if (!this.isLocalStorageSupported()) {
      return;
    }

    this.storage.setItem(StorageService.STORAGE_FAVORITE_NAME, favorite.name);
    if (favorite.subBreed) {
      this.storage.setItem(StorageService.STORAGE_FAVORITE_SUB_BREED, favorite.subBreed);
    }
  }

  getFavorite(): FavoriteBreed | undefined {
    const name = this.storage.getItem(StorageService.STORAGE_FAVORITE_NAME);
    const subBreed = this.storage.getItem(StorageService.STORAGE_FAVORITE_SUB_BREED);
    if (!name && !subBreed) {
      return undefined;
    }

    return { name, subBreed };
  }

  clearFavorite(): void {
    this.storage.removeItem(StorageService.STORAGE_FAVORITE_NAME);
    this.storage.removeItem(StorageService.STORAGE_FAVORITE_SUB_BREED);
  }

  getItem(key: string): string {
    return this.storage.getItem(key);
  }

  private isLocalStorageSupported(): boolean {
    const testKey = 'test-local-storage';
    try {
      this.storage.setItem(testKey, '1');
      this.storage.removeItem(testKey);
      return true;
    } catch (error) {}

    return false;
  }
}
