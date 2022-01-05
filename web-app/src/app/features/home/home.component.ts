import { Component, OnInit } from '@angular/core';
import { Breed } from '@app/core/models/breed';
import { BreedsService } from '@app/core/services/breeds.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  breed$?: Observable<Breed>;
  gallerySkeleton = Array.from({ length: 10 }, (_, index) => index);
  constructor(private breedsService: BreedsService) {}

  ngOnInit(): void {
    this.breed$ = this.breedsService.getBreed();
  }
}
