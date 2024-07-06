import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ViewportService } from './services/viewport.service';

@NgModule({
  declarations: [
  ],
  imports: [
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyMaterialModule
  ],
  providers: [ViewportService],
  bootstrap: []
})

export class AppModule { }
