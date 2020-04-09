import Ajv from 'ajv';

export default abstract class PayloadWrapper<T> {
  private readonly payload: T;

  constructor(payload: T) {
    this.payload = payload;
  }

  abstract isValid(): boolean;
  abstract getErrors(): Ajv.ErrorObject[]|null|undefined;
  getPayload() {
    return this.payload;
  }
}
