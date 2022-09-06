import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  /**
   * * Validators.requiredTrue, importante para validar un campo de tipo check ya que esta validación obliga a que el campo esté con check. 
   * * El Validators.required, no aplicaría aquí ya que esta dice si el campo tiene valor o no
   */

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', [Validators.required]],
    notificaciones: [false, [Validators.required]],
    terminos: [false, [Validators.requiredTrue]]
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    /**
     * * terminos: false, le agregamos esta propiedad ya que persona solo tiene 2 propiedades.
     * * Faltaría agregarle el término ya que si no lo hacemos ese campo lo establecería en null.
     * * Entonces, para ser explícitos le decimos que cuando inicie el formulario el campo terminos
     * * (al no estar checkeado) inicie en false y no en null
     */
    this.miFormulario.reset({
      ...this.persona,
      terminos: false
    });

    //* Podemos subscribirnos a un campo en específico del formulario para reaccionar a sus cambios
    this.miFormulario.controls['terminos'].valueChanges.subscribe(termino => {
      console.log('termino', termino);
    });

    //* Podemos subscribimos al formulario para reaccionar a sus cambios
    this.miFormulario.valueChanges.subscribe(({terminos, ...rest}) => { //* ...rest, es el operador REST: nos permiten representar un número indefinido de argumentos como un array
      this.persona = rest;
      console.log('this.persona', this.persona);
    });
  }

  guardar(): void {
    const formValue = { ...this.miFormulario.value }; //* ...this.miFormulario.value, Operador Spread: expande los elementos individuales
    delete formValue.terminos; //* Elimina la propiedad terminos del objeto
    this.persona = formValue;
  }

}

/**
 * * Diferencia entre el operador Rest y Spread
 * * La principal diferencia entre rest y spread es que:
 * * > Rest organiza el resto de algunos valores específicos suministrados por el usuario en un arreglo de JavaScript. 
 * * > Spread expande los iterables en elementos individuales.
 * *
 * * Ejemplo REST -------------------------------------------------
 * * Usa rest para encerrar el resto de valores específicos proporcionados por el usuario en un arreglo:
 * * function miBio(primerNombre, apellido, ...otraInfo) { 
 * *   return otraInfo;
 * * }
 * * 
 * * // Invoca la función miBio pasando cinco argumentos a sus parámetros:
 * * miBio("Oluwatobi", "Sofela", "CodeSweetly", "Desarrollo Web", "Hombre");
 * *
 * * // La invocación anterior devolverá:
 * * ["CodeSweetly", "Desarrollo Web", "Hombre"]
 * *
 * * Ejemplo SPREAD -----------------------------------------------
 * * // Define una función con tres parámetros:
 * *  function miBio(primerNombre, apellido, empresa) { 
 * *    return `${primerNombre} ${apellido} dirije ${empresa}`;
 * *  }
 * *
 * *  // Utiliza spread para expandir los elementos de un arreglo en argumentos individuales:
 * *  miBio(...["Oluwatobi", "Sofela", "CodeSweetly"]);
 * *
 * *  // La invocación anterior devolverá:
 * *  “Oluwatobi Sofela dirije CodeSweetly”
 * *
 */