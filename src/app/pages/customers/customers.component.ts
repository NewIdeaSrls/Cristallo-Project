import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';
import { CommonModule } from '@angular/common'; 
import { CurrencyPipe, DecimalPipe, PercentPipe} from '@angular/common';
import { MDTableComponent } from '../../components/mdtable/mdtable.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule,MatTableModule,MDTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
  providers: [CurrencyPipe, DecimalPipe, PercentPipe]
})
export class CustomersComponent implements OnInit {

  constructor( 
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe,
    private router: Router,public globalService: GlobalService) {}

    ngOnInit(): void {
     
    }
}
