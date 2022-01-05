import { Component, OnDestroy } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionStorageService } from '@app/core/storage/session-storage.service';
import { map, of, Subject, switchMap, takeUntil } from 'rxjs';
import { BsDogDetailComponent, BsDogDetailData } from './components/bs-dog-detail/bs-dog-detail.component';
import { ConfirmActionDialogComponent } from './components/confirm-action-dialog/confirm-action-dialog.component';
import { DogBreedItem } from './models/dog-breed-item';

@Component({
  selector: 'app-dog-breeds',
  templateUrl: './dog-breeds.component.html',
  styleUrls: ['./dog-breeds.component.scss'],
})
export class DogBreedsComponent implements OnDestroy {
  mainBreedSelected?: DogBreedItem;

  private readonly destroy$ = new Subject();
  private bottomSheetRef?: MatBottomSheetRef<BsDogDetailComponent>;
  private dialogRef?: MatDialogRef<ConfirmActionDialogComponent>;

  constructor(private session: SessionStorageService, private bottomSheet: MatBottomSheet, private dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    if (this.bottomSheetRef) {
      this.bottomSheetRef.dismiss();
    }
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  selectBreed(selected: DogBreedItem) {
    this.mainBreedSelected = selected;
    if (!selected.subBreeds?.length) {
      this.showDogDetail(selected.name);
    }
  }

  selectSubBreed(subBreed: string) {
    this.showDogDetail(this.mainBreedSelected!.name, subBreed);
  }

  showDogDetail(name: string, subBreed?: string) {
    const data: BsDogDetailData = { name, subBreed };
    this.bottomSheetRef = this.bottomSheet.open(BsDogDetailComponent, { data, panelClass: 'full-size' });
    this.bottomSheetRef
      .afterDismissed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((favorite: BsDogDetailData | undefined) => {
          if (!favorite || !this.session.hasFavorite) {
            return of(favorite);
          }

          this.dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
            autoFocus: true,
            closeOnNavigation: true,
            maxWidth: '550px',
            width: '90%',
            minWidth: '300px',
          });
          return this.dialogRef.afterClosed().pipe(map((confirm) => (confirm ? favorite : undefined)));
        }),
      )
      .subscribe((favorite: BsDogDetailData | undefined) => {
        if (favorite) {
          this.session.setFavorite(favorite);
        }
      });
  }

  trackByBreed(index: number, breed: DogBreedItem): string | undefined {
    return breed.name; // unique id corresponding to the item
  }

  trackBySkeleton(index: number): number {
    return index; // unique id corresponding to the item
  }
}
