import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([ //* <--- Este sí es un arreglo
      ['Metal Gear', [Validators.required]],                      //* <<-- ['Metal Gear'...], no son arreglos, sino colleciones de formControls
      ['Death Stranding', [Validators.required]],
      this.fb.control('winning level 8', [Validators.required])    //* <<-- esto sería lo mismo que ['Metal Gear'...], es decir los formControls sería llamando desde el formBuilder (fb)
    ], [Validators.required])
  });

  get favoritosArray() {
    return (this.miFormulario.get('favoritos') as FormArray);
  }

  constructor(private fb: FormBuilder) { }

  guardar(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }

  isFieldInvalid(field: string) {
    return this.miFormulario.controls[field].touched && this.miFormulario.controls[field].errors;
  }

}
