import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-newline',
  template: `
    <div style="display: block; margin-bottom: 15px;width:100%">
    &nbsp;
    </div>
  `,
})
export class FormlyWrapperNewline extends FieldWrapper {}