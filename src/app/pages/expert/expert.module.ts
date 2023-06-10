import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertRoutingModule } from './expert-routing.module';
import { ExpertComponent } from './expert.component';
import { ExpertInfoComponent } from './expert-info/expert-info.component';
import { ExpertListComponent } from './expert-list/expert-list.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { PagesRoutingModule } from '../pages-routing.module';

@NgModule({
  declarations: [ExpertComponent, ExpertInfoComponent, ExpertListComponent],
  imports: [
    CommonModule,
    ExpertRoutingModule,
    CardModule,
    TableModule,
    FormsModule,
    SelectButtonModule,
    RatingModule,
    ButtonModule,
    MatDialogModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
})
export class ExpertModule {}
