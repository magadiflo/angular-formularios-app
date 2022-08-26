import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  //* (Viene por defecto al crearlo) No sería necesario exportarlo porque ya lo tenemos a nivel global
  // exports: [ 
  //   RouterModule
  // ]
})
export class TemplateRoutingModule { }
