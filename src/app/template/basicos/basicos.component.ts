import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  @ViewChild("miFormulario") miFormulario!: NgForm;
  initForm = {
    producto: 'RTX Video',
    precio: 10,
    existencias: 20
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar(): void {
    console.log(this.miFormulario);
    console.log('Posteo correcto');

    this.miFormulario.resetForm({
      producto: 'Default Product',
      precio: 0,
      existencias: 0,
    });
  }

  nombreInvalido(): boolean {
    return this.miFormulario?.controls['producto']?.touched && this.miFormulario?.controls['producto']?.invalid;
  }

  precioInvalido(): boolean {
    return this.miFormulario?.controls['precio']?.touched && this.miFormulario?.controls['precio']?.value < 0;
  }

}
