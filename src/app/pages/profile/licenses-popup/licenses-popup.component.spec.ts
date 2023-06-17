import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesPopupComponent } from './licenses-popup.component';

describe('LicensesPopupComponent', () => {
  let component: LicensesPopupComponent;
  let fixture: ComponentFixture<LicensesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
