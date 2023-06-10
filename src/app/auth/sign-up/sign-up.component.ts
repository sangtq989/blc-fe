import { CommonConstant } from './../../constants/common.constant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { MetamaskService } from 'src/app/services/metamask.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  user: any = {};
  submitted: boolean = false;
  visible: boolean = false;
  role: any;
  certForm: any = false;
  signUpForm: any = true;
  degreeForm: any = false;
  expWrkForm: any = false;
  connectMetamask: any = false;
  generalInfoForm: any = false;
  specializedInfoForm: any = false;
  locationWrkForm: any = false;
  genderOptions: any = [];
  specialityList: any = [];
  degreeTypeList: any = CommonConstant.DEGREE_TYPE_LIST;

  constructor(
    private authService: AuthenticationService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private metamaskService: MetamaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = {};
    this.role = this.route.snapshot.queryParams['role'];
    console.log(this.route.snapshot.queryParams['role']);

    this.genderOptions = [
      { label: 'Nam', value: 'Nam' },
      { label: 'Nữ', value: 'Nữ' },
    ];
  }

  goToLandingPage() {
    this.router.navigate(['home']);
  }

  addExpWrk() {
    this.specializedInfoForm = false;
    this.expWrkForm = true;
  }

  addDegree() {
    this.specializedInfoForm = false;
    this.degreeForm = true;
  }

  register() {
    this.authService.signup(this.user).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Đăng ký thành công, vào email để xác thực !',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        }).then((result: any) => {
          if (result.value) {
            this.router.navigate(['/auth/login']);
          } else {
          }
        });
        this.signUpForm = false;
        this.certForm = true;
      },
      error: (err) => {
        if (err.internalStatus === CommonConstant.EXISTED) {
          this.toastService.error('Email đã tồn tại', 'Error');
        } else {
          this.toastService.error('Có lỗi xảy ra', 'Error');
        }
      },
    });
  }

  onVerifyEmail() {
    this.certForm = false;
    this.connectMetamask = true;
    Swal.fire('Xác thực thành công !', '', 'success');
  }

  onSubmitGeneralProfile() {
    this.generalInfoForm = false;
    this.locationWrkForm = true;
  }

  onSubmitLocationWrk() {
    this.locationWrkForm = false;
    this.specializedInfoForm = true;
  }

  onSubmitSpecializedInfo() {}

  onSubmitExpWrk() {
    this.specializedInfoForm = true;
    this.expWrkForm = false;
  }

  onSubmitDegree() {
    this.specializedInfoForm = true;
    this.degreeForm = false;
  }

  onBackSpecializedForm() {
    this.specializedInfoForm = true;
    this.expWrkForm = false;
    this.degreeForm = false;
  }
}
