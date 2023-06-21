import { Component, OnInit } from '@angular/core';
import { getExpertDetals } from './apis/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { Cookie } from 'ng2-cookies';
import { AuthConstant } from 'src/app/constants/auth.constant';
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

  ngOnInit(): void {
    this.statusList = [
      { name: 'Chờ xử lý', code: 'Pending' },
      { name: 'Chuẩn bị', code: 'Prepare' },
      { name: 'Tiến hành', code: 'Process' },
      { name: 'Hoàn thành', code: 'Success' },
      { name: 'Đã từ chối', code: 'Canceled' },
    ];
    // this.products = [
    //   {
    //     id: '01',
    //     name: 'a',
    //     status: 'Chuẩn bị',
    //     subject: 'IT',
    //     createdAt: '12/06/2023',
    //   },
    // ];

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

    if (typeof window.ethereum === 'undefined') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please install MetaMask!',
      });
    }

    this.ticketSv.getTicketsByAddress(accounts[0]).then((res) => {
      this.products = res.map((item: any) => item);
      console.log(
        'this.products',
        this.products?.[0]?.tag,
        JSON.stringify(this.products)
      );
    });
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
      this.ticketSv.createTicket(
        this.title,
        this.tags
          ?.map((item) => JSON.parse(JSON.stringify(item)).name)
          .toString(),
        this.description,
        accounts?.[0]
      );
      this.visibleSendRequest = false;
    }
  }
}
