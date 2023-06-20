import { Component, OnInit } from '@angular/core';
import { getExpertDetals } from './apis/api';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

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
    public dialog: DialogModule
  ) {}

  value: number = 4.8;
  visible: boolean = false;
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

  ngOnInit(): void {
    this.statusList = [
      { name: 'Chờ xử lý', code: 'Pending' },
      { name: 'Chuẩn bị', code: 'Prepare' },
      { name: 'Tiến hành', code: 'Process' },
      { name: 'Hoàn thành', code: 'Success' },
      { name: 'Đã từ chối', code: 'Canceled' },
    ];
    this.products = [
      {
        id: '01',
        name: 'a',
        status: 'Chuẩn bị',
        subject: 'IT',
        createdAt: '12/06/2023',
      },
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
  }
}
