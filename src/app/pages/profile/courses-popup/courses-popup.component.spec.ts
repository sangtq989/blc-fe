import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPopupComponent } from './courses-popup.component';

describe('CoursesPopupComponent', () => {
  let component: CoursesPopupComponent;
  let fixture: ComponentFixture<CoursesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
