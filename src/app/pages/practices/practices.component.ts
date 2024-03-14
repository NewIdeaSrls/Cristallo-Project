import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/globals.service';

@Component({
  selector: 'app-practices',
  standalone: true,
  imports: [],
  templateUrl: './practices.component.html',
  styleUrl: './practices.component.scss'
})
export class PracticesComponent  implements OnInit{

  constructor( private router: Router,public globalService: GlobalService) {}
  ngOnInit(): void {
    
  }

}
