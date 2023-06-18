import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPopupComponent } from './skills-popup.component';

describe('SkillsPopupComponent', () => {
  let component: SkillsPopupComponent;
  let fixture: ComponentFixture<SkillsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
