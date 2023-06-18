import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-edu-popup',
  templateUrl: './edu-popup.component.html',
  styleUrls: ['./edu-popup.component.scss'],
})
export class EduPopupComponent implements OnInit {
  @Input() visible: any;
  @Output() newEduEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();
  description: string = '';
  gpa: string = '';
  startDate: string = '';
  endDate: string = '';
  major: string = '';
  degree: string = '';
  uniName: string = '';
  type: string = '';
  errorMessage: boolean = false;
  listDegreeType: any = [
    { name: 'Cử nhân', value: 'Cử nhân' },
    { name: 'Kỹ sư', value: 'Kỹ sư' },
    { name: 'Thạc sỹ', value: 'Thạc sỹ' },
    { name: 'Tiến sỹ', value: 'Tiến sỹ' },
  ];
  constructor() {}

  ngOnInit(): void {}

  addNewEdu() {
    const payload: any = {
      type: 'CERT_EDU',
      uniName: this.uniName,
      degree: JSON.parse(JSON.stringify(this.degree)).name,
      major: this.major,
      endTime: moment(this.endDate).format('YYYY-MM'),
      startTime: moment(this.startDate).format('YYYY-MM'),
      gpa: this.gpa,
      description: this.description,
    };
    if (!this.uniName || !this.major || !this.degree || !this.startDate) {
      this.errorMessage = true;
    } else {
      this.newEduEvent.emit(payload);
      this.uniName = '';
      this.degree = '';
      this.major = '';
      this.endDate = '';
      this.startDate = '';
      this.gpa = '';
      this.description = '';
    }
  }

  closeEduPopup() {
    this.closeEvent.emit();
  }
}
