import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextEditorComponent],
  exports: [TextEditorComponent],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
})
export class TextEditorModule {}
