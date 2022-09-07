import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

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
}
