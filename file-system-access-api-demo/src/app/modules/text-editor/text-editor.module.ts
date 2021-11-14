import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [TextEditorComponent],
  exports: [TextEditorComponent],
  imports: [CommonModule, MatInputModule],
})
export class TextEditorModule {}
