import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-button',
  template: `
    <div>
      <button mat-button mat-raised-button color="primary" (click)="onClick($event)" [type]="to.type" [ngClass]="'btn btn-' + to['btnType']">
        {{ to['text'] }}
      </button>
</div>
  `,
})
export class RepeatDeleteTypeComponent extends FieldType {
    
  onClick($event:Event) {
    if (this.field.parent && this.field.parent.key) {
      console.log(this.field.parent)
      const i = this.field.parent.key;
      console.log(this.field.parent.key,i)
      if (this.field.parent && typeof this.field.parent?.props?.['remove'] === 'function') {
        this.field.parent.props?.['remove'](i);
      } else {
        console.error('Error: The "remove" method is not available on this.field.parent');
      }
    } 
  }
}
