import { FormControl } from '@angular/forms';

export const nombreApellidoPattern: string = '([a-zA-ZáéíóúÁÉÍÓÚ]+) ([a-zA-ZáéíóúÁÉÍÓÚ]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const noPuedeSerStrider = (control: FormControl) => {
    const valor: string = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
        return { //* Con que nosotros regresemos un objeto en nuestra validación, esta se considera como un error
            noStrider: true,
        }
    }
    return null;//* Si retornamos null en una validación significa que no hay error, todo está bien
}