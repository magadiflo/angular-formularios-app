import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  nombreApellidoPattern: string = '([a-zA-ZáéíóúÁÉÍÓÚ]+) ([a-zA-ZáéíóúÁÉÍÓÚ]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
      return { //* Con que nosotros regresemos un objeto en nuestra validación, esta se considera como un error
        noStrider: true,
      }
    }
    return null;//* Si retornamos null en una validación significa que no hay error, todo está bien
  }

  //* Con este método aprovechamos la validación aplicada a todo el formulario
  //* de esta manera validamos las contraseñas iguales y le asignamos
  //* al campo password-confirm (secondField) la validación
  camposIguales(firstField: string, secondField: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => { //* Nos debemos asegurar de que a la hora de ejecutar la función camposIguales(...) debemos de regresar una función
      //*console.log(formGroup.value);
      const pass1 = formGroup.get(firstField)?.value;
      const pass2 = formGroup.get(secondField)?.value;

      if (pass1 === pass2) {

        if (formGroup.get(secondField)?.hasError('noIguales')) {
          //* Solo para la validación del password-confirm, aquí reemplazaríamos al null (o sea que no hay errores)
          //* usando el delete y la actualización del campo, de esa forma refrescamos y decimos que el password-confirm es válido
          delete formGroup.get(secondField)?.errors?.['noIguales'];
          formGroup.get(secondField)?.updateValueAndValidity(); //* Recalcula el valor y el estado de validación del control.
        }

        return null; //* Para la validación aplicada a TODO EL FORMULARIO (Ver el FormErrors del registro.component.html -> {{ miFormulario.errors | json }})
      }

      formGroup.get(secondField)?.setErrors({ noIguales: true }); //* Solo para la validación del password-confirm, lee decimos que ese campo tiene un error.
      return { noIguales: true }; //* Para la validación aplicada a TODO EL FORMULARIO (Ver el FormErrors del registro.component.html -> {{ miFormulario.errors | json }})
    }
  }
}
