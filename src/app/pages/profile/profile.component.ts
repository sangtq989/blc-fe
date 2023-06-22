import { Component, OnInit } from '@angular/core';
import {
  createCertificate,
  getProfiles,
  createExperience,
  createSpecialty,
  udpateProfiles,
} from './apis/api';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { TicketService } from 'src/app/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  constructor(
    public dialog: DialogModule,
    private messageService: MessageService,
    private ticketSv: TicketService,
    private router: Router
  ) {}
  value: number = 4.8;
  valueRate: number = 0;
  requestId: string = '';
  visible: boolean = false;
  selectedStatus: any;
  statusList: any;
  products: any = [];
  productsBackUp: any = [];
  request: any = [];
  requestBackUp: any = [];
  sliceOptions: any = {
    start: 0,
    end: 100,
    default: 100,
  };
  openAllExp: boolean = false;
  openAllLiense: boolean = false;
  openAllAwards: boolean = false;
  openAllCourses: boolean = false;
  openAllSkills: boolean = false;
  openAllEdus: boolean = false;
  inforExperts: any;
  seeMore: boolean = true;
  visibleExp: boolean = false;
  visibleEdu: boolean = false;
  visibleLicenses: boolean = false;
  visibleAwards: boolean = false;
  visibleCourses: boolean = false;
  visibleSkills: boolean = false;
  visibleRating: boolean = false;
  visibleReason: boolean = false;
  namePj: string = '';
  namePjRequest: string = '';
  idCancel: string = '';
  reason: string = '';
  emailRate: string = '';
  isCancelRequest: boolean = false;
  ngOnInit(): void {
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

  goToDetailExpert(email: string) {
    this.router.navigate([`/experts/${email}`]);
  }

  async initData() {
    try {
      const res = await getProfiles();
      this.inforExperts = res?.data?.data;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }

    this.getTickets();
    this.getRequest();
  }

  async getTickets() {
    let accounts = await window.ethereum.request({
      /* New */ method: 'eth_requestAccounts' /* New */,
    });
    await this.ticketSv.getTicketsByAddress(accounts[0]).then((res) => {
      const newArr = res.map((item: any) => {
        const color = this.generatorColor(item?.status);
        return {
          id: item?.id,
          title: item?.title,
          tag: item?.tag,
          date: item?.date,
          status: item?.status,
          rate: item?.rate,
          ...color,
        };
      });
      this.products = [...newArr];
      this.productsBackUp = [...newArr];
    });
  }

  async getRequest() {
    let accounts = await window.ethereum.request({
      /* New */ method: 'eth_requestAccounts' /* New */,
    });
    await this.ticketSv.getYourRequestTicket(accounts[0]).then((res) => {
      const newArr = res.map((item: any) => {
        const color = this.generatorColor(item?.status);
        return {
          id: item?.id,
          title: item?.title,
          tag: item?.tag,
          date: item?.date,
          status: item?.status,
          email: item?.senderEmail,
          rate: item?.rate,
          ...color,
        };
      });
      this.request = [...newArr];
      this.requestBackUp = [...newArr];
    });
  }

  searchPJ(e: any) {
    this.products = this.productsBackUp.filter(
      (item: any) => item?.title.indexOf(e?.target?.value) !== -1
    );
  }

  searchStatus(e: any) {
    this.namePjRequest = '';
    this.request = this.requestBackUp.filter(
      (item: any) => item?.status === e.value.name
    );
  }
  searchPJRequest(e: any) {
    this.request = this.requestBackUp.filter(
      (item: any) => item?.title.indexOf(e?.target?.value) !== -1
    );
  }

  searchStatusRequest(e: any) {
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
          statusName: 'Chờ xử lý',
        };
        break;
      case '1':
        return {
          background: '#E3F2FF',
          color: '#2B83FF',
          statusName: 'Tiến hành',
        };
        break;
      case '2':
        return {
          background: '#FFE2E2',
          color: '#C50606',
          statusName: 'Đã từ chối',
        };
        break;
      case '3':
        return {
          background: '#FFF2C9',
          color: '#AEAEAE',
          statusName: 'Chờ Review',
        };
        break;
      case '4':
        return {
          background: '#F1FFE4',
          color: '#31B055',
          statusName: 'Hoàn thành',
        };
        break;

      default:
        break;
    }
    return 0;
  }

  async connectWallet() {
    if (typeof window.ethereum === 'undefined') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please install MetaMask!',
      });
    } else {
      try {
        let accounts = await window.ethereum.request({
          /* New */ method: 'eth_requestAccounts' /* New */,
        });

        const res = await udpateProfiles({
          blockChainAddress: accounts?.[0],
        });

        if (res?.status === 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Connect Wallet thành công',
          });
          this.initData();
        }
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
        });
      }
    }
  }

  async addNewExp(e: any) {
    try {
      const res = await createExperience(e);
      if (res?.status === 200) {
        this.visibleExp = false;
        this.initData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Kinh nghiệm đã được thêm thành công',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }
  }

  closeExpPopup() {
    this.visibleExp = false;
  }
  async addNewEdu(e: any) {
    try {
      const res = await createCertificate(e);
      if (res?.status === 200) {
        this.visibleEdu = false;
        this.initData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Học vấn đã được thêm thành công',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }
  }

  closeEduPopup() {
    this.visibleEdu = false;
  }
  async addNewLicenses(e: any) {
    try {
      const res = await createCertificate(e);
      if (res?.status === 200) {
        this.visibleLicenses = false;
        this.initData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Chứng nhận và chứng chỉ đã được thêm thành công',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }
  }

  closeLicensesPopup() {
    this.visibleLicenses = false;
  }
  async addNewAward(e: any) {
    try {
      const res = await createCertificate(e);
      if (res?.status === 200) {
        this.visibleAwards = false;
        this.initData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Danh hiệu và giải thưởng đã được thêm thành công',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }
  }

  closeAwardPopup() {
    this.visibleAwards = false;
  }
  async addNewCourse(e: any) {
    try {
      const res = await createCertificate(e);
      if (res?.status === 200) {
        this.visibleCourses = false;
        this.initData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Khoá học đã được thêm thành công',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }
  }

  closeCoursePopup() {
    this.visibleCourses = false;
  }
  async addNewSkill(e: any) {
    try {
      const res = await createSpecialty(e);
      if (res?.status === 200) {
        this.visibleSkills = false;
        this.initData();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Kỹ năng đã được thêm thành công',
        });
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error',
      });
    }
  }

  closeSkillPopup() {
    this.visibleSkills = false;
  }

  acceptProject(id: any) {
    this.ticketSv
      .startTicket(Number(id))
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Cập nhật ticket thành công',
        });
        this.getTickets();
        this.getRequest();
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
        });
      });
  }

  cancelProject(id: any, type: number) {
    this.visibleReason = true;
    this.idCancel = id;
    this.isCancelRequest = Boolean(type);
  }

  cancelRequest(id: any, type: number) {
    this.visibleReason = true;
    this.idCancel = id;
    this.isCancelRequest = Boolean(type);
  }

  completeProject(id: any) {
    this.ticketSv
      .expertFinishTicket(Number(id))
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Cập nhật ticket thành công',
        });
        this.getTickets();
        this.getRequest();
      })
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
        });
      });
  }
  rateRequest(id: any, email: string) {
    this.visibleRating = true;
    this.requestId = id;
    this.emailRate = email;
  }
  onSubmitRate() {
    this.ticketSv
      .customerDoneTicket(Number(this.requestId), Number(this.valueRate))
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Cập nhật ticket thành công',
        });
        this.visibleRating = false;
        this.emailRate = '';
        this.getTickets();
        this.getRequest();
      })
      .catch(() => {
        this.visibleRating = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error',
        });
      });
  }

  onSubmitCancel() {
    if (this.isCancelRequest) {
      if (this.reason) {
        this.ticketSv
          .cancelTicket(this.reason, Number(this.idCancel))
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Cập nhật ticket thành công',
            });
            this.visibleReason = false;
            this.reason = '';
            this.idCancel = '';
            this.getTickets();
            this.getRequest();
          })
          .catch(() => {
            this.visibleReason = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error',
            });
          });
      }
    } else {
      if (this.reason) {
        this.ticketSv
          .cancelTicket(this.reason, Number(this.idCancel))
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Cập nhật ticket thành công',
            });
            this.visibleReason = false;
            this.reason = '';
            this.idCancel = '';
            this.getTickets();
            this.getRequest();
          })
          .catch(() => {
            this.visibleReason = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error',
            });
          });
      }
    }
  }
}
