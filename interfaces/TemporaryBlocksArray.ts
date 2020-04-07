import { TemporaryBlocksArray } from '../types/TemporaryBlocksArray';
import * as valiadtors from '../json-types/TemporaryBlocksArray';

export class TemporaryBlocksArrayInterface {
  private readonly payload: TemporaryBlocksArray

  constructor(payload: TemporaryBlocksArray) {
    this.payload = payload;
  }

  validate(): boolean {
    return valiadtors.validateTemporaryBlocksArray(this.payload);
  }
}