import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './pages/parent/parent.component';
import { ParentRoutingModule } from './parent-routing.module';
import { ChildComponent } from './components/child/child.component';
import { RetryDialogComponent } from './components/retry-dialog/retry-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    ParentComponent,
    ChildComponent,
    RetryDialogComponent
  ],
  imports: [
    CommonModule,
    ParentRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule
  ]
})
export class ParentModule { }
