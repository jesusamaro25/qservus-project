import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NetworkService } from 'src/app/core/services/network.service';
import { Information } from 'src/app/models/information.model';
import { initialData } from 'src/app/utils/initial-data';
import * as constants from './parent.constants';
import { RequestService } from '../../../core/services/request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RetryDialogComponent } from '../../components/retry-dialog/retry-dialog.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnDestroy {

  public componentConstants = constants;
  public formValue: Information = initialData;
  public defaultValues: Information = initialData;
  public isLoading: boolean = false;
  public networkStatus: boolean = false;
  private offlineStoredUsers: Information[] = [];
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private _networkService: NetworkService, private _requestService: RequestService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  /**
   * Función que se ejecuta al recibir información del componente hijo
   * @param event 
   */
  getFormInformation(event: Information): void {
    this.formValue = event;
    if (this.networkStatus) {
      this.sendInformation(this.formValue);
    }
    else {
      this.saveInLocalStorage(this.formValue);
    }
  }

  /**
   * Función para setear el formulario con los valores por defecto
   */
  setFormValues(): void {
    const value = {
      name: 'test',
      lastname: 'angular',
      email: 'angular@qservus.com',
      password: 'angularV13',
    };

    this.defaultValues = value;
  }

  /**
   * Función para chequear si hay o no conexión a internet, en caso que haya, se consulta al local storage, y si hay información ahī entonces solicitamos al usuario si quiere reintentar la inserción de datos
   */
  checkNetworkStatus(): void {
    this._networkService.checkNetworkStatus().pipe(takeUntil(this.onDestroy$.asObservable())).subscribe(status => {
      this.networkStatus = status;
      if (this.networkStatus) {
        this.offlineStoredUsers = JSON.parse(localStorage.getItem('pending-registered-offline-angular-test') || '[]');
        if (this.offlineStoredUsers.length > 0) {
          this.openDialog(this.offlineStoredUsers.length);
        }
      }
    });
  }

  /**
   * Función para insertar registros en la base de datos
   * @param body 
   */
  sendInformation(body: Information): void {
    this.isLoading = true;
    this._requestService.post(body).subscribe({
      next: (response) => {
        this.defaultValues = initialData;
        this.isLoading = false;
        this._snackBar.open(`${this.componentConstants.USER} ${body.email} ${this.componentConstants.SUCCESS}`, this.componentConstants.CLOSE, {
          duration: 8000,
          panelClass: ['success-snackbar']
        });
      },
      error: (e) => {
        this.isLoading = false;
        this._snackBar.open(`${this.componentConstants.ERROR} ${body.email}`, this.componentConstants.CLOSE, {
          duration: 8000,
          panelClass: ['error-snackbar']
        });
        console.error(e)
      }
    });
  }

  /**
   * Función para guardar en local storage
   * @param body 
   */
  saveInLocalStorage(body: Information): void {
    this.offlineStoredUsers.push(body);
    this._snackBar.open(`${this.componentConstants.ERROR} ${body.email} ${this.componentConstants.CONNECTION}`, this.componentConstants.CLOSE, {
      duration: 8000,
      panelClass: ['error-snackbar']
    });
    localStorage.setItem('pending-registered-offline-angular-test', JSON.stringify(this.offlineStoredUsers));
  }

  /**
   * Función para mostrar el dialogo de reintentos de usuarios guardados en el local storage
   * @param quantityData 
   */
  openDialog(quantityData: number): void {
    this.dialog.open(RetryDialogComponent, { data: quantityData, width: '50rem', height: '22rem' }).afterClosed()
      .subscribe(item => {
        if (item) {
          const usersInserted: string[] = []
          this.offlineStoredUsers.forEach((register) => {
            usersInserted.push(register.email)
            const arrayWitouthInsertedElement = this.offlineStoredUsers.filter((item) => item.email !== register.email && !usersInserted.includes(item.email))
            this.sendInformation(register)
            localStorage.setItem('pending-registered-offline-angular-test', JSON.stringify(arrayWitouthInsertedElement));
          })
        }
      });
  }

}