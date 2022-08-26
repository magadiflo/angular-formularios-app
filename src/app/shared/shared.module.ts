import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu/side-menu.component';



@NgModule({
  declarations: [
    SideMenuComponent,
  ],
  imports: [
    CommonModule, //* Para directivas *ngIf, *ngFor, pipes, etc...
    RouterModule, //* Para el routerLink, etc...
  ],
  exports: [
    SideMenuComponent,
  ],
})
export class SharedModule { }
