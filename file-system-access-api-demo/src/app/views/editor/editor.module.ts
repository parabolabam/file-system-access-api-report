import { NgModule } from '@angular/core';
import { EditorViewComponent } from '@views/editor/editor.component';
import { FilesTreeModule } from '@modules/files-tree/files-tree.module';
import { TextEditorModule } from '@modules/text-editor/text-editor.module';
import { DefaultLayoutModule } from 'app/layouts/default/default.module';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from '@views/editor/editor.routing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TextEditorActionsModule } from '@modules/text-editor-actions/text-editor-actions.module';

@NgModule({
  imports: [
    EditorRoutingModule,
    CommonModule,
    TextEditorModule,
    FilesTreeModule,
    DefaultLayoutModule,
    MatToolbarModule,
    MatIconModule,
    TextEditorActionsModule,
  ],
  declarations: [EditorViewComponent],
})
export class EditorModule {}
