import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonSupportedBrowserRoutingModule } from './non-supported-browser-routing.module';
import { NonSupportedBrowserComponent } from './non-supported-browser.component';
import { DefaultLayoutModule } from 'app/layouts/default/default.module';

@NgModule({
  declarations: [NonSupportedBrowserComponent],
  imports: [
    CommonModule,
    NonSupportedBrowserRoutingModule,
    DefaultLayoutModule,
  ],
})
export class NonSupportedBrowserModule {}
