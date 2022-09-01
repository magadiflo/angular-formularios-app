import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    producto: [null, [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) { }

  //* setValue({...}), necesariamente se tienen que enviar todos los campos del objeto miFormulario, sino sale error
  //* reset({...}), únicamnete le mandamos los campos que deseamos establecer valor al formulario
  ngOnInit(): void {
    this.miFormulario.reset({
      producto: 'Producto por defecto',
      precio: 100000,
      //existencias: 5
    });
  }

  isFieldInvalid(field: string) {
    return this.miFormulario.controls[field].touched && this.miFormulario.controls[field].errors;
  }

  guardar(): void {
    if (this.miFormulario.invalid) {
      //* Toca todos los campos del formulario, es decir, simula el touched en cada campo
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    //* Resetea los campos del formulario
    this.miFormulario.reset();
  }

}
