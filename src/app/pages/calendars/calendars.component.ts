import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';

@Component({
  selector: 'app-calendars',
  standalone: true,
  imports: [],
  templateUrl: './calendars.component.html',
  styleUrl: './calendars.component.scss'
})
export class CalendarsComponent implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}
