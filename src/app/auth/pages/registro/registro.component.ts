import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: []
  });

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Martín Díaz',
      email: 'test@correo.com',
      username: 'magadiflo',
    });
  }

  campoInvalido(campo: string) {
    return this.miFormulario.get(campo)?.touched && this.miFormulario.get(campo)?.invalid;
  }

  submitFormulario(): void {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
