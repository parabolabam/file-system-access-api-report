import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonSupportedBrowserComponent } from './non-supported-browser.component';

const routes: Routes = [{ path: '', component: NonSupportedBrowserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonSupportedBrowserRoutingModule { }
