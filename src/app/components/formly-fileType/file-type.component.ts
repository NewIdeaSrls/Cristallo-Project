import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FileValueAccessor } from './file-value-accessor';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'formly-field-file',
  template: `
    <mat-form-field class="full-width">
      <div class="upload-wrapper">
        <div class="file-container">
          <div class="file" *ngFor="let file of selectedFiles; let i = index">
            <img [src]="getSanitizedImageUrl(file)" />
            <span (click)="onDelete(i)">X</span>
          </div>
        </div>
        <div class="upload-container" (click)="openFileInput()">
          <div class="mask"></div>
          <div class="helper-text">
            <div class="absolute-div">
              <div>Upload images</div>
            </div>
          </div>

          <input
            matinput
            #fileinput
            [multiple]="to['multiple']"
            id="file-input"
            type="file"
            [formControl]="formControl"
            [formlyAttributes]="field"
            (change)="onChange($event)"
            accept=".png,.jpg"
            style="display: none" />
        </div>
      </div>
    </mat-form-field>
  `,
  styleUrls: ['./file-type.component.scss'],
})
export class FormlyFieldFile extends FieldType<FieldTypeConfig> implements OnInit {
  @ViewChild('fileinput', { static: false }) el!: ElementRef;
  selectedFiles: File[] = [];

  constructor(public sanitizer: DomSanitizer) {
      super();
    }

  ngOnInit(): void {
    // If you need to initialize formControl, do it here
    // Otherwise, leave it as provided by the FieldType base class
  }

  openFileInput() {
    this.el.nativeElement.click();
  }

  onDelete(index: number): void {
    this.selectedFiles.splice(index, 1);
    if (this.formControl) {
      this.formControl.patchValue(this.selectedFiles);
    }
    console.log('Form Control Value', this.formControl ? this.formControl.value : 'FormControl not defined');
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      if (this.formControl) {
        this.formControl.patchValue(this.selectedFiles);
      }
    }
    console.log(this.selectedFiles);
  }

  getSanitizedImageUrl(file: File) {
    //return this.sanitizer.bypassSecurityTrustUrl(
    window.URL.createObjectURL(file);
    // );
  }

  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }
}

@NgModule({
  imports: [
    CommonModule,
    AsyncPipe,
    MatIconModule,
    ReactiveFormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FormlyModule.forRoot({
      types: [{ name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] }],
    }),
  ],
  declarations: [FileValueAccessor, FormlyFieldFile],
  exports: [FormlyFieldFile, FileValueAccessor],
})
export class FileTypeModule {}
