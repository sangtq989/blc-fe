import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertComponent } from './expert.component';
import { ExpertInfoComponent } from './expert-info/expert-info.component';
import { ExpertListComponent } from './expert-list/expert-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertComponent,
    children: [
      { path: 'list', component: ExpertListComponent },
      { path: 'detail', component: ExpertInfoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertRoutingModule {}
