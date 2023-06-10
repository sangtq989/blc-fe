import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { LayoutsModule } from '../layouts/layouts.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HomeComponent } from './home/home.component';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { CommonsModule } from './commons/commons.module';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AddProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    PagesRoutingModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    LayoutsModule,
    FormsModule,
    TableModule,
    CommonsModule,
  ],
})
export class PagesModule {}
