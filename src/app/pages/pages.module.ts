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
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { HomeComponent } from './home/home.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { CommonsModule } from './commons/commons.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { ProfileComponent } from './profile/profile.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ExperiencePopupComponent } from './profile/experience-popup/experience-popup.component';
import { EduPopupComponent } from './profile/edu-popup/edu-popup.component';
import { LicensesPopupComponent } from './profile/licenses-popup/licenses-popup.component';
import { AwardsPopupComponent } from './profile/awards-popup/awards-popup.component';
import { CoursesPopupComponent } from './profile/courses-popup/courses-popup.component';
import { SkillsPopupComponent } from './profile/skills-popup/skills-popup.component';
import { ExpertDetailComponent } from './expert-detail/expert-detail.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AddProfileFormComponent,
    ExpertListComponent,
    ProfileComponent,
    ExperiencePopupComponent,
    EduPopupComponent,
    LicensesPopupComponent,
    AwardsPopupComponent,
    CoursesPopupComponent,
    SkillsPopupComponent,
    ExpertDetailComponent,
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
    CalendarModule,
    InputTextareaModule,
    CheckboxModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class PagesModule {}
