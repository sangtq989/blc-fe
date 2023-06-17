import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-experience-popup',
  templateUrl: './experience-popup.component.html',
  styleUrls: ['./experience-popup.component.scss'],
})
export class ExperiencePopupComponent implements OnInit {
  @Input() visible: any;
  @Output() newExpEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();
  positionName: string = '';
  employeeType: string = '';
  companyName: string = '';
  companyAddress: string = '';
  currentJob: boolean = false;
  startDate: string = '';
  endDate: string = '';
  jobDesc: string = '';
  errorMessage: boolean = false;
  listEmployeeType: any = [
    { name: 'Full Time', value: 'Full Time' },
    { name: 'Part Time', value: 'Part Time' },
  ];
  constructor() {}

  ngOnInit(): void {}

  addNewExp() {
    const payload: any = {
      companyAddress: this.companyAddress,
      companyName: this.companyName,
      currentJob: this.currentJob,
      employeeType: JSON.parse(JSON.stringify(this.employeeType)).name,
      endTime: moment(this.endDate).format('YYYY-MM'),
      startTime: moment(this.startDate).format('YYYY-MM'),
      jobDesc: this.jobDesc,
      positionName: this.positionName,
    };
    if (!this.positionName || !this.companyName || !this.startDate) {
      this.errorMessage = true;
    } else {
      this.newExpEvent.emit(payload);
    }
  }
  closeExpPopup() {
    this.closeEvent.emit();
  }
}
