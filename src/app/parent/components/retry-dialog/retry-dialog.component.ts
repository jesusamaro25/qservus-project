import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as constants from './retry-dialog.constants';

@Component({
  selector: 'app-retry-dialog',
  templateUrl: './retry-dialog.component.html',
  styleUrls: ['./retry-dialog.component.scss']
})
export class RetryDialogComponent implements OnInit {


  public componentConstants = constants;

  constructor(public dialogRef: MatDialogRef<RetryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit(): void { }

  /**
   * Función que confirma que quiere enviar a los registros almacenados en el local storage
   */
  public confirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Función para posponer el envío de registros almacenados en el local storage
   */
  public postpone(): void {
    this.dialogRef.close(false);
  }

}