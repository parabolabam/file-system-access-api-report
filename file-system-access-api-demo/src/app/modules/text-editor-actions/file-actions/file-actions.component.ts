import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { OpenDirectoryWrapperService } from '@services/file-system-access-wrapper/directory-picker.service';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { UidService } from '@services/uid/uid.service';

@Component({
  selector: 'fsa-file-actions',
  templateUrl: './file-actions.component.html',
  styleUrls: ['./file-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UidService],
})
export class FileActionsComponent {
  @Output() folderEntries = new EventEmitter<DirectoryEntry[]>();
  @Output() saveChanges = new EventEmitter();

  constructor(
    readonly openDirectoryWrapperService: OpenDirectoryWrapperService,
    private readonly uidService: UidService
  ) {}

  async handleDirectoryOpen() {
    const dirHandle: { entries(): [string, any] } =
      await this.openDirectoryWrapperService.openDirectoryPicker();
    const entries: DirectoryEntry[] = [];

    for await (const entry of dirHandle.entries()) {
      entries.push([entry[0], entry[1], this.uidService.getUid()]);
    }

    this.folderEntries.emit(entries);
  }
}
