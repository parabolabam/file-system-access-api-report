import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';

@NgModule({
  declarations: [DefaultComponent],
  exports: [DefaultComponent],
  imports: [CommonModule],
})
export class DefaultLayoutModule {}
