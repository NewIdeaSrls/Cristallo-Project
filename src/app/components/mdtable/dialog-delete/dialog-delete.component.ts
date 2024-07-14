import { Component,Inject,Output, OnInit, ViewChild, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent{

  @Output() deleteEvent = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>) {}

  delete(): void {
    this.deleteEvent.emit();
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
