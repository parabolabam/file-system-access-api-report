import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable()
export class OpenDirectoryWrapperService {
  readonly globalThis: any = this.doc?.defaultView;

  constructor(@Inject(DOCUMENT) private readonly doc: Document) {}

  async openDirectoryPicker() {
    return await this.globalThis?.showDirectoryPicker();
  }
}
