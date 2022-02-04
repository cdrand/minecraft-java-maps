import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AccountComponent } from './account/account.component'
import { DocsComponent } from './docs/docs.component'
import { HomeComponent } from './home/home.component'
import AuthGuardService from './services/authGuard.service'
import { UploadComponent } from './upload/upload.component'

const routes: Routes = [
  {
    path: 'docs',
    component: DocsComponent,
  },
  {
    path: 'maps/upload',
    component: UploadComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
