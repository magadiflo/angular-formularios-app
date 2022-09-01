import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent {

  miFormulario: FormGroup = this.fb.group({
    producto: [null, [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(0)]],
    existencias: [null, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) { }

  isFieldInvalid(field: string) {
    console.log('isFieldInvalid()');
    return this.miFormulario.controls[field].touched && this.miFormulario.controls[field].errors;
  }

}
