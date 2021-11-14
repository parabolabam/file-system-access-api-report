import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HandleFileHandlesService } from '@modules/files-tree/services/handle-file-handles.service';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { FileSystemHandle } from '../types';

@Component({
  selector: 'fsa-files-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HandleFileHandlesService],
})
export class TreeComponent implements OnChanges {
  readonly files$ = new BehaviorSubject<FileSystemHandle[]>([]);
  readonly notCollapsed$ = new BehaviorSubject<boolean>(true);

  @Input() files: DirectoryEntry[] | null = [];
  @Input() subTreeFiles: FileSystemHandle[] = [];
  @Input() isSubtree: boolean = false;

  constructor(
    private readonly handleFileHandlesService: HandleFileHandlesService
  ) {}

  async ngOnChanges() {
    if (this.isSubtree) {
      this.files$.next(this.subTreeFiles);
    } else {
      this.files$.next(
        await Promise.all(
          this.handleFileHandlesService.mapToFileTree(this.files || [])
        )
      );
    }
  }

  onClick(file: FileSystemHandle) {
    if (file.fileHandles) {
      this.notCollapsed$.next(!this.notCollapsed$.getValue());
    } else {
      // TODO: implement logic of opening a file
    }
  }

  trackBy(_: number, file: FileSystemHandle) {
    return file.name;
  }
}
