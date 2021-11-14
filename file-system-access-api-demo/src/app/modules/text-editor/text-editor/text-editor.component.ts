import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'fsa-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent implements OnDestroy {
  @Input()
  set content(content: string | null) {
    this.contentControl.patchValue(content, { emitEvent: false });
  }

  @Output() changedContent = new EventEmitter<string>();

  readonly contentControl = new FormControl('');

  readonly changes$ = this.contentControl.valueChanges.pipe(
    distinctUntilChanged(),
    tap((value: string) => {
      console.log(value);
      this.changedContent.emit(value)
    })
  ).subscribe();

  ngOnDestroy(): void {
    this.changes$.unsubscribe();
  }
}
