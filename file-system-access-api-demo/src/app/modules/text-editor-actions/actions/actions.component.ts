import {
  Component,
  OnInit,
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
export class ActionsComponent implements OnInit {
  @Output() folderEntries = new EventEmitter<DirectoryEntry[]>();

  constructor() {}

  ngOnInit(): void {}
}
