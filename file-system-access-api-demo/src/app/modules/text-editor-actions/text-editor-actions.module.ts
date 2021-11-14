import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions/actions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FileActionsComponent } from '@modules/text-editor-actions/file-actions/file-actions.component';
import { FileSystemApiWrapperServiceModule } from '@services/file-system-access-wrapper/file-system-api-wrapper.module';

@NgModule({
  declarations: [ActionsComponent, FileActionsComponent],
  exports: [ActionsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    FileSystemApiWrapperServiceModule,
  ],
})
export class TextEditorActionsModule {}
