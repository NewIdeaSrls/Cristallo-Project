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
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-file-upload-field',
  template: `
    <div class="upload-wrapper" (dragover)="onDragOver($event)" (drop)="onDrop($event)">
      <!--<div class="file-container">
        # show preview #-->
      <!--<div class="file" *ngFor="let file of selectedFiles; let i = index">
          <img [src]="getSanitizedImageUrl(file)" />
          <span class="delete-button" (click)="onDelete(i)">X</span>
        </div>
      </div>-->
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
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_DATE' | translate }}</th>
          <td mat-cell *matCellDef="let row">
            <!--{{ row.date_created | date : 'yyyy/MM/dd HH:mm' }}-->
          </td>
        </ng-container>

        <ng-container matColumnDef="fileName">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_NAME' | translate }}</th>
          <td mat-cell *matCellDef="let row">{{ row.fileName }}</td>
        </ng-container>

        <ng-container matColumnDef="fileMime">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_MIME' | translate }}</th>
          <td mat-cell *matCellDef="let row">{{ row.fileMime }}</td>
        </ng-container>

        <ng-container matColumnDef="fileSize">
          <th mat-header-cell *matHeaderCellDef>{{ 'FILE_SIZE' | translate }}</th>
          <td mat-cell *matCellDef="let row">{{ row.fileSize }}</td>
        </ng-container>

        <ng-container matColumnDef="remove">
          <th mat-header-cell *matHeaderCellDef>
            <button mat-icon-button (click)="removeAll($event)" matTooltip="{{ 'FILE_REMOVE_ALL' | translate }}">
              <mat-icon>clear_all</mat-icon>
            </button>
          </th>
          <td mat-cell *matCellDef="let score; let i = index">
            <button mat-icon-button (click)="remove($event)" matTooltip="{{ 'FILE_REMOVE_SINGLE' | translate }}">
              <mat-icon>clear</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let file; columns: displayedColumns"></tr>
      </table>
    </div>
    <mat-paginator #paginator [pageSizeOptions]="[10,20]" showFirstLastButtons></mat-paginator>
  `,
  styleUrls: ['./file-type.component.scss'],
})
export class FileUploadFieldComponent extends FieldType implements OnInit, AfterViewInit {
  @ViewChild('fileinput') el!: ElementRef;
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  private reloadSignal: Subject<void> = new Subject<void>();

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
    this.reloadSignal.subscribe(() => {
      this.reloadData();
    });
    this.reloadSignal.next();
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
  }

  /*######################################################*/

  inserimentoMassivo() {
    if (this.selectedFiles.length > 0) {
      console.log(this.selectedFiles);
  
      this.selectedFiles.forEach(file => {
        this.readBinaryData(file).pipe(
          map(binaryData => this.arrayBufferToBase64(binaryData)), // Utilizza correttamente binaryData
          switchMap(dataBase64 => {
            const dataToSend = {
              fileName: file.name,
              fileMime: file.type,
              fileSize: file.size,
              fileReferer: this.props['identifier'],
              fileData: dataBase64,
            };
            const params = new HttpParams().set('timestamp', Date.now().toString());
            return this.http.post('/api/items/documentsRepository', dataToSend,{ params });
          })
        ).subscribe({
          next: response => {
            if (!response) {
              console.error("Errore durante l'inserimento del file");
            } else {
             
            }
          },
          error: error => {
            console.error('Errore durante l\'inserimento del file:', error);
          }
        });
      });
      this.reloadSignal.next();
    }
  }
  
  reloadData() {
    const params = new HttpParams().set('timestamp', Date.now().toString());
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    this.http.get<any>('/api/items/documentsRepository', { params, headers }).subscribe({
      next: (response: any) => {
        let files = response['data'];
        console.log('Read all files from Backend', files);
        this.dataSource = new MatTableDataSource<any>(files);
        this.dataSource.paginator = this.paginator;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error retrieving documents:', error);
      },
    });
  }
  
  private readBinaryData(file: File): Observable<ArrayBuffer> {
    return new Observable<ArrayBuffer>(observer => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          observer.next(reader.result as ArrayBuffer);
          observer.complete();
        } else {
          observer.error(new Error('Failed to read file as binary data.'));
        }
      };
  
      reader.onerror = error => observer.error(error);
      reader.readAsArrayBuffer(file);
    });
  }
  
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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
