import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  //* Lo hacemos desta manera por que en el HTML nos tira un warning
  get errores() {
    return this.miFormulario?.controls['terminos']?.errors
  }

  persona = {
    genero: '',
    notificaciones: true,
  }

  terminoCondiciones: boolean = false;

  guardar(): void {
    console.log('Posteo formulario...');
  }

}
