import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Information } from 'src/app/models/information.model';
import { initialData } from 'src/app/utils/initial-data';
import * as constants from './child.constants';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges {

  @Output() formInformation = new EventEmitter<Information>()

  @Input() public defaultValues: Information = initialData;

  public groupForm!: FormGroup;
  public componentConstants = constants;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*?&#.()<>;^_+=/-])[A-Za-z\d$@$!%*?&#.()<>;^_+=/-].{6,}')]]

    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue } = changes['defaultValues'];
    if (JSON.stringify(currentValue) !== JSON.stringify(initialData)) {
      this.groupForm.setValue(currentValue);
    }
  }

  /**
   * Función para enviar la información al componente padre
   */
  handleSubmit(): void {
    this.formInformation.emit(this.groupForm.value)
  }

}