import { AuthenticationUtil } from './../../utils/authentication.util';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {};
  submitted: boolean = false;
  visible: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  goToLandingPage() {
    this.router.navigate(['home']);
  }

  login(invalid: any) {
    if (invalid) {
      this.submitted = true;
      this.showToastValidate();
      return;
    }
    this.visible = true;
    this.authService.login(this.user).subscribe({
      next: (res) => {
        console.log(res);
        AuthenticationUtil.saveToken(res.data.jwt);
        this.router.navigate(['home']);
        this.visible = false;
      },
      error: (err) => {
        this.toastService.error('Username or password incorrect !', 'Error');
        this.visible = false;
      },
    });
  }

  showToastValidate() {
    let requiredField = '';
    if (this.user.username == '' || this.user.username == undefined) {
      requiredField = requiredField + 'Username, ';
    }
    if (this.user.password == '' || this.user.password == undefined) {
      requiredField = requiredField + 'Password, ';
    }
    requiredField =
      requiredField.slice(0, requiredField.length - 2) + ' is required !';
    this.toastService.error(requiredField, 'Failed');
  }
}
