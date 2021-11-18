import { Injectable } from '@angular/core';

@Injectable()
export class UidService {

  getUid(root?: string) {
    return `${root}-${Math.random() * 10e5}`
  }
}
