import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'formly-wrapper-button',
  template: `
    <div class="formly-wrapper-button">
      <ng-container #fieldComponent></ng-container>
      <button mat-button (click)="to['onButtonClick()']">Action</button>
    </div>
  `,
    styles: [``],
})
export class FormlyWrapperButton extends FieldWrapper {
@ViewChild('fieldComponent', {read: ViewContainerRef}) override fieldComponent!: ViewContainerRef;
  
}