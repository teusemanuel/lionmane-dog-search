import { Observable } from 'rxjs';

export class DogBreedItem {
  name!: string;
  picture!: Observable<string>;
  subBreeds?: string[];
}
