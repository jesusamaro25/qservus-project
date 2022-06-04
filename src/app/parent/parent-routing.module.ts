import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './pages/parent/parent.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'parent', component: ParentComponent },
      { path: '**', redirectTo: 'parent' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
