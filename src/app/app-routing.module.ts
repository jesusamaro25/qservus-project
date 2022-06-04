import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { 
    path: '',
    loadChildren: () => import('./parent/parent.module').then( m => m.ParentModule )
  },
  {
    path: '**',
    redirectTo: ''
  }

];



@NgModule({
  imports: [
    RouterModule.forRoot( routes  )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }