import { CommonModule } from '@angular/common';
import { Component,Input, OnDestroy} from '@angular/core';
import { Inject,AfterViewInit, Output, OnInit, ViewChild, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule,ReactiveFormsModule,FormControl} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-mdchip',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,MatChipsModule,FormsModule,MatCheckboxModule,MatOptionModule,MatSelectModule],
  templateUrl: './mdchip.component.html',
  styleUrl: './mdchip.component.scss'
})

export class MdchipComponent implements OnInit,OnDestroy {

  @Input() chiplist: any[] = [];
  @Input() widthlist:string ="";
  @Output() chipsselected = new EventEmitter();

  mdChipControl = new FormControl([]);
  valueChangesSubscription: Subscription | undefined;

  ngOnInit () {
    this.mdChipControl.valueChanges.subscribe(values => {
    this.chipsselected.emit({ chipsSelection: this.mdChipControl.value });
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }
  onChipRemoved(chip: string) {
    const chipValue:any = this.mdChipControl.value as string[];
    this.removeFirst(chipValue, chip);
    this.mdChipControl.setValue(chipValue); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

}
