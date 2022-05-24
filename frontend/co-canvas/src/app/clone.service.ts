import { Injectable } from '@angular/core';
import * as clone from 'clone';

@Injectable()
export class CloneService {

  constructor() { }

  deepClone<T>(value: T): T {
    return clone<T>(value);
  }
}