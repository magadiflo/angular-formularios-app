import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, map, delay } from 'rxjs';

/**
 * * Este es un servicio, que al implementar el AsyncValidator
 * * permite realizar una validación asíncrona. Esto lo realizamos
 * * en el servicio porque el AsyncValidator depende de otro servicio,
 * * en este caso del HttpClient para realizar peticiones. 
 * * En el caso que quisiéramos hacer una validación asíncrona pero que
 * * no depende de ningún servicio adicional (por ejemplo http) fácilmente
 * * lo podríamos realizar en el mismo componente.
 *
 */

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email: string = control.value;
    //*console.log(email);
    return this.http.get<any[]>(`http://127.0.0.1:3000/usuarios?q=${email}`)
      .pipe(
        delay(2500), //* Simulando retardo de 2.5 seg. para ver el estado del formulario
        map(resp => {
          return resp.length === 0 ? null : { emailTomado: true }
        }),
      );
  }

}
