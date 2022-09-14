import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';
import { ErrorMessage } from '../../interfaces/validation.interface';

const EMAIL_ERRORS: ErrorMessage[] = [
  { error: 'required', message: 'El email es obligatorio' },
  { error: 'pattern', message: 'El valor ingresado no tiene formato de email' },
  { error: 'emailTomado', message: 'El email ya está registrado' }
];

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    'password-confirm': ['', [Validators.required]],
  }, {
    validators: [this.vs.camposIguales('password', 'password-confirm')], //* Definimos todas las validaciones que se aplicarán a TODO EL FORMULARIO
  });

  get emailErrorMsg(): string {
    const errorEmailForm = this.miFormulario.get('email')?.errors;
    return EMAIL_ERRORS.filter((obj: ErrorMessage) => obj.error === Object.keys(errorEmailForm!)[0])[0].message;
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Martín Díaz',
      email: 'test1@test.com',
      username: 'magadiflo',
      password: '123456',
      'password-confirm': '123456',
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
