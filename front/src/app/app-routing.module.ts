import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule),
    // canLoad: [ AuthGuard ],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  imports: [ RouterModule.forRoot( routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
