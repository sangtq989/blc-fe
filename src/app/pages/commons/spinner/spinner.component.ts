import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() visible: boolean = false;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.visible) {
      this.spinner.show();
    } else {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    }
  }

  ngOnInit(): void {}

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
