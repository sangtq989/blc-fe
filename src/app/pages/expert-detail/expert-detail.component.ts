import { Component, OnInit } from '@angular/core';
import { getExpertDetals } from './apis/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { Cookie } from 'ng2-cookies';
import { AuthConstant } from 'src/app/constants/auth.constant';
import * as moment from 'moment';
@Component({
  selector: 'app-expert-detail',
  templateUrl: './expert-detail.component.html',
  styleUrls: ['./expert-detail.component.scss'],
  providers: [MessageService],
})
export class ExpertDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    public dialog: DialogModule,
    private ticketSv: TicketService
  ) {}

  call: any;
  abi: any = require('../../../../build/contracts/TicketMarketplace.json').abi;

  value: number = 4.8;
  visible: boolean = false;
  visibleSendRequest: boolean = false;
  productsBackUp: any = [];
  products: any = [];
  selectedStatus: any;
  statusList: any;
  inforExperts: any;
  sliceOptions: any = {
    start: 0,
    end: 100,
    default: 100,
  };
  seeMore: boolean = true;
  openAllExp: boolean = false;
  openAllLiense: boolean = false;
  openAllAwards: boolean = false;
  openAllCourses: boolean = false;
  openAllSkills: boolean = false;
  openAllEdus: boolean = false;
  title: string = '';
  namePj: string = '';
  tags: string[] | undefined;
  targetList: any = [
    { name: 'Ứng cứu sự cố', code: 'Ứng cứu sự cố' },
    { name: 'Đào tạo chuyên gia', code: 'Đào tạo chuyên gia' },
    { name: 'An toàn mạng', code: 'An toàn mạng' },
    { name: 'An toàn ứng dụng', code: 'An toàn ứng dụng' },
    { name: 'An toàn thông tin', code: 'An toàn thông tin' },
    { name: 'An toàn vận hành', code: 'An toàn vận hành' },
    { name: 'An toàn đám mây', code: 'An toàn đám mây' },
  ];
  description: string = '';
  errorMessage: boolean = false;

  ngOnInit() {
    this.statusList = [
      { name: 'Proposal', code: '0' },
      { name: 'Doing', code: '1' },
      { name: 'Cancel', code: '2' },
      { name: 'ExpertDone', code: '3' },
      { name: 'CustDone', code: '4' },
    ];

    this.initData();
  }

  openContactInfo() {
    this.visible = true;
  }
  onExpandText(evt: any): void {
    this.sliceOptions.end = this.sliceOptions.end
      ? undefined
      : this.sliceOptions.default;
    this.seeMore = !this.seeMore;
  }

  async initData() {
    let accounts = await window.ethereum.request({
      /* New */ method: 'eth_requestAccounts' /* New */,
    });

    if (typeof window.ethereum === 'undefined') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please install MetaMask!',
      });
    }

    try {
      const res = await getExpertDetals(this.route.snapshot.params);
      this.inforExperts = res?.data?.data;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }

    await this.ticketSv.getTicketsByAddress(accounts[0]).then((res) => {
      const newArr = res.map((item: any) => {
        const color = this.generatorColor(item?.status);
        return {
          id: item?.id,
          title: item?.title,
          tag: item?.tag,
          date: item?.date,
          ...color,
        };
      });
      this.products = [...newArr];
      this.productsBackUp = [...newArr];
    });
  }

  searchPJ(e: any) {
    this.products = this.productsBackUp.filter(
      (item: any) => item?.title.indexOf(e?.target?.value) !== -1
    );
  }

  searchStatus(e: any) {
    this.namePj = '';
    this.products = this.productsBackUp.filter(
      (item: any) => item?.status === e.value.name
    );
  }

  generatorColor(type: string) {
    switch (type) {
      case '0':
        return {
          background: '#F1FFE4',
          color: '#797979',
          status: 'Proposal',
        };
        break;
      case '1':
        return {
          background: '#E3F2FF',
          color: '#2B83FF',
          status: 'Doing',
        };
        break;
      case '2':
        return {
          background: '#FFE2E2',
          color: '#C50606',
          status: 'Cancel',
        };
        break;
      case '3':
        return {
          background: '#FFF2C9',
          color: '#AEAEAE',
          status: 'ExpertDone',
        };
        break;
      case '4':
        return {
          background: '#F1FFE4',
          color: '#31B055',
          status: 'CustDone',
        };
        break;

      default:
        break;
    }
    return 0;
  }

  openRequestDialog() {
    if (!Cookie.get(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.router.navigate(['/auth/login']);
    } else {
      this.visibleSendRequest = true;
    }
  }

  async sendRequest() {
    let accounts = await window.ethereum.request({
      /* New */ method: 'eth_requestAccounts' /* New */,
    });
    if (this.tags && this.title) {
      this.ticketSv
        .createTicket(
          this.title,
          this.tags
            ?.map((item) => JSON.parse(JSON.stringify(item)).name)
            .toString(),
          moment().format('YYYY-MM-DD'),
          this.description,
          accounts?.[0]
        )
        .then(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Tạo ticket thành công',
          });
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error',
          });
        });
      this.visibleSendRequest = false;
    }
  }
}
