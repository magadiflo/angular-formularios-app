import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  //TODO: Temporal
  nombreApellidoPattern: string = '([a-zA-ZáéíóúÁÉÍÓÚ]+) ([a-zA-ZáéíóúÁÉÍÓÚ]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  //* Creando una validación SÍNCRONA
  noPuedeSerStrider(control: FormControl) {
    const valor: string = control.value?.trim().toLowerCase();
    if(valor === 'strider'){
      return { //* Con que nosotros regresemos un objeto en nuestra validación, esta se considera como un error
        noStrider: true,
      }
    }
    return null;//* Si retornamos null en una validación significa que no hay error, todo está bien
  }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    username: ['', [Validators.required, this.noPuedeSerStrider]],
    password: []
  });

  constructor(public fb: FormBuilder) { }

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
