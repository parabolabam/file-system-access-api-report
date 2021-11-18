import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class OpenDirectoryWrapperService {
  readonly globalThis: any = this.doc?.defaultView;

  constructor(@Inject(DOCUMENT) private readonly doc: Document) {}

  async getNewFileHandle(opts = {}) {
    return await this.globalThis?.showSaveFilePicker(opts);
  }

  async openDirectoryPicker() {
    return await this.globalThis?.showDirectoryPicker();
  }

  async openFile() {
    return await this.globalThis?.showOpenFilePicker()[0];
  }

  async getFile(fileHandle: any) {
    const perms = await fileHandle.queryPermission({ mode: 'readwrite' });

    const reader = new FileReader();

    return await fileHandle.getFile();
  }

  async getFileText(fileHandle: any) {
    const fileText = await this.getFile(fileHandle);

    return fileText.text();
  }

  async writeToFile(content: string, filehandle: any) {
    const writableStream = await filehandle.createWritable();

    await writableStream.write(content);

    return await writableStream.close();
  }

  async saveAs(content: string) {
    const fileHande = await this.getNewFileHandle();
    await this.writeToFile(content, fileHande);
  }
}
