import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';

@Component({
  selector: 'app-insurances-offices',
  standalone: true,
  imports: [],
  templateUrl: './insurances-offices.component.html',
  styleUrl: './insurances-offices.component.scss'
})
export class InsurancesOfficesComponent implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}
