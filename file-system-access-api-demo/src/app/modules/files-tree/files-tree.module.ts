import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [TreeComponent],
  exports: [TreeComponent],
  imports: [CommonModule, MatTreeModule, MatButtonModule, MatIconModule],
})
export class FilesTreeModule {}
