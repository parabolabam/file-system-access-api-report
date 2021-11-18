import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { OpenDirectoryWrapperService } from '@services/file-system-access-wrapper/directory-picker.service';
import { KeyCode } from '@services/shortcuts/keycodes';
import { ShortcutService } from '@services/shortcuts/shortcut.service';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  Subject,
  take,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [ShortcutService],
})
export class EditorViewComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();
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
          this.changedContent$.getValue() || '',
          this.currentFileHandle$.getValue()
        )
      ),
      takeUntil(this.destroy$)
    )
    .subscribe();
  readonly docTitle$ = combineLatest([
    this.currentFileHandle$,
    this.changedContent$,
  ])
    .pipe(
      filter(([handle]) => !!handle),
      tap(([fileHandle, changed]) => {
        this.doc.title = `${fileHandle.name} ${changed ? '•' : ''}`;
      }),
      takeUntil(this.destroy$)
    )
    .subscribe();

  readonly ctrlS$ = this.shortcutService
    .getsShortcut([KeyCode.ControlLeft, KeyCode.KeyS])
    .pipe(
      takeUntil(this.destroy$),
      tap(() =>
        this.saveChanges(
          this.changedContent$.getValue() || '',
          this.currentFileHandle$.getValue()
        )
      )
    )
    .subscribe();

  readonly ctrlShiftS$ = this.shortcutService
    .getsShortcut([KeyCode.ControlLeft, KeyCode.ShiftLeft, KeyCode.KeyS])
    .pipe(
      takeUntil(this.destroy$),
      tap(() =>
        this.openDirectoryWrapperService.saveAs(
          this.changedContent$.getValue() || ''
        )
      )
    )
    .subscribe();

  constructor(
    readonly openDirectoryWrapperService: OpenDirectoryWrapperService,
    private readonly shortcutService: ShortcutService,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleFolderEntries(dirEntries: DirectoryEntry[]) {
    this.currentFolderEntries$.next(dirEntries);
  }

  async onEditFile(fileHandle: any) {
    this.currentFileHandle$.next(fileHandle);
    this.fileContent$.next(
      await this.openDirectoryWrapperService.getFileText(fileHandle)
    );
  }

  async openFile() {
    const handle = await this.openDirectoryWrapperService.openFile();

    this.currentFileHandle$.next(handle);
    this.fileContent$.next(
      await this.openDirectoryWrapperService.getFileText(handle)
    );
  }

  private async saveChanges(changes: string, fileHandle: any) {
    await this.openDirectoryWrapperService.writeToFile(changes, fileHandle);

    this.changedContent$.next(null);
  }
}
