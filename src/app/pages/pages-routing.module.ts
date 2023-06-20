import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationUtil } from '../utils/authentication.util';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { AddProfileFormComponent } from './add-profile-form/add-profile-form.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExpertDetailComponent } from './expert-detail/expert-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'add-profile', component: AddProfileFormComponent },
      { path: 'experts/:email', component: ExpertDetailComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
