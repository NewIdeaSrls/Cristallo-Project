import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';

@Component({
  selector: 'app-insurances',
  standalone: true,
  imports: [],
  templateUrl: './insurances.component.html',
  styleUrl: './insurances.component.scss'
})
export class InsurancesComponent implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}
