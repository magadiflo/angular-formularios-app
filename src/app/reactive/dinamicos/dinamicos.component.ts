import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

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

  nuevoFavorito: FormControl = this.fb.control('', [Validators.required]); //* Necesario agregar la validación para que cuando se de en el botón agregar, éste se evalúe con el if y no pase

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

  agregarFavorito(): void {
    if (this.nuevoFavorito.invalid) return;

    //* No mandamos directamente al arreglo el nuevoFavorito ya que podríamos mantener la referencia de la variable dentro del arreglo
    //* y eso podría traer problemas más adelante. Entonces, se opta por crear un nuevo objeto (formControl) y pasarle los valores del nuevoFavorito

    //* this.favoritosArray.push(new FormControl(this.nuevoFavorito.value, [Validators.required])); //* Usando el new FormControl
    this.favoritosArray.push(this.fb.control(this.nuevoFavorito.value, [Validators.required])); //* Usando el FormBuilder para crear un new FormControl
    this.nuevoFavorito.reset();
  }

}
