import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { ExpertInfoComponent } from './expert/expert-info/expert-info.component';
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'add-profile', component: AddProfileFormComponent },
      { path: 'experts/info', component: ExpertInfoComponent },
      // {
      //   path: 'expert',
      //   loadChildren: () =>
      //     import('././expert/expert.module').then((m) => m.ExpertModule),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
