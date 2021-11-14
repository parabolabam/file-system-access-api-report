import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HandleFileHandlesService } from '@modules/files-tree/services/handle-file-handles.service';
import { DirectoryEntry } from '@modules/text-editor-actions/types';
import { FileSystemHandle, TreeFile } from '../types';

@Component({
  selector: 'fsa-files-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HandleFileHandlesService],
})
export class TreeComponent implements OnChanges {
  readonly files$ = new BehaviorSubject<TreeFile[]>([]);

  @Output() editFile = new EventEmitter<FileSystemHandle>();

  @Input() files: DirectoryEntry[] | null = [];
  @Input() subTreeFiles: FileSystemHandle[] = [];
  @Input() isSubtree: boolean = false;

  constructor(
    private readonly handleFileHandlesService: HandleFileHandlesService,
    private readonly cdr: ChangeDetectorRef
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

  onClick(file: TreeFile) {
    if (file.fileHandles) {
      this.handleFileHandlesService.setIsCollapsed(
        !file.collapsed,
        file.id,
        this.files$.getValue()
      );
      this.cdr.markForCheck();
    } else {
      this.openFile(file);
    }
  }

  trackBy(_: number, file: FileSystemHandle) {
    return file.id;
  }

  private openFile(file: TreeFile) {
    this.editFile.emit(file.handle);
  }
}
