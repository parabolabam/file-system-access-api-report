import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'editor',
    loadChildren: () =>
      import('@views/editor/editor.module').then(
        ({ EditorModule }) => EditorModule
      ),
  },
  {
    path: 'non-supported-browser',
    loadChildren: () =>
      import('@views/non-supported-browser/non-supported-browser.module').then(
        ({ NonSupportedBrowserModule }) => NonSupportedBrowserModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
