import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-awards-popup',
  templateUrl: './awards-popup.component.html',
  styleUrls: ['./awards-popup.component.css'],
})
export class AwardsPopupComponent implements OnInit {
  @Input() visible: any;
  @Output() newAwardEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();
  awardName: string = '';
  awardOrg: string = '';
  publishDate: string = '';
  errorMessage: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  addNewAward() {
    const payload: any = {
      type: 'CERT_AWARD',
      awardName: this.awardName,
      awardOrg: this.awardOrg,
      publishDate: moment(this.publishDate).format('YYYY-MM'),
    };
    if (!this.awardName || !this.publishDate) {
      this.errorMessage = true;
    } else {
      this.newAwardEvent.emit(payload);
    }
  }

  closeAwardPopup() {
    this.closeEvent.emit();
  }
}
