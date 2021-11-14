import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonSupportedBrowserComponent } from './non-supported-browser.component';

describe('NonSupportedBrowserComponent', () => {
  let component: NonSupportedBrowserComponent;
  let fixture: ComponentFixture<NonSupportedBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonSupportedBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonSupportedBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
