import { Directive, Input } from "@angular/core";
import { Validator, FormControl, NG_VALIDATORS } from '@angular/forms';

/**
 ** La etiqueta que quiera usar esta directiva debe tener 
 ** como propiedad el customMin y además estar asociado al ngModel
 */
@Directive({
    selector: '[customMin][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true,
    }]
})
export class CustomMinDirective implements Validator {

    @Input() minimo!: number;

    constructor() {
    }

    validate(control: FormControl) {
        const inputValue = control.value;
        console.log(inputValue);
        console.log(this.minimo);
        return (inputValue < this.minimo) ? { 'customMin': true } : null; //* null, significa que no hay error
    }

}