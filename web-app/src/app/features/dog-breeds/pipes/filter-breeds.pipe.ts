import { Pipe, PipeTransform } from '@angular/core';
import { DogBreedItem } from '../models/dog-breed-item';

@Pipe({
  name: 'filterBreeds',
})
export class FilterBreedsPipe implements PipeTransform {
  transform(breeds: DogBreedItem[] | undefined, serach: string): DogBreedItem[] | undefined {
    if (breeds && serach) {
      const filter = breeds.filter((item) => item.name?.toLowerCase()?.includes(serach.toLowerCase()));
      return filter.length ? filter : undefined;
    }
    return breeds;
  }
}
