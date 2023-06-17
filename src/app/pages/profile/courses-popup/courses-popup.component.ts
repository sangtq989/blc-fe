import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-courses-popup',
  templateUrl: './courses-popup.component.html',
  styleUrls: ['./courses-popup.component.css'],
})
export class CoursesPopupComponent implements OnInit {
  @Input() visible: any;
  @Output() newCoursesEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter<any>();

  courseName: string = '';
  courseProvider: string = '';
  errorMessage: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  addNewCourse() {
    const payload: any = {
      type: 'CERT_COURSE',
      courseName: this.courseName,
      courseProvider: this.courseProvider,
    };
    if (!this.courseName) {
      this.errorMessage = true;
    } else {
      this.newCoursesEvent.emit(payload);
    }
  }

  closeCoursePopup() {
    this.closeEvent.emit();
  }
}
