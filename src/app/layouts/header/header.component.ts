import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AuthConstant } from '../../constants/auth.constant';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { AuthenticationUtil } from 'src/app/utils/authentication.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  login: any = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (AuthenticationUtil.isLoggedIn()) {
      this.login = true;
    }
  }

  onNavgigate(event: any) {
    const navigate = document.querySelectorAll('#navigation-menu li span a');

    console.log(event.target);

    navigate.forEach((ele: any) => {
      if (ele === event.target) {
        ele.classList.add('active');
      } else {
        ele.classList.remove('active');
      }
    });
  }

  onClickProfile() {
    const dropdownProfile = document.getElementById('dropdown-profile');

    console.log(dropdownProfile);

    dropdownProfile?.classList.toggle('active');
  }

  onLogout() {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
    this.router.navigate(['/home']);
  }
}
