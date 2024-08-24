import { DomSanitizer } from '@angular/platform-browser';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { ElementRef } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { PDFDocument } from 'pdf-lib';

import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { data } from 'jquery';

@Component({
  selector: 'app-file-upload-field',
  template: `
    <div class="upload-wrapper" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
      <div class="file-container">
        <!--# show preview #-->
        <!--<div class="file" *ngFor="let file of selectedFiles; let i = index">
          <img [src]="getSanitizedImageUrl(file)" />
          <span class="delete-button" (click)="onDelete(i)">X</span>
        </div>-->
      </div>
      <div class="upload-container" (click)="openFileInput()">
        <div class="mask"></div>
        <div class="helper-text">
          <div class="absolute-div">
            <div>Carica Immagini</div>
          </div>
        </div>
        <input
          #fileinput
          [multiple]="to['multiple']"
          id="file-input"
          type="file"
          [formlyAttributes]="field"
          (change)="onChange($event)"
          accept=".pdf,.png,.jpg"
          style="display: none" />
      </div>
    </div>
    <div></div>
    <div class="table-container mat-elevation-z8">
      <table #table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="select">
          <th mat-header-cell *matHeaderCellDef>
            <button mat-icon-button (click)="mergeFiles($event)" matTooltip="Generate Pdf of selected">
              <mat-icon>picture_as_pdf</mat-icon>
            </button>
            <!--<mat-checkbox (change)="masterToggle()"></mat-checkbox>-->
          </th>
          <td mat-cell *matCellDef="let row">
            <mat-checkbox (change)="$event ? selectIt(row) : null" [checked]="selection.isSelected(row)"></mat-checkbox>
          </td>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>id</th>
          <td mat-cell *matCellDef="let row">{{ row.id }}</td>
        </ng-container>

        <ng-container matColumnDef="date_created">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_DATE' | translate}}</th>
          <td mat-cell *matCellDef="let row">
            <!--{{ row.date_created | date : 'yyyy/MM/dd HH:mm' }}-->
          </td>
        </ng-container>

        <ng-container matColumnDef="fileName">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_NAME' | translate}}</th>
          <td mat-cell *matCellDef="let row">{{ row.fileName }}</td>
        </ng-container>

        <ng-container matColumnDef="fileMime">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_MIME' | translate}}</th>
          <td mat-cell *matCellDef="let row">{{ row.fileMime }}</td>
        </ng-container>

        <ng-container matColumnDef="fileSize">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_SIZE' | translate}}</th>
          <td mat-cell *matCellDef="let row">{{ row.fileSize }}</td>
        </ng-container>

        <ng-container matColumnDef="remove">
          <th mat-header-cell *matHeaderCellDef>
            <button mat-icon-button (click)="removeAll($event)" matTooltip="{{ 'FILE_REMOVE_ALL' | translate }}">
              <mat-icon>clear_all</mat-icon>
            </button>
          </th>
          <td mat-cell *matCellDef="let score; let i = index">
            <button mat-icon-button (click)="remove($event)" matTooltip="{{ 'FILE_REMOVE_SINGLE' | translate}}">
              <mat-icon>clear</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let file; columns: displayedColumns"></tr>
      </table>
    </div>
    <mat-paginator #paginator [pageSizeOptions]="[3, 5, 10]" showFirstLastButtons></mat-paginator>
  `,
  styleUrls: ['./file-type.component.scss'],
})
export class FileUploadFieldComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild('fileinput') el!: ElementRef;
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource: any;
  selectedFiles: File[] = [];
  files!: any[];
  selection = new SelectionModel<any>(true, []);
  image: any;

  displayedColumns: string[] = ['select', 'id', 'date_created', 'fileName', 'fileMime', 'fileSize', 'remove'];

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    //this.readFilesFromAPI();
    this.reloaddata();
  }

  ngAfterViewInit(): void {}

  removeAll(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  remove(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /*######################################################*/

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.files.forEach(row => this.selection.select(row));
    console.log(this.selection.selected);
  }

  /** Controlla se tutte le righe sono selezionate */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.files.length;
    return numSelected === numRows;
  }

  selectIt(row: any) {
    this.selection.toggle(row);
    console.log(this.selection.selected);
  }

  /*######################################################*/

  async mergeFiles($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log($event);
    if (this.selection.selected.length == 0) {
      return;
    }

    // Create a URL for the Blob
    //const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab for preview
    //window.open(pdfUrl, '_blank');
  }

  /*######################################################*/

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';

    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  async inserimentoMassivo() {
    if (this.selectedFiles.length > 0) {
      console.log(this.selectedFiles);
      this.selectedFiles.forEach(async file => {
        try {
          console.log(file);

          const binaryData = await this.readBinaryData(file);
          let dataBase64 = this.arrayBufferToBase64(binaryData);

          const dataToSend = {
            fileName: file.name,
            fileMime: file.type,
            fileSize: file.size,
            fileReferer: this.to['identifier'],
            fileData: dataBase64,
          };

          const response = await this.http.post('/api/items/documentsRepository', dataToSend).toPromise();
          if (!response) {
            throw new Error("Errore durante l'inserimento del file");
          } else {
            await this.reloaddata();
          }
        } catch (error) {
          console.error(error);
          return;
        }
      });
    }
  }

  async reloaddata() {
    try {
      const response = await this.http.get<any>('/api/items/documentsRepository').toPromise();
      this.files = (response as any)['data'];
      console.log('ReadAll files from Backend');
      this.dataSource = new MatTableDataSource<any>(this.files);
      this.dataSource.paginator = this.paginator;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error retrieving documents:', error);
    }
  }

  private readBinaryData(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as binary data.'));
        }
      };

      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  // Handle dragover event
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  // Handle drop event
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedFiles = Array.from(event.dataTransfer?.files || []);
    this.inserimentoMassivo();
  }

  openFileInput() {
    this.el.nativeElement.click();
  }

  onDelete(index: any) {
    // this.formControl.reset();
    this.selectedFiles.splice(index, 1);
    this.formControl.patchValue(this.selectedFiles);
    console.log('Form Control Value', this.formControl.value);
  }

  onChange(event: Event) {
    if (event instanceof DragEvent) {
      event.preventDefault();
      event.stopPropagation();
      this.selectedFiles = Array.from(event.dataTransfer?.files || []);
      this.inserimentoMassivo();
    } else {
      this.selectedFiles = Array.from((event.target as HTMLInputElement).files || []);
      this.inserimentoMassivo();
    }
  }

  getSanitizedImageUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
  }
  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }
}
