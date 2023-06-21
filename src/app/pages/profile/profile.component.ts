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
    private ticketSv: TicketService
  ) {}
  value: number = 4.8;
  visible: boolean = false;
  selectedStatus: any;
  statusList: any;
  products: any = [];
  productsBackUp: any = [];
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
  namePj: string = '';
  ngOnInit(): void {
    this.statusList = [
      { name: 'Proposal', code: '0' },
      { name: 'Doing', code: '1' },
      { name: 'Cancel', code: '2' },
      { name: 'ExpertDone', code: '3' },
      { name: 'CustDone', code: '4' },
    ];

    this.initData();
    console.log(this.products);
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
      const res = await getProfiles();
      this.inforExperts = res?.data?.data;
      console.log('inforExperts', this.inforExperts);
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
          status: item?.status,
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
          background: '#E3F2FF',
          color: '#2B83FF',
          status: 'ExpertDone',
        };
        break;
      case '3':
        return {
          background: '#F1FFE4',
          color: '#31B055',
          status: 'Doing',
        };
        break;
      case '4':
        return {
          background: '#FFE2E2',
          color: '#C50606',
          status: 'CustDone',
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
}
