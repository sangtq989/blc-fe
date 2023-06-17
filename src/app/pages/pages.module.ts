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
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { HomeComponent } from './home/home.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { CommonsModule } from './commons/commons.module';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AddProfileFormComponent,
    ExpertListComponent,
    ProfileComponent,
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
    RatingModule,
    SelectButtonModule,
    FileUploadModule,
    DialogModule,
  ],
})
export class PagesModule {}
