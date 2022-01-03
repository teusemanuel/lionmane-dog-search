import { Injectable } from '@angular/core';
import { StorageAlternativeService } from '@app/core/storage/storage-alternative.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  static readonly STORAGE_FAVORITE = 'STORAGE_FAVORITE';

  private storage: Storage | StorageAlternativeService = localStorage;

  constructor(storageAlternativeService: StorageAlternativeService) {
    if (!this.isLocalStorageSupported()) {
      this.storage = storageAlternativeService;
    }
  }

  // FUNCTIONS FOR USER
  /////////////////
  setFavorite(favorite: any): void {
    if (!this.isLocalStorageSupported()) {
      return;
    }

    this.storage.setItem(StorageService.STORAGE_FAVORITE, favorite);
  }

  getFavorite(): any {
    const favorite = this.storage.getItem(StorageService.STORAGE_FAVORITE);

    return favorite;
  }

  clearFavorite(): any {
    const favorite = this.storage.removeItem(StorageService.STORAGE_FAVORITE);

    return favorite;
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
    } catch (error) { }

    return false;
  }
}
