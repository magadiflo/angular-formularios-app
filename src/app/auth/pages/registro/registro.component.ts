import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal
  nombreApellidoPattern: string = '([a-zA-ZáéíóúÁÉÍÓÚ]+) ([a-zA-ZáéíóúÁÉÍÓÚ]+)';

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: [],
    username: [],
    password: []
  });

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  campoInvalido(campo: string) {
    return this.miFormulario.get(campo)?.touched && this.miFormulario.get(campo)?.invalid;
  }

  submitFormulario(): void {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
