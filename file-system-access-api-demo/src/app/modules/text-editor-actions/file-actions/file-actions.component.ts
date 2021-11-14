import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { OpenDirectoryWrapperService } from '@services/file-system-access-wrapper/directory-picker.service';
import { DirectoryEntry } from '@modules/text-editor-actions/types';

@Component({
  selector: 'fsa-file-actions',
  templateUrl: './file-actions.component.html',
  styleUrls: ['./file-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileActionsComponent {
  @Output() folderEntries = new EventEmitter<DirectoryEntry[]>();

  constructor(
    readonly openDirectoryWrapperService: OpenDirectoryWrapperService
  ) {}

  async handleDirectoryOpen() {
    const dirHandle =
      await this.openDirectoryWrapperService.openDirectoryPicker();
    const entries: DirectoryEntry[] = [];

    for await (const entry of dirHandle.entries()) {
      entries.push(entry);
    }

    this.folderEntries.emit(entries);
  }
}
