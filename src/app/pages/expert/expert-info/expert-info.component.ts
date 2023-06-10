import { TicketService } from './../../../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MetamaskService } from 'src/app/services/metamask.service';

@Component({
  selector: 'app-expert-info',
  templateUrl: './expert-info.component.html',
  styleUrls: ['./expert-info.component.css'],
})
export class ExpertInfoComponent implements OnInit {
  createRequestVisible: any = false;
  haveRequest: any = false;

  specialityList: any = [];
  stateOptions: any[] = [
    { label: 'Hoàn thành', value: 'complete' },
    { label: 'Tiến hành', value: 'progress' },
  ];

  projectStt: any;

  projectList: any = [
    {
      id: 1,
      projectNm: 'Olivia Rhye',
      startDt: new Date().getMonth() - 2,
      endDt: new Date(),
      status: 'Hoàn thành',
    },
  ];

  projectRequest: any = {};

  constructor(
    private metamaskService: MetamaskService,
    private tickerService: TicketService
  ) {}

  ngOnInit(): void {
    this.projectStt = 'complete';
    this.checkConnectMetamask();
  }

  async checkConnectMetamask() {
    if (this.metamaskService.checkConnect()) {
      let address = await this.metamaskService.getAccount();
      this.tickerService.initContract(address);
    } else {
    }
  }

  createRequest() {
    this.createRequestVisible = true;
  }
}
