import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsPopupComponent } from './awards-popup.component';

describe('AwardsPopupComponent', () => {
  let component: AwardsPopupComponent;
  let fixture: ComponentFixture<AwardsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
