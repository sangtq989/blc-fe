import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-licenses-popup',
  templateUrl: './licenses-popup.component.html',
  styleUrls: ['./licenses-popup.component.scss'],
})
export class LicensesPopupComponent implements OnInit {
  @Input() visible: any;
  @Output() newLicensesEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  type: string = '';
  licensesName: string = '';
  publisher: string = '';
  publishFrom: string = '';
  publishTo: string = '';
  licensesCode: string = '';
  licensesUrl: string = '';
  errorMessage: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  addNewLicenses() {
    const payload: any = {
      type: 'CERT_LICENSES',
      licensesName: this.licensesName,
      publisher: this.publisher,
      publishFrom: moment(this.publishFrom).format('YYYY-MM'),
      publishTo: moment(this.publishTo).format('YYYY-MM'),
      licensesCode: this.licensesCode,
      licensesUrl: this.licensesUrl,
    };
    if (
      !this.licensesName ||
      !this.publisher ||
      !this.publishFrom ||
      !this.publishTo ||
      !this.licensesCode
    ) {
      this.errorMessage = true;
    } else {
      this.newLicensesEvent.emit(payload);
    }
  }

  closeLicensesPopup() {
    this.closeEvent.emit();
  }
}
