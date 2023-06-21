import { Component, OnInit } from '@angular/core';
import { getProfiles } from './apis/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  techniqueList: any = [];
  certList: any = [];
  expertList: any = [];
  locationList: any = [];
  expYearList: any = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initData();
  }

  showSearchAdvance() {
    let content = document.getElementById('content');
    if (content) {
      content.classList.add('active');
    }
  }

  goToDetailExpert(email: string) {
    this.router.navigate([`/experts/${email}`]);
  }

  async initData() {
    try {
      const res = await getProfiles();
      this.expertList = res?.data?.data;
      console.log('res', res?.data?.data);
    } catch (error) {}
  }

  hideAdvanceSearch() {
    let content = document.getElementById('content');
    if (content) {
      content.classList.remove('active');
    }
  }
}
