import { Component } from '@angular/core';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorViewComponent {
  readonly currentFolderEntries$: BehaviorSubject<DirectoryEntry[]> = new BehaviorSubject<DirectoryEntry[]>([]);

  handleFolderEntries(dirEntries: DirectoryEntry[]) {
    this.currentFolderEntries$.next(dirEntries);
  }
}
