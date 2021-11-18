import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { DirectoryEntry } from '@modules/text-editor-actions/types';

@Component({
  selector: 'fsa-text-editor-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  @Output() folderEntries = new EventEmitter<DirectoryEntry[]>();
  @Output() saveChanges = new EventEmitter<void>();
  @Output() saveAs = new EventEmitter();
  @Output() openFile = new EventEmitter();
}
