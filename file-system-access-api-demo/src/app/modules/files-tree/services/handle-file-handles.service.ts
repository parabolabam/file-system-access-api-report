import { Injectable } from '@angular/core';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { FileSystemHandle } from '../types';

@Injectable()
export class HandleFileHandlesService {
  mapToFileTree(dirEntries: DirectoryEntry[]): Promise<FileSystemHandle>[] {
    const result = [];

    for (const entry of dirEntries) {
      result.push(this.handleDirHandle(entry));
    }

    return result;
  }

  private async handleDirHandle(
    dirHandle: DirectoryEntry,
    prevResult?: any
  ): Promise<any> {
    // @ts-ignore
    const isDirectory = dirHandle[1]?.constructor === FileSystemDirectoryHandle;
    let result = { name: dirHandle[0] };

    if (isDirectory) {
      const subResult = [];
      for await (const entry of dirHandle[1].entries()) {
        subResult.push(await this.handleDirHandle(entry));
      }

      return Promise.resolve({
        ...prevResult,
        name: dirHandle[0],
        fileHandles: subResult,
      });
    } else {
      return Promise.resolve(result);
    }
  }
}
