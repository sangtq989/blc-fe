import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  techniqueList: any = [];
  certList: any = [];
  locationList: any = [];
  expYearList: any = [];

  constructor() {}

  ngOnInit(): void {}

  showSearchAdvance() {
    let content = document.getElementById('content');
    if (content) {
      content.classList.add('active');
    }
  }

  hideAdvanceSearch() {
    let content = document.getElementById('content');
    if (content) {
      content.classList.remove('active');
    }
  }
}
