// import { Directive, Input } from '@angular/core';
// import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

// @Directive({
//   selector: '[appCustomFieldValidate]',
//   providers: [{ provide: NG_VALIDATORS,
//     useExisting: CustomFieldValidateDirective,
//      multi: true }]
// })
// export class CustomFieldValidateDirective implements Validator {

//    constructor() {
//      this.appCustomFieldValidate="";
//     }
//   @Input() appCustomFieldValidate: string;
//   validate(control: AbstractControl): {[key:string]:any} | null {
//     // if(!form.controls.password || !form.controls.repassword){
//     //   return null;
//     // }
//     // if(form.controls.password.errors && form.controls.repassword.errors){
//     //   return null;
//     // }
//     // if(form.controls.password.value !== form.controls.repassword.value){
//     //   form.controls.password.setValue({ compareFieldValidator:true });
//     //   form.controls.repassword.setValue({ compareFieldValidator:true });
//     //   return { compareFieldValidator:true };
//     // }
//     // if(form.controls.password.hasError('compareFieldValidator')){
//     //   delete form.controls.password.errors['compareFieldValidator'];
//     // }
//     // if(form.controls.repassword.hasError('compareFieldValidator')){
//     //   delete form.controls.password.errors['compareFieldValidator'];
//     // }
//     const controlToCompare = control.parent?.get(this.appCustomFieldValidate);

//     if(controlToCompare && controlToCompare.value !== control.value){

//       return { 'notEqual' : true };
//     }

//     return null;
//   }

// }
