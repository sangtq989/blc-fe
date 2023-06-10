import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonsModule } from '../pages/commons/commons.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    RouterModule,
    FormsModule,
    InputTextareaModule,
    DropdownModule,
    CommonsModule,
  ],
})
export class AuthModule {}
