import { Observable } from 'rxjs';

export class Breed {
  name!: string;
  subBreed?: string;
  picture?: Observable<string>;
  pictures?: Observable<string[]>;
  details?: Observable<any>;
}
