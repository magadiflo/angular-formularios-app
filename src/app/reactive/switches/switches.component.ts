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
  }

}
