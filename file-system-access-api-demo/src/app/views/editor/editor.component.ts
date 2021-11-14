import { Component } from '@angular/core';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { OpenDirectoryWrapperService } from '@services/file-system-access-wrapper/directory-picker.service';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorViewComponent {
  readonly currentFolderEntries$: BehaviorSubject<DirectoryEntry[]> =
    new BehaviorSubject<DirectoryEntry[]>([]);

  readonly changedContent$ = new BehaviorSubject<string | null>(null);

  readonly saveChanges$ = new Subject<void>();

  readonly fileContent$ = new BehaviorSubject<string>('');

  readonly currentFileHandle$ = new BehaviorSubject<any>('');

  readonly saveChangesSubscription$ = this.saveChanges$
    .pipe(
      tap(() =>
        this.saveChanges(
          this.fileContent$.getValue(),
          this.currentFileHandle$.getValue()
        )
      )
    )
    .subscribe();

  constructor(
    private readonly openDirectoryWrapperService: OpenDirectoryWrapperService
  ) {}

  handleFolderEntries(dirEntries: DirectoryEntry[]) {
    this.currentFolderEntries$.next(dirEntries);
  }

  async onEditFile(fileHandle: any) {
    this.currentFileHandle$.next(fileHandle);
    this.fileContent$.next(
      await this.openDirectoryWrapperService.getFileText(fileHandle)
    );
  }

  private async saveChanges(changes: string, fileHandle: any) {
    await this.openDirectoryWrapperService.writeToFile(changes, fileHandle);
  }
}
