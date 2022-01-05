export class Outcome<T> {
  status: 'success' | 'error' = 'success';

  result?: T;

  static Deserialize<E>(jsonResult: any = null, type: new () => E): Outcome<E> {
    const outcome = new Outcome<E>();
    outcome.status = jsonResult?.status;
    outcome.result = jsonResult?.message;

    return outcome;
  }

  hasSuccess(): boolean {
    return this.status == 'success';
  }

  hasError(): boolean {
    return this.status != 'success';
  }
}
