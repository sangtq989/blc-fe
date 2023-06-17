import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-skills-popup',
  templateUrl: './skills-popup.component.html',
  styleUrls: ['./skills-popup.component.css'],
})
export class SkillsPopupComponent implements OnInit {
  @Input() visible: any;
  @Output() newSkillsEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  specialities: string[] | undefined;
  skills: string[] | undefined;
  languages: string[] | undefined;
  yearOfExp: number = 0;
  errorMessage: boolean = false;
  specialitiesList: any = [
    { name: 'Ứng cứu sự cố', code: 'Ứng cứu sự cố' },
    { name: 'Đào tạo chuyên gia', code: 'Đào tạo chuyên gia' },
    { name: 'An toàn mạng', code: 'An toàn mạng' },
    { name: 'An toàn ứng dụng', code: 'An toàn ứng dụng' },
    { name: 'An toàn thông tin', code: 'An toàn thông tin' },
    { name: 'An toàn vận hành', code: 'An toàn vận hành' },
    { name: 'An toàn đám mây', code: 'An toàn đám mây' },
  ];
  constructor() {}

  ngOnInit(): void {}

  addNewSkill() {
    const payload: any = {
      yearOfExp: this.yearOfExp,
      specialities: this.specialities?.map(
        (item) => JSON.parse(JSON.stringify(item)).name
      ),
      skills: this.skills,
      languages: this.languages,
    };
    if (!this.specialities || !this.yearOfExp) {
      this.errorMessage = true;
    } else {
      this.newSkillsEvent.emit(payload);
    }
  }

  closeSkillPopup() {
    this.closeEvent.emit();
  }
}
