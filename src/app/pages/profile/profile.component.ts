import { Component, OnInit } from '@angular/core';
import {
  createCertificate,
  getProfiles,
  createExperience,
  createSpecialty,
} from './apis/api';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  constructor(
    public dialog: DialogModule,
    private messageService: MessageService
  ) {}
  value: number = 4.8;
  visible: boolean = false;
  selectedStatus: any;
  statusList: any;
  products: any = [];
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
    // this.inforExperts = {
    //   metadata: {
    //     CERT_LICENSES: [
    //       {
    //         uid: '13b5250e-783b-4fb2-9b59-0db785e4679f',
    //         licensesUrl: 'String',
    //         publisher: 'String',
    //         licensesName: 'String',
    //         publishFrom: '2023-04-20',
    //         licensesCode: 'String',
    //         publishTo: '2023-04-29',
    //       },
    //       {
    //         uid: '13b5250e-783b-4fb2-9b59-0db785e4679f',
    //         licensesUrl: 'String',
    //         publisher: 'String',
    //         licensesName: 'String',
    //         publishFrom: '2023-04-20',
    //         licensesCode: 'String',
    //         publishTo: '2023-04-29',
    //       },
    //     ],
    //     CERT_COURSE: [
    //       {
    //         uid: 'b2661087-7607-4dc9-8644-f24e92a37ae0',
    //         courseName: 'String',
    //         courseProvider: 'String',
    //       },
    //     ],
    //     SPECIALTY: [
    //       {
    //         uid: '5e178d62-971f-42fd-99e9-bceb2bca1d27',
    //         skills: ['Ứng cứu j j', 'Hết cứu'],
    //         languages: ['Eng', 'Jap'],
    //         yearOfExp: '3',
    //         specialities: ['Pro', 'Vip'],
    //       },
    //       {
    //         uid: '3bccb2f5-7854-4e03-b3dc-58cf904c4440',
    //         skills: ['Ứng cứu j j 2', 'another ứng cứu 2'],
    //         languages: ['Eng2', 'Jap2'],
    //         yearOfExp: '3',
    //         specialities: ['Pro2', 'Vip2'],
    //       },
    //       {
    //         uid: '195bf35c-6a5a-4cdf-bbe9-6c9cdadc8960',
    //         skills: ['Ứng cứu j j 3', 'Hết giờ cấp cứu3'],
    //         languages: ['Eng3', 'Jap3'],
    //         yearOfExp: '3',
    //         specialities: ['Pro3', 'Vip3'],
    //       },
    //     ],
    //     EXPERIENCE: [
    //       {
    //         uid: 'b20a1f89-10cf-4c2a-8f15-4e92dfbe5a1b',
    //         positionName: 'Phân tích mã độc',
    //         employeeType: 'Nhân viên',
    //         endDate: '',
    //         companyAddress: 'Hà Nội, Việt nam',
    //         companyName: 'CEM Software',
    //         isCurrentJob: 'true',
    //         jobDesc: 'Phân tích bla blo',
    //         startDate: '2023-04-29',
    //       },
    //       {
    //         uid: '6f040049-3f8f-4c76-8d96-55a99894d4cb',
    //         positionName: 'string',
    //         employeeType: 'string',
    //         endDate: '2023-04-29',
    //         companyName: 'string',
    //         companyAddress: 'string',
    //         isCurrentJob: 'false',
    //         jobDesc: 'string',
    //         startDate: '2023-04-29',
    //       },
    //     ],
    //     CERT_EDU: [
    //       {
    //         uid: '3455c73d-c42d-4758-8887-cc7b53ce5017',
    //         uniName: 'string',
    //         major: 'string',
    //         degree: 'string',
    //         gpa: 'string',
    //         description: 'string',
    //         startTime: '2023-04-26',
    //         endTime: '2023-04-26',
    //       },
    //       {
    //         uid: 'c79f867f-7715-48c2-8a63-d51c4fbffe69',
    //         uniName: 'string',
    //         major: 'string',
    //         degree: 'string',
    //         gpa: 'string',
    //         description: 'string',
    //         startTime: '2023-04-26',
    //         endTime: '2023-04-26',
    //       },
    //       {
    //         uid: 'c4befac7-c82f-44e1-9e7d-f798841f97b1',
    //         uniName: 'string',
    //         major: 'string',
    //         degree: 'string',
    //         GPA: 'string',
    //         description: 'string',
    //         startTime: '2023-04-26',
    //         endTime: '2023-04-26',
    //       },
    //     ],
    //     CERT_AWARD: [
    //       {
    //         uid: 'fd9014bf-08af-4ff1-885c-7adc1c07653b',
    //         awardOrg: 'string',
    //         publishDate: '2023-04-26',
    //         awardName: 'string',
    //       },
    //       {
    //         uid: 'dfbe5e58-82a6-4d35-9fa0-77788970b11f',
    //         awardOrg: 'string',
    //         publishDate: '2023-04-26',
    //         awardName: 'string',
    //       },
    //       {
    //         uid: 'b84547fa-e56e-454c-9790-3c5f5676a17b',
    //         awardOrg: 'string',
    //         publishDate: '2023-04-26',
    //         awardName: 'string',
    //       },
    //     ],
    //   },
    //   userInfo: {
    //     phone: '',
    //     email: '',
    //     dateOfBirth: '1992-12-31',
    //     firstName: 'Admin',
    //     lastName: 'lastnema',
    //     jobTitle: 'Phân tích mã độc',
    //     yearOfExp: '3',
    //     companyName: 'CEM Software',
    //     skill: ['Ứng cứu j j', 'Hết cứu'],
    //     location: 'Hà Nội, Việt nam',
    //   },
    // };

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
