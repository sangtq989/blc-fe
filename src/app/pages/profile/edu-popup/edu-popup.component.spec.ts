import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduPopupComponent } from './edu-popup.component';

describe('EduPopupComponent', () => {
  let component: EduPopupComponent;
  let fixture: ComponentFixture<EduPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EduPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EduPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
