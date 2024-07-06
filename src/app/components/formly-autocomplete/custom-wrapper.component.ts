import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-button',
  template: `
    <div style="display: flex; align-items: center; width: 100%;">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class AutcompleteButtonWrapperComponent extends FieldWrapper {}

/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
