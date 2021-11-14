import { Injectable } from '@angular/core';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { FileSystemHandle, TreeFile } from '../types';

@Injectable()
export class HandleFileHandlesService {
  mapToFileTree(dirEntries: DirectoryEntry[]): Promise<FileSystemHandle>[] {
    const result = [];

    for (const entry of dirEntries) {
      result.push(this.handleDirHandle(entry));
    }

    return result;
  }

  setIsCollapsed(isCollapsed: boolean, dirId: string, files: TreeFile[]) {
    const filesArrayCopy = Array.from(files);

    for (const file of filesArrayCopy) {
      if (file.id === dirId && file.fileHandles) {
        file.collapsed = isCollapsed;
      }
    }

    return filesArrayCopy;
  }

  private async handleDirHandle(
    dirHandle: DirectoryEntry,
    prevResult?: any
  ): Promise<FileSystemHandle> {
    // @ts-ignore
    const isDirectory = dirHandle[1]?.constructor === FileSystemDirectoryHandle;
    let result = { id: dirHandle[2], path: '', name: dirHandle[0] };

    if (isDirectory) {
      const subResult = [];
      for await (const entry of dirHandle[1].entries()) {
        subResult.push(await this.handleDirHandle(entry));
      }

      return Promise.resolve({
        id: `${dirHandle.toString()}-${Math.random() * 10e5}`,
        path: '',
        name: dirHandle[0],
        fileHandles: subResult,
      });
    } else {
      return Promise.resolve(result);
    }
  }
}
