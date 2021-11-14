import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly doc: Document
  ) {}

  ngOnInit(): void {
    const globalThis = this.doc?.defaultView;

    if('chooseFileSystemEntries' in window ||
    'showOpenFilePicker' in window) {
      return;
    } else {
      this.router.navigate(['non-supported-browser'])
    }
  }
}
