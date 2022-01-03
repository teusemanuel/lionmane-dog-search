import { autoserialize, autoserializeAs, Deserialize } from 'cerialize';
export class Outcome<T> {
  @autoserialize
  status: 'success' | 'error' = 'success';

  @autoserializeAs('message')
  result?: T;

  static Deserialize<E>(jsonResult: any = null, type: new () => E): Outcome<E> {
    const outcome = new Outcome<E>();
    outcome.status = jsonResult?.status;
    const result = jsonResult?.result;
    const pageInfo = jsonResult?.pageInfo;

    if (type && (result || typeof result === 'boolean' || typeof result === 'number')) {
      outcome.result = Deserialize(result, type);
    }

    return outcome;
  }

  hasSuccess(): boolean {
    return this.status == 'success';
  }

  hasError(): boolean {
    return this.status != 'success';
  }
}
