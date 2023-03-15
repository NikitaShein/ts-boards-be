import { Injectable } from '@nestjs/common';

@Injectable()
export default class Helpers {
  public randomInteger(min: number, max: number): number {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
